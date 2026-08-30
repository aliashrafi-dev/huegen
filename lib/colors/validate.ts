const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isValidHex(value: string): boolean {
  return HEX_PATTERN.test(value.trim())
}

/**
 * Expands shorthand notation and returns a `#RRGGBB` string.
 * Throws when the value is not a valid HEX color.
 */
export function normalizeHex(value: string): string {
  const match = HEX_PATTERN.exec(value.trim())

  if (!match) {
    throw new Error(`Invalid HEX color: ${value}`)
  }

  const digits = match[1]

  const expanded =
    digits.length === 3
      ? digits
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : digits

  return `#${expanded.toUpperCase()}`
}
