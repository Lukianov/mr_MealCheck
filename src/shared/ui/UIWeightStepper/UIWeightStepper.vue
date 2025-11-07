<!-- src/shared/ui/WeightStepper/WeightStepper.vue -->
<template>
  <div
    class="weight-stepper relative inline-flex items-center justify-between select-none rounded-[999px] bg-[#111] text-white h-14 px-5 gap-3"
    :class="[disabled ? 'opacity-60' : 'opacity-100']"
    role="group"
    aria-label="Выбор веса"
    @wheel.passive="onWheel"
    @keydown.left.prevent="nudge(-1)"
    @keydown.right.prevent="nudge(1)"
    tabindex="0"
  >
    <span
      class="pointer-events-none absolute inset-0 rounded-[999px]"
      aria-hidden="true"
    ></span>

    <button
      type="button"
      class="btn w-10 h-10"
      :disabled="isMin || disabled"
      aria-label="Уменьшить вес"
      @mousedown="press(-1)"
      @touchstart.prevent="press(-1)"
      @mouseup="release"
      @mouseleave="release"
      @touchend="release"
    >
      <span class="icon text-[18px]">−</span>
    </button>
    <output
      class="value font-semibold text-white text-[18px] tracking-tight"
      :aria-live="disabled ? 'off' : 'polite'"
    >
      {{ formatted }} кг
    </output>

    <button
      type="button"
      class="btn w-10 h-10"
      :disabled="isMax || disabled"
      aria-label="Увеличить вес"
      @mousedown="press(1)"
      @touchstart.prevent="press(1)"
      @mouseup="release"
      @mouseleave="release"
      @touchend="release"
    >
      <span class="icon text-[18px]">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch, ref } from 'vue'

type Size = 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    size?: Size
  }>(),
  {
    min: 0,
    max: 300,
    step: 0.1,
    disabled: false,
    size: 'lg',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void
  (e: 'change', v: number): void
}>()

const scale = computed(() => Math.round(1 / props.step))

const clamp = (v: number) => Math.min(props.max!, Math.max(props.min!, v))

const roundToStep = (v: number) => Math.round(v * scale.value) / scale.value

const value = ref(roundToStep(clamp(props.modelValue)))

watch(
  () => props.modelValue,
  (v) => {
    value.value = roundToStep(clamp(v))
  },
)

const isMin = computed(() => value.value <= props.min!)
const isMax = computed(() => value.value >= props.max!)

const formatted = computed(() =>
  new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value.value),
)

function setValue(v: number) {
  const next = roundToStep(clamp(v))
  if (next !== value.value) {
    value.value = next
    emit('update:modelValue', next)
    emit('change', next)
  }
}

function nudge(dir: -1 | 1) {
  if (props.disabled) return
  setValue(value.value + dir * props.step)
}

let holdTimer: number | null = null

let repeatTimer: number | null = null

function press(dir: -1 | 1) {
  if (props.disabled) {
    return
  }

  nudge(dir)

  clearTimers()

  holdTimer = window.setTimeout(() => {
    repeatTimer = window.setInterval(() => nudge(dir), 60)
  }, 300)
}

function release() {
  clearTimers()
}

function clearTimers() {
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  if (repeatTimer) {
    clearInterval(repeatTimer)
    repeatTimer = null
  }
}

onBeforeUnmount(clearTimers)

function onWheel(e: WheelEvent) {
  if (props.disabled) return
  const dir = e.deltaY > 0 ? -1 : 1
  nudge(dir as -1 | 1)
}
</script>

<style scoped>
.weight-stepper {
  /* внутренняя синяя кромка */
  border: 1px solid #4aa3f1; /* светлая */
  /* внешний ободок */
  box-shadow: 0 0 0 2px rgba(45, 114, 168, 0.9); /* тёмно-синий, создаёт вторую линию */
}

.btn {
  position: relative;
  z-index: 1;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #bfc7cc;
  transition:
    transform 0.06s ease,
    color 0.12s ease,
    background-color 0.12s ease;
  outline: none;
  border: 1px solid transparent;
}

.btn:hover {
  color: #e5eef5;
  background: rgba(255, 255, 255, 0.03);
}
.btn:active {
  transform: scale(0.98);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.value {
  position: relative;
  z-index: 1;
  font-variant-numeric: tabular-nums;
}
</style>
