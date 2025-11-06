import { shallowRef, watch } from 'vue'
import type { AnalysisStatusResponse } from '@/entities/meal/types'
import { useApiClient } from '@/shared/api'

type WorkerEvent =
  | {
      type: 'status'
      payload: { id: number; status: AnalysisStatusResponse }
    }
  | {
      type: 'done'
      payload: { id: number; status: AnalysisStatusResponse }
    }
  | {
      type: 'error'
      payload: { id: number; message: string }
    }
  | {
      type: 'timeout'
      payload: { id: number }
    }

type WorkerRequest =
  | {
      type: 'enqueue'
      payload: { id: number; intervalMs?: number; maxAttempts?: number }
    }
  | { type: 'cancel'; payload: { id: number } }
  | { type: 'clear' }

interface MealAnalysisWorkerStore {
  statuses: ReturnType<typeof shallowRef<Map<number, AnalysisStatusResponse>>>
  processingIds: ReturnType<typeof shallowRef<Set<number>>>
  errors: ReturnType<typeof shallowRef<Map<number, string>>>
  enqueue(
    id: number,
    options?: { intervalMs?: number; maxAttempts?: number },
  ): void
  cancel(id: number): void
  clear(): void
  onEvent(handler: (event: WorkerEvent) => void): () => void
}

let singletonStore: MealAnalysisWorkerStore | null = null

function createStore(): MealAnalysisWorkerStore {
  const { initData } = useApiClient()

  const workerRef = shallowRef<Worker | null>(null)

  const statuses = shallowRef<Map<number, AnalysisStatusResponse>>(new Map())

  const processingIds = shallowRef<Set<number>>(new Set())

  const errors = shallowRef<Map<number, string>>(new Map())

  const listeners = new Set<(event: WorkerEvent) => void>()

  let lastSentInitData: string | null = null

  function syncWorkerAuth(worker: Worker) {
    const currentInitData = initData.value ?? null

    if (currentInitData !== lastSentInitData) {
      worker.postMessage({
        type: 'setInitData',
        payload: { initData: currentInitData },
      })

      lastSentInitData = currentInitData
    }
  }

  function ensureWorker(): Worker {
    if (!workerRef.value) {
      workerRef.value = new Worker(
        new URL('../workers/mealAnalysisWorker.ts', import.meta.url),
        { type: 'module' },
      )

      workerRef.value.addEventListener(
        'message',
        (event: MessageEvent<WorkerEvent>) => {
          const message = event.data
          handleMessage(message)
        },
      )

      workerRef.value.addEventListener('error', (event) => {
        console.error('Meal analysis worker error', event)
      })
    }

    syncWorkerAuth(workerRef.value)

    return workerRef.value
  }

  watch(
    initData,
    () => {
      if (workerRef.value) {
        syncWorkerAuth(workerRef.value)
      }
    },
    { immediate: false },
  )

  function updateStatuses(
    updater: (
      map: Map<number, AnalysisStatusResponse>,
    ) => Map<number, AnalysisStatusResponse>,
  ) {
    statuses.value = updater(new Map(statuses.value))
  }

  function updateProcessing(updater: (set: Set<number>) => Set<number>) {
    processingIds.value = updater(new Set(processingIds.value))
  }

  function updateErrors(
    updater: (map: Map<number, string>) => Map<number, string>,
  ) {
    errors.value = updater(new Map(errors.value))
  }

  function emit(event: WorkerEvent) {
    listeners.forEach((handler) => {
      try {
        handler(event)
      } catch (error) {
        console.error('Meal analysis worker listener threw', error)
      }
    })
  }

  function handleMessage(event: WorkerEvent) {
    switch (event.type) {
      case 'status': {
        const { id, status } = event.payload

        updateStatuses((map) => map.set(id, status))

        updateProcessing((set) => set.add(id))

        emit(event)

        break
      }
      case 'done': {
        const { id, status } = event.payload

        updateStatuses((map) => map.set(id, status))

        updateProcessing((set) => {
          set.delete(id)
          return set
        })

        emit(event)

        updateStatuses((map) => {
          map.delete(id)
          return map
        })

        updateErrors((map) => {
          map.delete(id)
          return map
        })
        break
      }
      case 'error': {
        const { id, message } = event.payload
        updateErrors((map) => map.set(id, message))
        emit(event)
        break
      }
      case 'timeout': {
        const { id } = event.payload
        updateProcessing((set) => {
          set.delete(id)
          return set
        })
        updateErrors((map) => map.set(id, 'Polling timed out'))
        emit(event)
        break
      }
      default:
        break
    }
  }

  function postMessage(message: WorkerRequest) {
    const worker = ensureWorker()

    syncWorkerAuth(worker)

    worker.postMessage(message)
  }

  function enqueue(
    id: number,
    options?: { intervalMs?: number; maxAttempts?: number },
  ) {
    updateErrors((map) => {
      map.delete(id)
      return map
    })
    updateProcessing((set) => set.add(id))

    postMessage({
      type: 'enqueue',
      payload: {
        id,
        intervalMs: options?.intervalMs,
        maxAttempts: options?.maxAttempts,
      },
    })
  }

  function cancel(id: number) {
    postMessage({ type: 'cancel', payload: { id } })
    updateProcessing((set) => {
      set.delete(id)
      return set
    })
    updateStatuses((map) => {
      map.delete(id)
      return map
    })
    updateErrors((map) => {
      map.delete(id)
      return map
    })
  }

  function clear() {
    postMessage({ type: 'clear' })
    updateProcessing(() => new Set())
    updateStatuses(() => new Map())
    updateErrors(() => new Map())
  }

  function onEvent(handler: (event: WorkerEvent) => void) {
    listeners.add(handler)

    return () => {
      listeners.delete(handler)
    }
  }

  return {
    statuses,
    processingIds,
    errors,
    enqueue,
    cancel,
    clear,
    onEvent,
  }
}

export function useMealAnalysisWorker(): MealAnalysisWorkerStore {
  if (!singletonStore) {
    singletonStore = createStore()
  }

  return {
    ...singletonStore,
    onEvent(handler) {
      return singletonStore!.onEvent(handler)
    },
  }
}
