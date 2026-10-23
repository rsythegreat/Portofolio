<template>
  <div class="min-h-full flex-1 cyber-grid-bg py-8 px-4 sm:px-6 lg:px-8 relative">
    <ReturnToGameButton />

    <div class="max-w-5xl mx-auto mt-12 md:mt-10">
      <!-- Sector Header -->
      <div class="pixel-box p-6 mb-8 border-emerald-400 bg-slate-950/85">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-emerald-400 font-pixel text-xs mb-1">
              <span class="inline-block w-2 h-2 bg-emerald-400 animate-ping"></span>
              <span>SEKTOR 02 // TECH_MATRIX_DATABASE</span>
            </div>
            <h1 class="font-pixel text-2xl sm:text-3xl text-white tracking-wide">
              SKILLS &amp; <span class="text-emerald-400 neon-glow-green">KEAHLIAN</span>
            </h1>
            <p class="font-mono-tech text-slate-300 text-sm mt-1">
              Fondasi teknologi, bahasa pemrograman, dan alat perancangan perangkat lunak Rasya N.H.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-pixel text-xs">
              TOTAL: {{ skills.length }} DOMAIN UTAMA
            </span>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            'px-3 py-1.5 text-xs font-pixel border transition-all duration-150',
            selectedCategory === cat.id
              ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-[0_0_10px_rgba(57,255,20,0.4)]'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Skills Grid (Exactly matching index.html skill items) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="pixel-box p-5 border-slate-700 hover:border-emerald-400 bg-slate-900/90 transition-all duration-200 group"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 border border-slate-700 group-hover:border-emerald-400 bg-slate-950 flex items-center justify-center text-2xl transition-colors shadow-[inset_0_0_8px_rgba(57,255,20,0.1)]">
                {{ skill.icon }}
              </div>
              <div>
                <h2 class="font-pixel text-xs text-white group-hover:text-emerald-300 transition-colors">
                  {{ skill.name }}
                </h2>
                <span class="text-[10px] font-mono-tech text-slate-400 uppercase">
                  {{ skill.categoryText }}
                </span>
              </div>
            </div>

            <span class="font-pixel text-xs text-emerald-400">
              {{ skill.level }}%
            </span>
          </div>

          <p class="text-xs text-slate-300 mb-4 leading-relaxed font-cyber">
            {{ skill.description }}
          </p>

          <!-- Level Progress Bar -->
          <div class="w-full bg-slate-950 h-2.5 border border-slate-800 group-hover:border-emerald-500/50">
            <div
              class="bg-emerald-400 h-full shadow-[0_0_8px_#39ff14] transition-all duration-500"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Bottom Nav Shortcuts -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <NuxtLink to="/" class="pixel-btn text-xs">
          ◄ KEMBALI KE GAME
        </NuxtLink>

        <NuxtLink to="/projects" class="pixel-btn pixel-btn-pink text-xs">
          LIHAT PROJECTS ►
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ReturnToGameButton from '~/components/ReturnToGameButton.vue'

useHead({
  title: 'Skills & Keahlian | Rasya N.H.',
  meta: [
    { name: 'description', content: 'Keahlian teknis Rasya N.H.: HTML & CSS, Java, Flutter, UI/UX Design, Nuxt & Tailwind, serta System & Database Architecture.' }
  ]
})

const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: 'SEMUA SKILLS' },
  { id: 'web', label: 'WEB & FRONTEND' },
  { id: 'mobile', label: 'MOBILE DEV' },
  { id: 'design', label: 'UI/UX DESIGN' },
  { id: 'system', label: 'SYSTEM & DB' }
]

// Exactly identical to index.html skills list!
const skills = [
  {
    name: 'HTML & CSS',
    category: 'web',
    categoryText: 'Web Basics',
    level: 88,
    icon: '🌐',
    description: 'Pondasi struktur web semantik dan tata letak responsif menggunakan CSS Grid, Flexbox, serta transisi modern.'
  },
  {
    name: 'Java',
    category: 'system',
    categoryText: 'Programming Basics',
    level: 82,
    icon: '☕',
    description: 'Pemahaman dasar pemrograman, struktur data algoritma, dan konsep Object-Oriented Programming (OOP).'
  },
  {
    name: 'Flutter',
    category: 'mobile',
    categoryText: 'Mobile Development',
    level: 80,
    icon: '📱',
    description: 'Pengembangan aplikasi mobile lintas platform (Android/iOS) dengan widget modular dan state management.'
  },
  {
    name: 'UI/UX Design',
    category: 'design',
    categoryText: 'Interface Design',
    level: 85,
    icon: '🎨',
    description: 'Perancangan tata letak visual, wireframing, dan interactive prototype di Figma dengan fokus pada kenyamanan navigasi.'
  },
  {
    name: 'Nuxt & Tailwind',
    category: 'web',
    categoryText: 'Modern Frontend',
    level: 85,
    icon: '⚡',
    description: 'Pengembangan web berbasis komponen Vue yang cepat, modular, dan bersih menggunakan utility classes Tailwind CSS.'
  },
  {
    name: 'System & DB',
    category: 'system',
    categoryText: 'System Architecture',
    level: 84,
    icon: '💾',
    description: 'Perancangan skema relasi basis data, pemodelan tabel, serta arsitektur alur data untuk sistem presensi dan kasir.'
  }
]

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return skills
  return skills.filter(s => s.category === selectedCategory.value)
})
</script>
