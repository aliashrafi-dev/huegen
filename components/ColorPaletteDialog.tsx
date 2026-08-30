"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface ColorPaletteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  color: string
}

const colors = [
  "#6366F1",
  "#818CF8",
  "#A5B4FC",
  "#C7D2FE",
  "#E0E7FF",
]

export function ColorPaletteDialog({
  open,
  onOpenChange,
  color,
}: ColorPaletteDialogProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyColor = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)

      setCopied(value)

      setTimeout(() => {
        setCopied(null)
      }, 1500)
    } catch {
      console.error("Failed to copy color")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-3xl
          rounded-3xl
          border
          bg-background
          p-0
          shadow-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="p-6 pb-4 sm:p-8 sm:pb-5">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Your color palette
          </DialogTitle>

          <DialogDescription className="text-sm leading-6">
            Colors that work beautifully with your selected color.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          {/* Original color */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Original color
            </p>

            <div className="flex items-center gap-4 rounded-2xl border bg-card p-3">
              <div
                className="h-16 w-16 shrink-0 rounded-xl"
                style={{
                  backgroundColor: color,
                }}
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Selected
                </p>

                <p className="mt-1 text-lg font-semibold uppercase">
                  {color}
                </p>
              </div>
            </div>
          </div>

          {/* Palette */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Complementary colors
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {colors.map((item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-card
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  {/* Color */}
                  <div
                    className="h-28 sm:h-36"
                    style={{
                      backgroundColor: item,
                    }}
                  />

                  {/* Info */}
                  <div className="flex items-center justify-between gap-2 p-3">
                    <span className="text-xs font-medium uppercase">
                      {item}
                    </span>

                    <button
                      type="button"
                      onClick={() => copyColor(item)}
                      className="
                        flex h-8 w-8
                        shrink-0
                        items-center justify-center
                        rounded-lg
                        border
                        bg-background
                        transition
                        hover:bg-muted
                      "
                      aria-label={`Copy ${item}`}
                    >
                      {copied === item ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}