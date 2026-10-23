<template>
  <div
    class="min-h-screen bg-[#070712] text-slate-100 flex flex-col font-cyber select-none relative"
    :class="{ 'crt-overlay': crtFilter }"
  >
    <NuxtRouteAnnouncer />
    <CyberHeader />
    <main class="flex-1 relative flex flex-col">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useGameState } from '~/composables/useGameState'
import CyberHeader from '~/components/CyberHeader.vue'

const { crtFilter } = useGameState()
</script>

<style>
/* Global resets and transitions */
html, body {
  margin: 0;
  padding: 0;
  background-color: #070712;
  color: #e6f1ff;
  height: 100%;
}
</style>
