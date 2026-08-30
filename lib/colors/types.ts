export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface Color {
  hex: string
  rgb: RGB
  hsl: HSL
}

export interface Palette {
  input: string
  base: Color
  /** Always exactly `PALETTE_SIZE` complementary colors. */
  colors: Color[]
}

export type ApiErrorCode =
  | "INVALID_JSON"
  | "INVALID_BODY"
  | "MISSING_COLOR"
  | "INVALID_HEX"
  | "INTERNAL_ERROR"

export interface ApiError {
  code: ApiErrorCode
  message: string
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError }

export type GeneratePaletteResponse = ApiResponse<Palette>
