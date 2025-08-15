"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const a = new Audio("/music.mp3");
      a.loop = true;
      a.volume = 0.5; // set desired volume
      audioRef.current = a;

      const startMusic = () => {
        audioRef.current?.play().catch(err => console.log("Autoplay blocked:", err));
        window.removeEventListener("click", startMusic);
      };

      window.addEventListener("click", startMusic);
    }
  }, []);

  return null;
}
