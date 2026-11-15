// Web Audio & Ringtone Sound Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.isPlaying = false;
    this.audioElement = null;
    this.currentTrack = "apple"; // "apple" | "akon"
    this.listeners = new Set();
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
    try {
      this.currentTrack = trackName;
      this.enabled = true;
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }
      const basePath = import.meta.env.BASE_URL || "/";
      const src = trackName === "akon" 
        ? `${basePath}akon-sms.mp3`
        : `${basePath}apple-ringtone.mp3`;

      this.audioElement = new Audio(src);
      this.audioElement.loop = true; // Continuous repeat until OFF
      this.audioElement.volume = 0.6;
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {
        this.isPlaying = false;
        this.notify();
      });
    } catch {
      // Audio autoplay restrictions
    }
  }

  stopTrack() {
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

