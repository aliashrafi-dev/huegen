import type { Color, HSL, RGB } from "./types"
import { normalizeHex } from "./validate"

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Wraps any hue onto the [0, 360) circle. */
export function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360
}

export function hexToRgb(hex: string): RGB {
  const value = parseInt(normalizeHex(hex).slice(1), 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

export function rgbToHex({ r, g, b }: RGB): string {
  const channel = (value: number) =>
    clamp(Math.round(value), 0, 255)
      .toString(16)
      .padStart(2, "0")

  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase()
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const red = clamp(r, 0, 255) / 255
  const green = clamp(g, 0, 255) / 255
  const blue = clamp(b, 0, 255) / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  const lightness = (max + min) / 2

  let hue = 0
  let saturation = 0

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1))

    if (max === red) {
      hue = ((green - blue) / delta) % 6
    } else if (max === green) {
      hue = (blue - red) / delta + 2
    } else {
      hue = (red - green) / delta + 4
    }

    hue *= 60
  }

  return {
    h: normalizeHue(hue),
    s: saturation * 100,
    l: lightness * 100,
  }
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hue = normalizeHue(h)
  const saturation = clamp(s, 0, 100) / 100
  const lightness = clamp(l, 0, 100) / 100

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const second = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const offset = lightness - chroma / 2

  const [red, green, blue] = pickChannels(hue, chroma, second)

  return {
    r: Math.round((red + offset) * 255),
    g: Math.round((green + offset) * 255),
    b: Math.round((blue + offset) * 255),
  }
}

function pickChannels(
  hue: number,
  chroma: number,
  second: number
): [number, number, number] {
  if (hue < 60) return [chroma, second, 0]
  if (hue < 120) return [second, chroma, 0]
  if (hue < 180) return [0, chroma, second]
  if (hue < 240) return [0, second, chroma]
  if (hue < 300) return [second, 0, chroma]
  return [chroma, 0, second]
}

function roundHsl({ h, s, l }: HSL): HSL {
  return {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l),
  }
}

export function colorFromHsl(hsl: HSL): Color {
  const rgb = hslToRgb(hsl)

  return {
    hex: rgbToHex(rgb),
    rgb,
    hsl: roundHsl({
      h: normalizeHue(hsl.h),
      s: clamp(hsl.s, 0, 100),
      l: clamp(hsl.l, 0, 100),
    }),
  }
}

export function colorFromHex(hex: string): Color {
  const rgb = hexToRgb(hex)

  return {
    hex: normalizeHex(hex),
    rgb,
    hsl: roundHsl(rgbToHsl(rgb)),
  }
}
