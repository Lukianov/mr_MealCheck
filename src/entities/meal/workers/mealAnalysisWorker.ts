/// <reference lib="webworker" />
import { AnalysisStatusResponse } from '@/entities/meal/types'
import { apiRequest, ApiResponseType, useApiClient } from '@/shared/api'

const { setTelegramInitData } = useApiClient()

type IncomingMessage =
  | {
      type: 'enqueue'
      payload: { id: number; intervalMs?: number; maxAttempts?: number }
    }
  | { type: 'cancel'; payload: { id: number } }
  | { type: 'clear' }
  | { type: 'setInitData'; payload: { initData: string | null } }

type OutgoingMessage =
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

interface TaskState {
  timer: number | null
  attempts: number
  interval: number
  maxAttempts: number
}

const ctx: DedicatedWorkerGlobalScope =
  self as unknown as DedicatedWorkerGlobalScope

const DEFAULT_INTERVAL = 4000
const DEFAULT_MAX_ATTEMPTS = 70

const tasks = new Map<number, TaskState>()

function postMessageToMain(message: OutgoingMessage) {
  ctx.postMessage(message)
}

async function fetchStatus(id: number): Promise<AnalysisStatusResponse> {
  return apiRequest<AnalysisStatusResponse>(
    `${ApiResponseType.GetMealAnalyzedStatus}${id}/status`,
    {
      method: 'GET',
    },
  )
}

function scheduleNext(id: number) {
  const task = tasks.get(id)

  if (!task) {
    return
  }

  task.timer = ctx.setTimeout(() => poll(id), task.interval)
}

function cleanup(id: number) {
  const task = tasks.get(id)

  if (!task) {
    return
  }

  if (task.timer !== null) {
    ctx.clearTimeout(task.timer)
  }

  tasks.delete(id)
}

async function poll(id: number) {
  const task = tasks.get(id)

  if (!task) {
    return
  }

  try {
    const status = await fetchStatus(id)

    postMessageToMain({ type: 'status', payload: { id, status } })

    if (status.status === 'done') {
      cleanup(id)

      postMessageToMain({ type: 'done', payload: { id, status } })

      return
    }

    task.attempts += 1

    if (task.attempts >= task.maxAttempts) {
      cleanup(id)

      postMessageToMain({ type: 'timeout', payload: { id } })

      return
    }

    scheduleNext(id)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown polling error'

    postMessageToMain({ type: 'error', payload: { id, message } })

    task.attempts += 1

    if (task.attempts >= task.maxAttempts) {
      cleanup(id)

      postMessageToMain({ type: 'timeout', payload: { id } })

      return
    }

    scheduleNext(id)
  }
}

function handleEnqueue(message: Extract<IncomingMessage, { type: 'enqueue' }>) {
  const {
    id,
    intervalMs = DEFAULT_INTERVAL,
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
  } = message.payload

  if (tasks.has(id)) {
    return
  }

  tasks.set(id, {
    attempts: 0,
    interval: intervalMs,
    maxAttempts,
    timer: null,
  })

  poll(id)
}

function handleCancel(id: number) {
  cleanup(id)
}

function handleClear() {
  Array.from(tasks.keys()).forEach((id) => cleanup(id))
}

ctx.addEventListener('message', (event: MessageEvent<IncomingMessage>) => {
  const { type } = event.data

  switch (type) {
    case 'enqueue':
      handleEnqueue(event.data)

      break
    case 'cancel':
      handleCancel(event.data.payload.id)

      break
    case 'clear':
      handleClear()

      break
    case 'setInitData':
      setTelegramInitData(event.data.payload.initData)

      break
    default:
      break
  }
})
