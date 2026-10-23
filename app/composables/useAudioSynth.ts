// Cyberpunk 8-bit Web Audio Synthesizer
// Clean, zero-dependency, procedural sound generator

class RetroAudioEngine {
  private ctx: AudioContext | null = null
  public isMuted: boolean = false

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Jump sound: classic upward pitch slide
  playJump() {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.12)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.15)
  }

  // Block hit: punchy arcade bump
  playBlockHit() {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    
    // Impact thud
    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(260, now)
    osc1.frequency.exponentialRampToValueAtTime(80, now + 0.1)
    gain1.gain.setValueAtTime(0.25, now)
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12)
    osc1.connect(gain1)
    gain1.connect(this.ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.12)

    // Cyber sparkle harmonic
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'square'
    osc2.frequency.setValueAtTime(587.33, now + 0.04) // D5
    osc2.frequency.setValueAtTime(880, now + 0.08)    // A5
    gain2.gain.setValueAtTime(0.15, now + 0.04)
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.22)
    osc2.connect(gain2)
    gain2.connect(this.ctx.destination)
    osc2.start(now + 0.04)
    osc2.stop(now + 0.23)
  }

  // Warp / Navigation sound: futuristic arpeggio
  playWarp() {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()
      const time = now + idx * 0.05

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, time)

      gain.gain.setValueAtTime(0.12, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx!.destination)

      osc.start(time)
      osc.stop(time + 0.1)
    })
  }

  // Collect item sound: chime ping
  playCollect() {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(987.77, now) // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08) // E6

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.26)
  }
}

let audioInstance: RetroAudioEngine | null = null

export const useAudioSynth = () => {
  if (!audioInstance) {
    audioInstance = new RetroAudioEngine()
  }
  return audioInstance
}
