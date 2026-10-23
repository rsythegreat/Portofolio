<template>
  <header class="w-full bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 z-40 flex items-center justify-between text-xs font-mono-tech select-none">
    <!-- Brand / Player status -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="w-2.5 h-2.5 bg-cyan-400 group-hover:bg-pink-500 shadow-[0_0_8px_#00f0ff] animate-ping"></span>
        <span class="font-pixel text-[11px] sm:text-xs text-cyan-300 group-hover:text-pink-400 transition-colors">
          RASYA N.H.
        </span>
      </NuxtLink>
      <span class="hidden md:inline-block text-slate-600">|</span>
      <span class="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
        <span class="text-cyan-400">SMKN 71 JAKARTA</span> • SOFTWARE ENGINEERING
      </span>
    </div>

    <!-- Quick Navigation Blocks indicator -->
    <div class="hidden lg:flex items-center gap-2">
      <span class="text-[10px] text-slate-500 font-pixel mr-1">SEKTOR:</span>
      <NuxtLink
        v-for="block in blocksData"
        :key="block.id"
        :to="block.route"
        @click="audio.playCollect()"
        :class="[
          'px-2 py-1 text-[10px] font-pixel border transition-all duration-200 flex items-center gap-1.5',
          visitedBlocks.includes(block.id)
            ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 shadow-[0_0_8px_rgba(57,255,20,0.3)]'
            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-cyan-400 hover:text-cyan-300'
        ]"
      >
        <span>{{ block.icon }}</span>
        <span>{{ block.label }}</span>
        <span v-if="visitedBlocks.includes(block.id)" class="text-emerald-400 text-[9px]">✓</span>
      </NuxtLink>
    </div>

    <!-- Controls & Chips -->
    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Chips collected -->
      <div class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-yellow-500/40 text-yellow-300 font-pixel text-[10px]">
        <span class="text-yellow-400">✦</span>
        <span>{{ score }}</span>
        <span class="hidden sm:inline text-yellow-500/70 text-[9px]">CHIPS</span>
      </div>

      <!-- CRT Toggle -->
      <button
        @click="crtFilter = !crtFilter"
        class="px-2 py-1 border text-[10px] font-pixel transition-colors flex items-center gap-1"
        :class="crtFilter ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300' : 'border-slate-800 text-slate-500'"
        title="Toggle CRT Scanline Effect"
      >
        <span>CRT</span>
        <span :class="crtFilter ? 'text-cyan-400' : 'text-slate-600'">{{ crtFilter ? 'ON' : 'OFF' }}</span>
      </button>

      <!-- Audio Mute Toggle -->
      <button
        @click="toggleAudio"
        class="px-2 py-1 border text-[10px] font-pixel transition-colors flex items-center gap-1"
        :class="!soundMuted ? 'border-pink-500/50 bg-pink-950/40 text-pink-300' : 'border-slate-800 text-slate-500'"
        title="Toggle Sound Effects"
      >
        <span>{{ soundMuted ? '🔇' : '🔊' }}</span>
        <span class="hidden sm:inline">{{ soundMuted ? 'MUTE' : 'SFX' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGameState } from '~/composables/useGameState'
import { useAudioSynth } from '~/composables/useAudioSynth'

const { blocksData, visitedBlocks, score, crtFilter, soundMuted } = useGameState()
const audio = useAudioSynth()

const toggleAudio = () => {
  soundMuted.value = !soundMuted.value
  audio.isMuted = soundMuted.value
  if (!soundMuted.value) {
    audio.playCollect()
  }
}
</script>
