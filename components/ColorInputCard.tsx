"use client"

import { useState } from "react"
import { Palette, ArrowRight, Loader2 } from "lucide-react"
import { ColorPaletteDialog } from "./ColorPaletteDialog"
import { isValidHex } from "@/lib/colors/validate"
import type { GeneratePaletteResponse, Palette as ColorPalette } from "@/lib/colors"

export function ColorInputCard() {
  const [color, setColor] = useState("#6366F1")
  const [open, setOpen] = useState(false)
  const [palette, setPalette] = useState<ColorPalette | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateColor = (value: string) => {
    setColor(value)
    setError(null)
  }

  const generate = async () => {
    if (loading) return

    if (!isValidHex(color)) {
      setError("Enter a valid HEX color, like #6366F1.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/colors/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      })

      const result: GeneratePaletteResponse = await response.json()

      if (!result.success) {
        setError(result.error.message)
        return
      }

      setPalette(result.data)
      setOpen(true)
    } catch {
      setError("Could not reach the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="w-full max-w-xl mx-auto px-4">
        <div
          className="
            rounded-3xl
            border border-border
            bg-card
            p-6
            sm:p-8
            shadow-sm
          "
        >
          {/* Icon */}
          <div
            className="
              mb-6
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <Palette className="h-6 w-6" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Find your perfect colors
            </h2>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Enter a color and discover beautiful complementary colors
              that work perfectly together.
            </p>
          </div>

          {/* Input */}
          <div className="mt-7">
            <label
              htmlFor="color"
              className="mb-2 block text-sm font-medium"
            >
              Your color
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-2xl
                border border-input
                bg-background
                p-2
                transition
                focus-within:border-primary
                focus-within:ring-2
                focus-within:ring-primary/10
              "
            >
              {/* Color preview */}
              <div
                className="
                  h-12 w-12
                  shrink-0
                  rounded-xl
                  shadow-sm
                  ring-1 ring-black/10
                "
                style={{
                  backgroundColor: color,
                }}
              />

              {/* HEX */}
              <input
                id="color"
                type="text"
                value={color}
                onChange={(e) => updateColor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generate()
                }}
                placeholder="#6366F1"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  text-sm
                  font-medium
                  uppercase
                  outline-none
                  placeholder:text-muted-foreground
                "
              />

              {/* Generate */}
              <button
                type="button"
                onClick={generate}
                disabled={loading}
                aria-busy={loading}
                className="
                  flex h-12
                  shrink-0
                  items-center gap-2
                  rounded-xl
                  bg-primary
                  px-4
                  text-sm
                  font-medium
                  text-primary-foreground
                  shadow-sm
                  transition
                  hover:bg-primary/90
                  active:scale-[0.98]
                  disabled:pointer-events-none
                  disabled:opacity-60
                "
              >
                <span className="hidden sm:inline">
                  {loading ? "Generating" : "Generate"}
                </span>

                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mt-3 text-xs font-medium text-destructive"
            >
              {error}
            </p>
          )}

          {/* Helper */}
          <div
            className="
              mt-4
              flex items-center justify-between
              text-xs
              text-muted-foreground
            "
          >
            <span>Enter a HEX color</span>

            <button
              type="button"
              onClick={() => updateColor("#6366F1")}
              className="
                font-medium
                text-foreground
                transition
                hover:text-primary
              "
            >
              Try an example
            </button>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <ColorPaletteDialog
        open={open}
        onOpenChange={setOpen}
        palette={palette}
      />
    </>
  )
}