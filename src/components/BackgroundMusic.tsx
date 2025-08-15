"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      const a = new Audio("/music.mp3");
      a.loop = true;
      a.volume = 0; // start muted for fade-in
      audioRef.current = a;

      const startMusic = () => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              let vol = 0;
              const fadeInterval = setInterval(() => {
                if (audioRef.current) {
                  if (vol < 0.5) {
                    vol += 0.01;
                    audioRef.current.volume = vol;
                  } else {
                    audioRef.current.volume = 0.5; // target volume
                    clearInterval(fadeInterval);
                  }
                }
              }, 100);
            })
            .catch((err) => console.log("Autoplay blocked:", err));
        }
        window.removeEventListener("click", startMusic);
      };

      window.addEventListener("click", startMusic);

      return () => window.removeEventListener("click", startMusic);
    }
  }, []);

  return null;
}
