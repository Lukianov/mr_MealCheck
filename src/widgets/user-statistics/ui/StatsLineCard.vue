<template>
  <div>
    <h3 class="text-white font-semibold mb-3">{{ title }}</h3>
    <div class="rounded-3xl bg-[#1d1d1d]/90 p-4">
      <SegmentedTabs class="mb-6" :options="TABS_OPTIONS" v-model="range" />

      <div class="relative">
        <canvas ref="canvasEl" height="260"></canvas>
        <div
          v-if="loading"
          class="absolute inset-0 grid place-items-center text-zinc-400 text-sm"
        >
          {{ ru.userStatistics.loading }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
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
import { StatsRange } from '@/shared/types/stats'
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

type Point = { value: number; label: string }

const props = defineProps<{
  title: string
  initialRange?: StatsRange
  loader: (range: StatsRange) => Promise<Point[]>
  yMax?: number | null
  valueSuffix?: string
}>()

const range = ref<StatsRange>(props.initialRange ?? 'day')

const canvasEl = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

const loading = ref(false)

async function load() {
  loading.value = true

  try {
    const pts = await props.loader(range.value)

    render(pts)
  } finally {
    loading.value = false
  }
}

function render(points: Point[]) {
  if (!canvasEl.value) {
    return
  }

  const ctx = canvasEl.value.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, 0, canvasEl.value.height)

  gradient.addColorStop(0, 'rgba(0,167,237,0.35)')

  gradient.addColorStop(1, 'rgba(0,167,237,0.00)')

  const labels = points.map((p) => p.label)

  const data = points.map((p) => p.value)

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data,
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
              return `${v}${suf}`
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.08)',
            borderDash: [4, 4],
            tickColor: 'rgba(0,0,0,0)',
          },
          ticks: {
            color: '#A1A1AA',
            maxRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: props.yMax ?? undefined,
          grid: {
            color: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.08)',
            borderDash: [4, 4],
          },
          ticks: { color: '#A1A1AA' },
        },
      },
    },
  })
}

watch(range, load, { immediate: true })

onMounted(load)

onBeforeUnmount(() => chart?.destroy())
</script>
