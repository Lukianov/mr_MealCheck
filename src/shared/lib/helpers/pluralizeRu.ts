export type RuForms = [one: string, few: string, many: string]

export function pluralizeRu(
  n: number,
  [one, few, many]: RuForms,
  opts: { withNumber?: boolean } = {},
): string {
  const { withNumber = true } = opts

  const abs = Math.abs(n)

  if (!Number.isInteger(abs)) {
    return withNumber ? `${n} ${few}` : few
  }

  const i = Math.trunc(abs)
  const mod10 = i % 10
  const mod100 = i % 100

  let word = many

  if (mod10 === 1 && mod100 !== 11) {
    word = one
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    word = few
  }

  return withNumber ? `${n} ${word}` : word
}
