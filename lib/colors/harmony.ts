import { clamp, colorFromHsl } from "./convert"
import type { Color, HSL } from "./types"

/** Number of complementary colors returned for every input. */
export const PALETTE_SIZE = 5

const COMPLEMENT_ROTATION = 180
const HUE_SPREAD = 30
const LIGHTNESS_SPREAD = 32
const MIN_LIGHTNESS = 12
const MAX_LIGHTNESS = 88

/**
 * Builds a five-color palette centred on the complement of the base hue.
 *
 * Colors sweep a narrow arc around the complement while stepping through
 * lightness, so the middle entry is the exact complement and the set stays
 * visually distinct. The lightness window is shifted rather than clamped so
 * near-black and near-white inputs still produce five different colors.
 */
export function buildComplementaryColors(base: HSL): Color[] {
  const step = LIGHTNESS_SPREAD / (PALETTE_SIZE - 1)

  const start = clamp(
    base.l - LIGHTNESS_SPREAD / 2,
    MIN_LIGHTNESS,
    MAX_LIGHTNESS - LIGHTNESS_SPREAD
  )

  return Array.from({ length: PALETTE_SIZE }, (_, index) => {
    const offset = index / (PALETTE_SIZE - 1) - 0.5

    return colorFromHsl({
      h: base.h + COMPLEMENT_ROTATION + offset * HUE_SPREAD,
      s: base.s,
      l: start + index * step,
    })
  })
}
