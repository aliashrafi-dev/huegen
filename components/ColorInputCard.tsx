"use client"

import { useState } from "react"
import { Palette, ArrowRight } from "lucide-react"

export function ColorInputCard() {
  const [color, setColor] = useState("#6366F1")

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div
        className="
          relative overflow-hidden
          rounded-[28px]
          border border-white/30
          bg-white/[0.08]
          p-6 sm:p-8
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          backdrop-blur-[30px]
          backdrop-saturate-150
        "
      >
        {/* Glass highlight */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/70
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute -top-24 -right-24
            h-48 w-48
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        {/* Icon */}
        <div
          className="
            relative
            mb-6
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            border border-white/25
            bg-white/[0.12]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
            backdrop-blur-xl
          "
        >
          <Palette className="h-6 w-6 text-foreground" />
        </div>

        {/* Title */}
        <div className="relative space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Find your perfect colors
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            Enter a color and discover beautiful complementary colors
            that work perfectly together.
          </p>
        </div>

        {/* Color Input */}
        <div className="relative mt-7">
          <label
            htmlFor="color"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Your color
          </label>

          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-white/25
              bg-black/[0.05]
              p-2
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
              backdrop-blur-xl
              transition-all
              focus-within:border-white/40
              focus-within:bg-white/[0.10]
              focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]
            "
          >
            {/* Color preview */}
            <div
              className="
                h-12 w-12 shrink-0
                rounded-xl
                shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]
                ring-1 ring-black/10
              "
              style={{ backgroundColor: color }}
            />

            {/* HEX input */}
            <input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#6366F1"
              className="
                min-w-0 flex-1
                bg-transparent
                px-2
                text-sm font-medium uppercase
                text-foreground
                outline-none
                placeholder:text-muted-foreground
              "
            />

            {/* Generate */}
            <button
              type="button"
              className="
                flex h-12 shrink-0
                items-center gap-2
                rounded-xl
                border border-white/20
                bg-white/20
                px-4
                text-sm font-medium
                text-foreground
                shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                backdrop-blur-xl
                transition-all
                hover:bg-white/30
                hover:shadow-lg
                active:scale-[0.98]
              "
            >
              <span className="hidden sm:inline">
                Generate
              </span>

              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Example */}
        <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Enter a HEX color</span>

          <button
            type="button"
            onClick={() => setColor("#6366F1")}
            className="
              font-medium
              text-foreground/70
              transition
              hover:text-foreground
            "
          >
            Try an example
          </button>
        </div>
      </div>
    </div>
  )
}