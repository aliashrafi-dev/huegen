import { generatePalette, isValidHex } from "@/lib/colors"
import type { ApiErrorCode, GeneratePaletteResponse } from "@/lib/colors"

function fail(code: ApiErrorCode, message: string, status: number): Response {
  const body: GeneratePaletteResponse = {
    success: false,
    error: { code, message },
  }

  return Response.json(body, { status })
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return fail("INVALID_JSON", "Request body must be valid JSON.", 400)
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return fail("INVALID_BODY", "Request body must be a JSON object.", 400)
  }

  const { color } = body as { color?: unknown }

  if (typeof color !== "string" || color.trim() === "") {
    return fail(
      "MISSING_COLOR",
      'Field "color" is required and must be a string.',
      400
    )
  }

  if (!isValidHex(color)) {
    return fail(
      "INVALID_HEX",
      `"${color}" is not a valid HEX color. Use #RGB or #RRGGBB.`,
      422
    )
  }

  try {
    const payload: GeneratePaletteResponse = {
      success: true,
      data: generatePalette(color),
    }

    return Response.json(payload, { status: 200 })
  } catch {
    return fail(
      "INTERNAL_ERROR",
      "Failed to generate the palette. Please try again.",
      500
    )
  }
}
