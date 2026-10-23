<template>
  <div class="min-h-full flex-1 cyber-grid-bg py-8 px-4 sm:px-6 lg:px-8 relative">
    <ReturnToGameButton />

    <div class="max-w-6xl mx-auto mt-12 md:mt-10">
      <!-- Sector Header -->
      <div class="pixel-box p-6 mb-8 border-pink-500 bg-slate-950/85">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-pink-400 font-pixel text-xs mb-1">
              <span class="inline-block w-2 h-2 bg-pink-500 animate-ping"></span>
              <span>SEKTOR 03 // PROJECT_SHOWCASE_ARCHIVES</span>
            </div>
            <h1 class="font-pixel text-2xl sm:text-3xl text-white tracking-wide">
              SELECTED <span class="text-pink-500 neon-glow-pink">PROJECTS</span>
            </h1>
            <p class="font-mono-tech text-slate-300 text-sm mt-1">
              Koleksi proyek nyata Rasya N.H. dari proses belajar dan penerapan kemampuan teknis.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-pink-950/60 border border-pink-500/50 text-pink-300 font-pixel text-xs">
              TOTAL: {{ projects.length }} PROYEK
            </span>
          </div>
        </div>
      </div>

      <!-- Filter Tabs: Semua, Web & System, Mobile & UI/UX -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="cat in projectCategories"
          :key="cat.id"
          @click="selectedProjectCat = cat.id"
          :class="[
            'px-3.5 py-1.5 text-xs font-pixel border transition-all duration-150 cursor-pointer',
            selectedProjectCat === cat.id
              ? 'border-pink-500 bg-pink-950/60 text-pink-300 shadow-[0_0_10px_rgba(255,0,127,0.4)]'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white'
          ]"
        >
          {{ cat.label }} ({{ countByCategory(cat.id) }})
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          v-for="proj in filteredProjects"
          :key="proj.id"
          :id="`project-card-${proj.id}`"
          class="pixel-box p-5 border-slate-700 hover:border-pink-500 bg-slate-900/90 flex flex-col justify-between transition-all duration-200 group relative"
          :class="{ 'ring-1 ring-pink-500/60 shadow-[0_0_20px_rgba(255,0,127,0.25)]': proj.featured }"
        >
          <div>
            <!-- Banner Screenshot / Mockup Preview -->
            <div
              class="h-52 mb-4 border border-slate-800 bg-slate-950 relative overflow-hidden cursor-pointer group-hover:border-pink-500/70 transition-colors"
              @click="openModal(proj)"
            >
              <img
                :src="proj.image"
                :alt="proj.title"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              <!-- Category Badge (Top Right) -->
              <span class="absolute top-2.5 right-2.5 px-2 py-0.5 bg-slate-950/90 border border-pink-500/60 text-[9px] font-pixel text-pink-300">
                {{ proj.categoryLabel }}
              </span>

              <!-- Mockup Indicator Badge (Top Left) -->
              <span
                v-if="proj.isMockup"
                class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-yellow-950/90 border border-yellow-500/70 text-[9px] font-pixel text-yellow-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,230,0,0.3)]"
                title="Mockup antarmuka visual (bukan screenshot produksi)"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                <span>{{ proj.mockupBadge || 'CUSTOM MOCKUP' }}</span>
              </span>

              <!-- Featured Badge (if featured and not mockup) -->
              <span
                v-else-if="proj.featured"
                class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-cyan-950/90 border border-cyan-500/70 text-[9px] font-pixel text-cyan-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              >
                <span>★ FEATURED</span>
              </span>
            </div>

            <div class="flex items-baseline justify-between gap-2 mb-2">
              <h2
                class="font-pixel text-sm text-white group-hover:text-pink-400 transition-colors cursor-pointer"
                @click="openModal(proj)"
              >
                {{ proj.title }}
              </h2>
            </div>

            <p class="text-xs text-slate-300 mb-4 font-cyber leading-relaxed">
              {{ proj.snippet }}
            </p>
          </div>

          <div>
            <!-- Tags Cluster -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="tag in proj.tags"
                :key="tag"
                class="px-2 py-0.5 bg-slate-950 text-[10px] font-mono-tech text-cyan-300 border border-cyan-500/30"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Card Actions Row -->
            <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800">
              <button
                @click="openModal(proj)"
                class="flex-1 py-2 px-3 bg-slate-950 hover:bg-pink-950 border border-pink-500 text-pink-300 hover:text-white font-pixel text-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>LIHAT DETAIL</span>
                <span>➔</span>
              </button>

              <!-- Quick VIEW CODE link (if githubUrl configured) -->
              <a
                v-if="proj.githubUrl"
                :href="proj.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="py-2 px-3 bg-slate-950 hover:bg-cyan-950 border border-cyan-400 text-cyan-300 hover:text-white font-pixel text-[10px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                title="Buka Source Code di GitHub (tab baru)"
              >
                <span>VIEW CODE</span>
                <span>↗</span>
              </a>

              <!-- Quick LIVE DEMO link (if demoUrl configured) -->
              <a
                v-if="proj.demoUrl"
                :href="proj.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="py-2 px-3 bg-slate-950 hover:bg-emerald-950 border border-emerald-400 text-emerald-300 hover:text-white font-pixel text-[10px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_8px_rgba(57,255,20,0.2)]"
                title="Buka Live Demo (tab baru)"
              >
                <span>DEMO</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Detail Modal Dialog -->
      <div
        v-if="activeModalProj"
        id="project-detail-modal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="pixel-box p-6 max-w-2xl w-full border-pink-500 bg-slate-900 shadow-[0_0_35px_rgba(255,0,127,0.35)] max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-start justify-between mb-4 gap-3">
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <span class="px-2 py-0.5 bg-pink-950/80 border border-pink-500/60 text-[9px] font-pixel text-pink-300">
                  {{ activeModalProj.categoryLabel }}
                </span>
                <span
                  v-if="activeModalProj.isMockup"
                  class="px-2 py-0.5 bg-yellow-950/80 border border-yellow-500/60 text-[9px] font-pixel text-yellow-300 flex items-center gap-1"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span>{{ activeModalProj.mockupBadge || 'CUSTOM MOCKUP' }}</span>
                </span>
              </div>
              <h3 class="font-pixel text-base sm:text-lg text-pink-300 mb-2">
                {{ activeModalProj.title }}
              </h3>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in activeModalProj.tags"
                  :key="tag"
                  class="px-2 py-0.5 bg-slate-950 text-[10px] font-mono-tech text-cyan-300 border border-cyan-500/40"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <button
              id="modal-close-btn"
              @click="closeModal"
              class="w-8 h-8 shrink-0 border border-slate-700 hover:border-pink-500 text-slate-400 hover:text-pink-400 font-pixel text-sm flex items-center justify-center bg-slate-950 cursor-pointer"
              title="Tutup dialog"
            >
              ✕
            </button>
          </div>

          <!-- Cover Image Preview -->
          <div class="border border-slate-800 mb-2 bg-slate-950 overflow-hidden relative">
            <img
              :src="activeModalProj.image"
              :alt="activeModalProj.title"
              class="w-full max-h-80 object-cover object-top"
            />
          </div>

          <!-- Mockup Transparency Notice (Honest mockup statement) -->
          <div
            v-if="activeModalProj.isMockup"
            class="mb-4 px-3 py-2 bg-yellow-950/30 border border-yellow-500/40 text-yellow-200/90 text-[11px] font-mono-tech flex items-start gap-2"
          >
            <span class="text-yellow-400 font-pixel text-xs">ℹ</span>
            <span>
              {{ activeModalProj.mockupNote || 'Pratinjau visual merupakan custom UI mockup desain antarmuka sistem kasir RasyaPOS, bukan tangkapan layar langsung dari lingkungan produksi.' }}
            </span>
          </div>

          <!-- Description Section -->
          <div class="mb-4 space-y-2">
            <h4 class="font-pixel text-[11px] text-cyan-400">
              DESKRIPSI PROYEK:
            </h4>
            <p class="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed font-cyber">
              {{ activeModalProj.snippet }}
            </p>
            <p v-if="activeModalProj.desc && activeModalProj.desc !== activeModalProj.snippet" class="text-xs sm:text-sm text-slate-300 leading-relaxed font-cyber">
              {{ activeModalProj.desc }}
            </p>
          </div>

          <!-- Highlights (Sorotan Utama) -->
          <div class="mb-6 p-4 bg-slate-950 border border-pink-500/30">
            <h4 class="font-pixel text-[11px] text-pink-400 mb-2.5">
              FITUR &amp; KEUNGGULAN UTAMA:
            </h4>
            <ul class="space-y-2 text-xs text-slate-300 font-mono-tech">
              <li
                v-for="(hl, idx) in activeModalProj.highlights"
                :key="idx"
                class="flex items-start gap-2"
              >
                <span class="text-pink-400 font-bold">►</span>
                <span>{{ hl }}</span>
              </li>
            </ul>
          </div>

          <!-- Action Buttons Bar: VIEW CODE, LIVE DEMO, and TUTUP -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div class="flex flex-wrap items-center gap-2.5">
              <!-- VIEW CODE Button (Safe external link) -->
              <a
                v-if="activeModalProj.githubUrl"
                id="btn-view-code"
                :href="activeModalProj.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="pixel-btn pixel-btn-pink text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(255,0,127,0.4)]"
                title="Buka repositori GitHub (tab baru)"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>VIEW CODE</span>
                <span class="text-xs">↗</span>
              </a>

              <!-- LIVE DEMO Button (Configurable URL; safe fallback if not available) -->
              <a
                v-if="activeModalProj.demoUrl"
                id="btn-live-demo"
                :href="activeModalProj.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="pixel-btn text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                title="Buka live demo website (tab baru)"
              >
                <span>🌐</span>
                <span>LIVE DEMO</span>
                <span class="text-xs">↗</span>
              </a>
              <button
                v-else
                id="btn-live-demo-disabled"
                disabled
                class="px-3.5 py-2.5 border border-slate-700 bg-slate-950/80 text-slate-500 font-pixel text-[10px] sm:text-xs cursor-not-allowed opacity-60 flex items-center gap-2"
                title="Deployment live demo belum tersedia. URL dapat dikonfigurasi pada file data proyek setelah dideploy secara publik."
              >
                <span>⛔</span>
                <span>LIVE DEMO [UNAVAILABLE]</span>
              </button>
            </div>

            <button
              id="modal-btn-close-bottom"
              @click="closeModal"
              class="pixel-btn text-xs cursor-pointer"
            >
              TUTUP
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Nav Shortcuts -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <NuxtLink to="/" class="pixel-btn text-xs">
          ◄ KEMBALI KE GAME
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ReturnToGameButton from '~/components/ReturnToGameButton.vue'
import { PROJECTS_DATA, PROJECT_CATEGORIES, type ProjectItem } from '~/data/projects'

const route = useRoute()

useHead({
  title: 'Selected Projects | Rasya N.H.',
  meta: [
    {
      name: 'description',
      content: 'Koleksi proyek nyata Rasya N.H.: RasyaPOS Modern Cashier System, Pororo Ice Cream, dan Desain UI/UX Figma.'
    }
  ]
})

const selectedProjectCat = ref('all')
const activeModalProj = ref<ProjectItem | null>(null)

const openModal = (proj: ProjectItem) => {
  activeModalProj.value = proj
}

const closeModal = () => {
  activeModalProj.value = null
}

const projectCategories = PROJECT_CATEGORIES
const projects = PROJECTS_DATA

const countByCategory = (catId: string) => {
  if (catId === 'all') return projects.length
  return projects.filter(p => p.category === catId).length
}

const filteredProjects = computed(() => {
  if (selectedProjectCat.value === 'all') return projects
  return projects.filter(p => p.category === selectedProjectCat.value)
})

// Auto select / open modal if URL query specifies project id (?id=rasyapos)
onMounted(() => {
  if (route.query.id) {
    const found = projects.find(p => p.id === route.query.id)
    if (found) {
      activeModalProj.value = found
    }
  }
})
</script>

