<template>
  <div>
    <h3 class="text-white font-semibold mb-3">{{ title }}</h3>
    <div class="rounded-3xl bg-[#1d1d1d]/90 p-4">
      <SegmentedTabs class="mb-6" :options="TABS_OPTIONS" v-model="range" />

      <div class="relative">
        <canvas ref="canvasEl" height="260"></canvas>
        <div
          v-if="loading || emptyState"
          class="absolute inset-0 grid place-items-center text-zinc-400 text-sm"
        >
          <template v-if="loading">
            {{ ru.userStatistics.loading }}
          </template>
          <template v-else>
            {{
              emptyState === 'today'
                ? ru.userStatistics.emptyToday
                : ru.userStatistics.emptyRange
            }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import SegmentedTabs from '@/shared/ui/UITabs/UITabs.vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import {
  StatsEmptyState,
  StatsLoadResult,
  StatsPoint,
  StatsRange,
} from '@/shared/types/stats'
import { TABS_OPTIONS } from '@/widgets/user-statistics/const'
import { ru } from '@/shared/lib/i18n/ru'

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
)

const props = defineProps<{
  title: string
  loader: (range: StatsRange) => Promise<StatsLoadResult>
  yMax?: number | null
  yMin?: number | null
  valueSuffix?: string
}>()

const range = defineModel<StatsRange>({ default: 'day' })

const canvasEl = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

const loading = ref(false)

const emptyState = ref<StatsEmptyState | null>(null)

async function load() {
  loading.value = true

  try {
    const currentRange = range.value ?? 'day'

    const { points, emptyState: nextEmptyState } =
      await props.loader(currentRange)

    if (!points.length) {
      emptyState.value = nextEmptyState ?? null

      destroyChart()

      clearCanvas()

      return
    }

    emptyState.value = null

    render(points)
  } finally {
    loading.value = false
  }
}

function clearCanvas() {
  if (!canvasEl.value) {
    return
  }

  const ctx = canvasEl.value.getContext('2d')

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)
}

function destroyChart() {
  if (chart) {
    chart.destroy()
    chart = null
  }
}

function render(points: StatsPoint[]) {
  if (!canvasEl.value) {
    return
  }

  const ctx = canvasEl.value.getContext('2d')

  if (!ctx) {
    return
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, canvasEl.value.height)

  gradient.addColorStop(0, 'rgba(0,167,237,0.35)')
  gradient.addColorStop(1, 'rgba(0,167,237,0.00)')

  const hasNumericX = points.some((point) => typeof point.x === 'number')

  const datasetValues = hasNumericX
    ? points.map((point) => ({
        x: point.x ?? 0,
        y: point.value,
        label: point.label,
      }))
    : points.map((point) => point.value)

  const labels = hasNumericX ? undefined : points.map((point) => point.label)

  destroyChart()

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: datasetValues,
          tension: 0.35,
          borderWidth: 2,
          borderColor: 'rgba(0,167,237,1)',
          pointRadius: 0,
          fill: true,
          backgroundColor: gradient,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (i) => {
              const v = i.parsed.y ?? 0
              const suf = props.valueSuffix ?? ''
              const raw = i.raw as { label?: string; x?: number } | number
              const labelText =
                typeof raw === 'object' && raw?.label && raw.label.length
                  ? raw.label
                  : typeof raw === 'object' && typeof raw?.x === 'number'
                    ? formatHourTick(raw.x)
                    : (i.label ?? '')
              return labelText ? `${labelText}: ${v}${suf}` : `${v}${suf}`
            },
          },
        },
      },
      scales: {
        x: hasNumericX
          ? {
              type: 'linear',
              min: 0,
              max: 24,
              ticks: {
                color: '#A1A1AA',
                stepSize: 4,
                callback: (value) => formatHourTick(Number(value)),
              },
            }
          : {
              ticks: {
                color: '#A1A1AA',
                maxRotation: 0,
              },
            },
        y: {
          beginAtZero: false,
          suggestedMax: props.yMax ?? undefined,
          suggestedMin: props.yMin ?? undefined,
          ticks: { color: '#A1A1AA' },
        },
      },
    },
  })
}

watch(
  range,
  () => {
    void load()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => destroyChart())

function formatHourTick(value: number): string {
  const clamped = Math.max(0, Math.min(value, 24))
  const totalMinutes = Math.round(clamped * 60)
  const hours = Math.min(24, Math.floor(totalMinutes / 60))
  const minutes = hours === 24 ? 0 : totalMinutes % 60
  const hh =
    hours === 24 ? '00' : String(Math.max(0, Math.min(hours, 23))).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  return `${hh}:${mm}`
}
</script>
