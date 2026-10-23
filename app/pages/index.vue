<template>
  <div class="relative w-full flex-1 flex flex-col overflow-hidden">
    <!-- Playable 2D Platformer Canvas -->
    <GameCanvas />

    <!-- Bottom HUD Status Bar -->
    <footer class="w-full bg-slate-950/90 border-t border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono-tech text-slate-400 z-30">
      <div class="flex items-center gap-3">
        <span class="text-cyan-400 font-pixel text-[9px]">PROGRESS:</span>
        <div class="flex items-center gap-1.5">
          <span
            v-for="b in blocksData"
            :key="b.id"
            :title="`${b.label}: ${visitedBlocks.includes(b.id) ? 'Sudah Dikunjungi' : 'Belum Dikunjungi'}`"
            :class="[
              'w-3 h-3 border flex items-center justify-center text-[7px] font-pixel transition-all',
              visitedBlocks.includes(b.id)
                ? 'bg-emerald-500 border-emerald-300 text-black shadow-[0_0_6px_#39ff14]'
                : 'border-slate-700 bg-slate-900 text-slate-600'
            ]"
          >
            {{ visitedBlocks.includes(b.id) ? '✓' : '' }}
          </span>
        </div>
        <span class="text-slate-500">
          ({{ visitedBlocks.length }}/{{ blocksData.length }} Sektor Terbuka)
        </span>
      </div>

      <!-- Quick Accessibility Shortcut Links -->
      <div class="flex items-center gap-2 mt-1 sm:mt-0">
        <span class="text-[10px] text-slate-500 font-pixel">WARP:</span>
        <div class="flex items-center gap-1.5">
          <NuxtLink
            v-for="b in blocksData"
            :key="b.id"
            :to="b.route"
            class="px-1.5 py-0.5 bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 text-[10px] transition-colors"
          >
            {{ b.label }}
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '~/components/GameCanvas.vue'
import { useGameState } from '~/composables/useGameState'

const { blocksData, visitedBlocks } = useGameState()

useHead({
  title: 'Rasya | Cyberpunk 2D Platformer Portfolio',
  meta: [
    { name: 'description', content: 'Mainkan game platformer 2D untuk menjelajahi portofolio cyberpunk Rasya. Sundul balok untuk membuka halaman!' }
  ]
})
</script>
