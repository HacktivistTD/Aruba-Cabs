"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      console.log("Audio loaded successfully");
    };

    const handleError = (e: Event) => {
      const errorMsg = `Audio load error: ${audio.error?.message || "Unknown error"}`;
      setError(errorMsg);
      console.error(errorMsg, e);
    };

    const handleLoadStart = () => {
      console.log("Audio loading started");
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);

    audio.src = "/music.mp3";
    audio.load();

    const attemptAutoplay = async () => {
      if (!audioRef.current || !isLoaded) return;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        console.log("Autoplay successful");

        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (audioRef.current && vol < 0.5) {
            vol += 0.01;
            audioRef.current.volume = Math.min(vol, 0.5);
            if (vol >= 0.5) clearInterval(fadeInterval);
          }
        }, 100);
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction:", err);
        setError("Click anywhere to start music");

        const startMusic = async () => {
          if (!audioRef.current) return;

          try {
            await audioRef.current.play();
            setIsPlaying(true);
            setError(null);
            console.log("Music started after user interaction");

            let vol = 0;
            const fadeInterval = setInterval(() => {
              if (audioRef.current && vol < 0.5) {
                vol += 0.01;
                audioRef.current.volume = Math.min(vol, 0.5);
                if (vol >= 0.5) clearInterval(fadeInterval);
              }
            }, 100);
          } catch (playErr) {
            setError("Failed to play audio");
            console.error("Playback failed:", playErr);
          }

          document.removeEventListener("click", startMusic);
          document.removeEventListener("touchstart", startMusic);
          document.removeEventListener("keydown", startMusic);
        };

        document.addEventListener("click", startMusic);
        document.addEventListener("touchstart", startMusic);
        document.addEventListener("keydown", startMusic);
      }
    };

    if (isLoaded) {
      attemptAutoplay();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("loadstart", handleLoadStart);
        audioRef.current = null;
      }
    };
  }, [isLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 1000,
        maxWidth: "200px",
      }}
    >
      <div>Status: {isPlaying ? "🎵 Playing" : "⏸️ Stopped"}</div>
      <div>Loaded: {isLoaded ? "✅" : "⏳"}</div>
      {error && <div style={{ color: "#ff6b6b" }}>⚠️ {error}</div>}
      {!isPlaying && isLoaded && (
        <button
          onClick={() => audioRef.current?.play().then(() => setIsPlaying(true))}
          style={{ marginTop: "5px", padding: "2px 8px", fontSize: "10px" }}
        >
          Start Music
        </button>
      )}
    </div>
  );
}
