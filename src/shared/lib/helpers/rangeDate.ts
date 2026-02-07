type Option = { name: string; value: number }

export const rangeOptions = (from: number, to: number): Option[] =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const v = from + i
    return { name: String(v), value: v }
  })
