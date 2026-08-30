"use client";
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import {DialogCloseButton} from "@/components/butten"



export function GlowingStarsBackgroundCardPreview() {
  return (
    <div className="flex items-center justify-center pt-8 pb-4 antialiased">
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>Huegen</GlowingStarsTitle>
        <div className="flex items-end justify-between">
          <GlowingStarsDescription>
            Enter a color, discover its perfect palette.
          </GlowingStarsDescription>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(267, 90%, 12%, 0.10)] text-white">
                  <div>
        <DialogCloseButton/>
      </div>
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 stroke-2 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
