"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create audio element
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0; // start muted for fade-in
    audioRef.current = audio;

    // Play music after first user interaction
    const startMusic = () => {
      audioRef.current?.play().then(() => {
        // Fade in volume over 2 seconds
        let vol = 0;
        const fade = setInterval(() => {
          if (audioRef.current) {
            vol += 0.05;
            audioRef.current.volume = Math.min(vol, 0.5); // max 50%
            if (vol >= 0.5) clearInterval(fade);
          }
        }, 100);
      }).catch(err => {
        console.log("Autoplay blocked:", err);
      });

      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    // Listen for first interaction
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    // Cleanup
    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
