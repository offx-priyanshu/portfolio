// Web Audio & Ringtone Sound Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.audioElement = null;

    // Check user preference saved in localStorage (default: ON unless explicitly turned OFF)
    const savedAudioPref = typeof window !== "undefined" ? localStorage.getItem("portfolio_audio_enabled") : null;
    this.enabled = savedAudioPref === null ? true : savedAudioPref === "true";
    this.userExplicitlyMuted = savedAudioPref === "false";

    this.isPlaying = false;
    this.currentTrack = (typeof window !== "undefined" && localStorage.getItem("portfolio_audio_track")) || "apple"; // "apple" | "akon"
    this.listeners = new Set();
    this.hasBoundGlobalInteraction = false;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTrack(trackName = this.currentTrack) {
    if (this.userExplicitlyMuted) return;

    try {
      this.currentTrack = trackName;
      this.enabled = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_audio_enabled", "true");
        localStorage.setItem("portfolio_audio_track", trackName);
      }

      if (this.audioElement) {
        // If already playing the same source, don't restart
        if (this.isPlaying && !this.audioElement.paused) {
          return;
        }
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }

      const basePath = import.meta.env.BASE_URL || "/";
      const src = trackName === "akon" 
        ? `${basePath}akon-sms.mp3`
        : `${basePath}apple-ringtone.mp3`;

      this.audioElement = new Audio(src);
      this.audioElement.loop = true; // Continuous repeat until OFF
      this.audioElement.volume = 0.55;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch(() => {
            // Browser autoplay restrictions: bind first user interaction
            this.isPlaying = false;
            this.notify();
            this.bindAutoResume();
          });
      }
    } catch {
      // Audio autoplay restrictions
    }
  }

  bindAutoResume() {
    if (this.hasBoundGlobalInteraction || this.userExplicitlyMuted || typeof window === "undefined") return;
    this.hasBoundGlobalInteraction = true;

    const startAudioOnFirstInteraction = () => {
      if (!this.userExplicitlyMuted && !this.isPlaying) {
        this.playTrack(this.currentTrack);
      }
      window.removeEventListener("click", startAudioOnFirstInteraction);
      window.removeEventListener("keydown", startAudioOnFirstInteraction);
      window.removeEventListener("touchstart", startAudioOnFirstInteraction);
      this.hasBoundGlobalInteraction = false;
    };

    window.addEventListener("click", startAudioOnFirstInteraction, { once: true });
    window.addEventListener("keydown", startAudioOnFirstInteraction, { once: true });
    window.addEventListener("touchstart", startAudioOnFirstInteraction, { once: true });
  }

  stopTrack() {
    this.userExplicitlyMuted = true;
    this.enabled = false;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_audio_enabled", "false");
    }

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.stopTrack();
      return false;
    } else {
      this.userExplicitlyMuted = false;
      this.playTrack(this.currentTrack);
      return true;
    }
  }

  playTick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Audio context not allowed or blocked
    }
  }

  playMode() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.065);
    } catch {
      // Ignore
    }
  }
}

export const sounds = new SoundEngine();

