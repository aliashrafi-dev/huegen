import { colorFromHex, rgbToHsl } from "./convert"
import { buildComplementaryColors } from "./harmony"
import type { Palette } from "./types"

/**
 * Generates the complementary palette for a HEX color.
 * Throws when the input is not a valid HEX color, so validate first.
 */
export function generatePalette(input: string): Palette {
  const base = colorFromHex(input)

  // Derived from the unrounded HSL so hue rotation doesn't accumulate
  // rounding drift.
  const precise = rgbToHsl(base.rgb)

  return {
    input: input.trim(),
    base,
    colors: buildComplementaryColors(precise),
  }
}
