<template>
  <div class="fixed top-4 left-4 z-50 flex items-center gap-3">
    <button
      id="btn-return-game"
      @click="handleReturn"
      class="pixel-btn group flex items-center gap-2 border-2 border-cyan-400 bg-slate-950/90 text-cyan-300 px-4 py-2 text-xs md:text-sm font-pixel transition-all duration-200 hover:bg-cyan-400 hover:text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      title="Kembali ke 2D Game Platformer Hub"
    >
      <span class="inline-block transition-transform duration-200 group-hover:-translate-x-1">◄</span>
      <span>KEMBALI KE GAME</span>
    </button>

    <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 text-[11px] font-mono-tech text-cyan-400/80 backdrop-blur-md">
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>POSISI KARAKTER TERSIMPAN</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAudioSynth } from '~/composables/useAudioSynth'

const router = useRouter()
const audio = useAudioSynth()

const handleReturn = () => {
  audio.playWarp()
  router.push('/')
}
</script>
