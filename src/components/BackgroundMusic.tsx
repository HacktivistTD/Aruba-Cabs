"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create audio element
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0; // start muted
    audioRef.current = audio;

    // Try to autoplay immediately (muted)
    audio
      .play()
      .then(() => {
        // Fade in volume gradually
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (audioRef.current) {
            vol += 0.01;
            audioRef.current.volume = Math.min(vol, 0.5); // target max volume
            if (vol >= 0.5) clearInterval(fadeInterval);
          }
        }, 100); // every 100ms
      })
      .catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction:", err);

        // fallback: wait for first click or touch
        const startMusic = () => {
          audioRef.current?.play().catch((err) =>
            console.log("Playback still blocked:", err)
          );
          window.removeEventListener("click", startMusic);
          window.removeEventListener("touchstart", startMusic);
        };
        window.addEventListener("click", startMusic);
        window.addEventListener("touchstart", startMusic);
      });

    // Cleanup
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
