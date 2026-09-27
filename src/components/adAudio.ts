/**
 * Royalty-free background music for the promo ad, synthesised live with the Web Audio API
 * (no audio files). An upbeat 112 BPM loop — kick, hats, bass and chord stabs — plus short
 * sound effects for scene changes.
 */

const BPM = 112;
const STEP = 60 / BPM / 4; // one 16th note, in seconds
const LOOKAHEAD = 0.12;
const VOLUME = 0.8;

// A minor-ish pop progression: Am – F – C – G (root notes in Hz for the bass, triads for the stabs)
const BARS = [
  { bass: 110.0, chord: [220.0, 261.63, 329.63] },
  { bass: 87.31, chord: [174.61, 220.0, 261.63] },
  { bass: 130.81, chord: [261.63, 329.63, 392.0] },
  { bass: 98.0, chord: [196.0, 246.94, 293.66] },
];

export type Sfx = "whoosh" | "pop" | "ding";

export class AdMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;

  get running() {
    return this.timer !== null;
  }

  /**
   * Must be called directly inside a click/tap handler: browsers (Safari and iOS in particular)
   * only let audio start when the AudioContext is created or resumed during a user gesture.
   */
  unlock() {
    const ctx = this.ensureContext();
    void ctx.resume();
    const silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    silent.connect(ctx.destination);
    silent.start();
  }

  start() {
    if (this.timer !== null) return;
    const ctx = this.ensureContext();
    void ctx.resume();
    this.master!.gain.setTargetAtTime(VOLUME, ctx.currentTime, 0.05);
    this.nextTime = ctx.currentTime + 0.05;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stop() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    if (this.ctx && this.master) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
  }

  /** Restart the loop from bar 1 (used when the ad is replayed). */
  resetBeat() {
    this.step = 0;
    if (this.ctx) this.nextTime = this.ctx.currentTime + 0.05;
  }

  private ensureContext() {
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = VOLUME;
      this.master.connect(this.ctx.destination);
      this.noise = this.makeNoise();
    }
    return this.ctx;
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
  }

  sfx(kind: Sfx) {
    if (!this.ctx || !this.master || this.timer === null) return;
    const t = this.ctx.currentTime;
    if (kind === "whoosh") {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noise;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 1.2;
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(4000, t + 0.35);
      const gain = this.envelope(t, 0.25, 0.4);
      src.connect(filter).connect(gain).connect(this.master);
      src.start(t);
      src.stop(t + 0.45);
    } else {
      const freqs = kind === "ding" ? [1046.5, 1568] : [880];
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const start = t + i * 0.08;
        const gain = this.envelope(start, kind === "ding" ? 0.22 : 0.18, kind === "ding" ? 0.6 : 0.12);
        osc.connect(gain).connect(this.master!);
        osc.start(start);
        osc.stop(start + 0.7);
      });
    }
  }

  private schedule() {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      this.playStep(this.step, this.nextTime);
      this.nextTime += STEP;
      this.step = (this.step + 1) % (16 * BARS.length);
    }
  }

  private playStep(step: number, t: number) {
    const bar = BARS[Math.floor(step / 16)];
    const s = step % 16;

    if (s % 4 === 0) this.kick(t);
    if (s === 4 || s === 12) this.clap(t);
    if (s % 2 === 0) this.hat(t, s % 4 === 2 ? 0.07 : 0.035);

    // Bass: driving 8ths with an octave jump on the off-beat
    if (s % 2 === 0) this.bass(t, s % 4 === 2 ? bar.bass * 2 : bar.bass);

    // Chord stabs on a syncopated pattern
    if (s === 0 || s === 6 || s === 10) this.stab(t, bar.chord);
  }

  private envelope(t: number, peak: number, decay: number) {
    const gain = this.ctx!.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    return gain;
  }

  private kick(t: number) {
    const osc = this.ctx!.createOscillator();
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const gain = this.envelope(t, 0.9, 0.3);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.32);
  }

  private clap(t: number) {
    const src = this.ctx!.createBufferSource();
    src.buffer = this.noise;
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1500;
    const gain = this.envelope(t, 0.3, 0.18);
    src.connect(filter).connect(gain).connect(this.master!);
    src.start(t);
    src.stop(t + 0.2);
  }

  private hat(t: number, level: number) {
    const src = this.ctx!.createBufferSource();
    src.buffer = this.noise;
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 7000;
    const gain = this.envelope(t, level, 0.05);
    src.connect(filter).connect(gain).connect(this.master!);
    src.start(t);
    src.stop(t + 0.06);
  }

  private bass(t: number, freq: number) {
    const osc = this.ctx!.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;
    const gain = this.envelope(t, 0.16, STEP * 1.8);
    osc.connect(filter).connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + STEP * 2);
  }

  private stab(t: number, chord: number[]) {
    chord.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq * 2;
      const gain = this.envelope(t, 0.06, 0.28);
      osc.connect(gain).connect(this.master!);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }

  private makeNoise() {
    const ctx = this.ctx!;
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }
}
