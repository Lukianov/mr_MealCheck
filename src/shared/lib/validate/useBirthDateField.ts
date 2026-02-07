import { ref, computed } from 'vue'

const RE_DDMMYYYY = /^(\d{2})\.(\d{2})\.(\d{4})$/
const MIN_YEAR = 1900
const MIN_AGE = 5
const MAX_AGE = 120

function parseDDMMYYYY(s: string): Date | null {
  const m = RE_DDMMYYYY.exec((s || '').trim())

  if (!m) {
    return null
  }

  const d = +m[1],
    mo = +m[2],
    y = +m[3]

  const dt = new Date(y, mo - 1, d)

  const ok =
    dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d

  return ok ? dt : null
}

function ageOn(date: Date, now = new Date()): number {
  let a = now.getFullYear() - date.getFullYear()

  const m = now.getMonth() - date.getMonth()

  if (m < 0 || (m === 0 && now.getDate() < date.getDate())) a--

  return a
}

type Result = { ok: boolean; error: string | null }

function validateString(v: string): Result {
  const s = (v || '').trim()

  if (!s) return { ok: false, error: 'Укажите дату' }

  if (!RE_DDMMYYYY.test(s)) return { ok: false, error: 'Формат: ДД.ММ.ГГГГ' }

  const dt = parseDDMMYYYY(s)

  if (!dt) {
    return { ok: false, error: 'Некорректная дата' }
  }

  if (dt.getFullYear() < MIN_YEAR)
    return { ok: false, error: `Год не раньше ${MIN_YEAR}` }

  const today = new Date()
  const todayNoTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  if (dt > todayNoTime)
    return { ok: false, error: 'Дата не может быть в будущем' }

  const a = ageOn(dt, today)

  if (a < MIN_AGE || a > MAX_AGE)
    return {
      ok: false,
      error: `Возраст должен быть ${MIN_AGE}–${MAX_AGE} лет`,
    }

  return { ok: true, error: null }
}

export function useBirthDateField(initial: string | null = null) {
  const personDayBirth = ref<number>(1)

  const personMonthBirth = ref<number>(1)

  const personYearBirth = ref<number>(1991)

  const value = ref<string>(initial ?? '')
  const touched = ref(false)
  const submitted = ref(false)

  const result = computed(() => validateString(value.value))

  const isValid = computed(() => result.value.ok)

  const error = computed(() =>
    touched.value || submitted.value ? result.value.error : null,
  )

  function touch() {
    touched.value = true
  }

  function validate() {
    submitted.value = true

    return result.value.ok
  }

  function reset(next = '') {
    value.value = next
    touched.value = false
    submitted.value = false
  }

  const personalBirthDate = computed(
    () =>
      `${personDayBirth.value}.${personMonthBirth.value}.${personYearBirth.value}`,
  )

  return {
    value,
    isValid,
    error,
    touch,
    validate,
    reset,
    personDayBirth,
    personMonthBirth,
    personYearBirth,
    personalBirthDate,
  }
}
