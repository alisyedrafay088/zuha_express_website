/**
 * Audio for the promo ad: a looping background track (public/ad-music.mp3, "Upbeat Happy
 * Corporate" by kornevmusic from Pixabay — free for commercial use) plus short synthesised
 * sound effects for scene changes.
 */

const MUSIC_URL = "/ad-music.mp3";
const MUSIC_VOLUME = 0.6;
const SFX_VOLUME = 0.35;

export type Sfx = "whoosh" | "ding";

export class AdMusic {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private sfxOut: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private playing = false;

  get running() {
    return this.playing;
  }

  /**
   * Must be called directly inside a click/tap handler: browsers (Safari and iOS in particular)
   * only allow audio to start during a user gesture.
   */
  unlock() {
    this.ensureAudio();
    const ctx = this.ensureContext();
    void ctx.resume();
  }

  start() {
    if (this.playing) return;
    this.playing = true;
    const audio = this.ensureAudio();
    audio.volume = MUSIC_VOLUME;
    void audio.play().catch(() => {
      this.playing = false;
    });
    void this.ctx?.resume();
  }

  stop() {
    this.playing = false;
    this.audio?.pause();
  }

  /** Restart the track from the beginning (used when the ad is replayed). */
  resetBeat() {
    if (this.audio) this.audio.currentTime = 0;
  }

  dispose() {
    this.stop();
    if (this.audio) {
      this.audio.removeAttribute("src");
      this.audio.load();
    }
    this.audio = null;
    void this.ctx?.close();
    this.ctx = null;
  }

  sfx(kind: Sfx) {
    if (!this.playing || !this.ctx || !this.sfxOut) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    if (kind === "whoosh") {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 1.2;
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(4000, t + 0.35);
      const gain = this.envelope(t, 0.25, 0.4);
      src.connect(filter).connect(gain).connect(this.sfxOut);
      src.start(t);
      src.stop(t + 0.45);
      return;
    }
    [1046.5, 1568].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = t + i * 0.08;
      const gain = this.envelope(start, 0.22, 0.6);
      osc.connect(gain).connect(this.sfxOut!);
      osc.start(start);
      osc.stop(start + 0.7);
    });
  }

  private ensureAudio() {
    if (!this.audio) {
      this.audio = new Audio(MUSIC_URL);
      this.audio.loop = true;
      this.audio.preload = "auto";
    }
    return this.audio;
  }

  private ensureContext() {
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.sfxOut = this.ctx.createGain();
      this.sfxOut.gain.value = SFX_VOLUME;
      this.sfxOut.connect(this.ctx.destination);
      this.noise = this.makeNoise();
    }
    return this.ctx;
  }

  private envelope(t: number, peak: number, decay: number) {
    const gain = this.ctx!.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    return gain;
  }

  private makeNoise() {
    const ctx = this.ctx!;
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }
}
