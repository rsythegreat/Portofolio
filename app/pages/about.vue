<template>
  <div class="min-h-full flex-1 cyber-grid-bg py-8 px-4 sm:px-6 lg:px-8 relative">
    <ReturnToGameButton />

    <div class="max-w-5xl mx-auto mt-12 md:mt-10">
      <!-- Sector Header -->
      <div class="pixel-box p-6 mb-8 border-cyan-400 bg-slate-950/85">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-cyan-400 font-pixel text-xs mb-1">
              <span class="inline-block w-2 h-2 bg-cyan-400 animate-ping"></span>
              <span>SEKTOR 01 // IDENTITY_DATABASE</span>
            </div>
            <h1 class="font-pixel text-2xl sm:text-3xl text-white tracking-wide">
              ABOUT <span class="text-cyan-400 neon-glow-cyan">ME</span>
            </h1>
            <p class="font-mono-tech text-slate-300 text-sm mt-1">
              Student Developer &amp; Aspiring Software Engineer • SMKN 71 Jakarta
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-pixel text-xs">
              ID: RASYA-NH
            </span>
            <span class="px-3 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-pixel text-xs">
              AVAILABLE FOR PROJECTS
            </span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Architectural Monogram & Ethos -->
        <div class="space-y-6">
          <!-- Architectural Monogram Card (matching index.html architect card) -->
          <div class="pixel-box p-5 border-cyan-400 bg-slate-900/90 text-center relative overflow-hidden">
            <div class="absolute top-2 right-2 text-[10px] font-pixel text-cyan-500">
              [ARCHITECT_CARD]
            </div>

            <!-- Monogram 'R.' -->
            <div class="w-28 h-28 mx-auto mb-3 border-2 border-cyan-400 bg-slate-950 flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(0,240,255,0.35)]">
              <span class="font-pixel text-5xl text-cyan-400 font-bold">R.</span>
              <div class="text-[9px] font-mono-tech text-slate-400 mt-1">RASYA N.H.</div>
            </div>

            <h2 class="font-pixel text-base text-white">Rasya N.H.</h2>
            <p class="text-cyan-400 font-mono-tech text-xs mt-1">Software Engineering Student</p>
            <p class="text-slate-400 text-xs font-mono-tech mt-0.5">SMKN 71 Jakarta</p>

            <div class="mt-4 pt-3 border-t border-slate-800 flex flex-wrap justify-center gap-1.5">
              <span class="px-2 py-0.5 bg-slate-800 text-[10px] font-mono-tech text-cyan-300 border border-slate-700">Flutter</span>
              <span class="px-2 py-0.5 bg-slate-800 text-[10px] font-mono-tech text-pink-300 border border-slate-700">UI/UX</span>
              <span class="px-2 py-0.5 bg-slate-800 text-[10px] font-mono-tech text-emerald-300 border border-slate-700">Web</span>
              <span class="px-2 py-0.5 bg-slate-800 text-[10px] font-mono-tech text-yellow-300 border border-slate-700">Nuxt</span>
            </div>
          </div>

          <!-- Ethos Quote Box -->
          <div class="pixel-box p-5 border-yellow-400 bg-slate-900/90">
            <div class="font-pixel text-xs text-yellow-300 mb-2 flex items-center gap-2">
              <span>✦</span>
              <span>FILOSOFI &amp; ETHOS</span>
            </div>
            <blockquote class="text-xs text-slate-200 font-cyber italic border-l-2 border-yellow-400 pl-3 py-1">
              "Small steps, big progress."
            </blockquote>
            <p class="text-[11px] font-mono-tech text-slate-400 mt-2">
              Fokus pada pemahaman logika yang solid, antarmuka bersih, dan pembelajaran konsisten.
            </p>
          </div>

          <!-- Fact Stack -->
          <div class="pixel-box p-5 border-purple-500 bg-slate-900/90 space-y-3 font-mono-tech text-xs">
            <div class="flex items-start gap-3">
              <span class="text-purple-400 text-base">🏫</span>
              <div>
                <strong class="text-white block">SMKN 71 Jakarta</strong>
                <span class="text-slate-400 text-[11px]">Software Engineering (RPL)</span>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-cyan-400 text-base">🎯</span>
              <div>
                <strong class="text-white block">Areas of Interest</strong>
                <span class="text-slate-400 text-[11px]">App Dev • UI/UX Design • Web Tech</span>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-emerald-400 text-base">🚀</span>
              <div>
                <strong class="text-white block">Currently Active</strong>
                <span class="text-slate-400 text-[11px]">Learning &amp; building practical projects</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 2 Columns: Bio, Story & Core Competencies -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Story Block -->
          <div class="pixel-box p-6 border-slate-700 bg-slate-900/90">
            <h3 class="font-pixel text-sm text-cyan-300 mb-3 flex items-center gap-2">
              <span class="text-cyan-400">►</span>
              <span>A LITTLE BIT ABOUT MYSELF</span>
            </h3>
            <div class="text-slate-300 text-sm leading-relaxed space-y-3 font-cyber">
              <p>
                Halo! Saya <strong class="text-cyan-300 font-bold">Rasya N.H.</strong>, siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMKN 71 Jakarta yang tertarik pada proses membuat produk digital, mulai dari merancang tampilan antarmuka hingga mengembangkan aplikasi.
              </p>
              <p>
                Saya tertarik pada pengembangan aplikasi, desain UI/UX, dan teknologi digital. Saat ini saya terus belajar dan membangun proyek untuk mengembangkan kemampuan saya. Saya suka mempelajari hal baru dan meningkatkan kemampuan melalui proyek sekolah maupun latihan mandiri.
              </p>
              <div class="p-3 bg-slate-950 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 flex items-center gap-2">
                <span>🎯</span>
                <span>Fokus utama: menghasilkan antarmuka yang bersih, responsif, dan mudah diakses oleh pengguna.</span>
              </div>
            </div>
          </div>

          <!-- Core Competencies (Values synced with index.html) -->
          <div class="pixel-box p-6 border-slate-700 bg-slate-900/90">
            <h3 class="font-pixel text-sm text-emerald-300 mb-4 flex items-center gap-2">
              <span>📊</span>
              <span>CORE COMPETENCIES</span>
            </h3>
            <p class="text-xs text-slate-400 mb-5 font-mono-tech">
              Tingkat dedikasi dan penguasaan saya dalam fondasi teknologi digital:
            </p>

            <div class="space-y-4 font-mono-tech text-xs">
              <!-- Web Dev -->
              <div>
                <div class="flex justify-between text-slate-300 mb-1">
                  <span>Web Development (HTML &amp; CSS)</span>
                  <span class="text-cyan-400 font-pixel text-[10px]">88%</span>
                </div>
                <div class="w-full bg-slate-950 h-2.5 border border-cyan-500/40">
                  <div class="bg-cyan-400 h-full shadow-[0_0_8px_#00f0ff]" style="width: 88%"></div>
                </div>
              </div>

              <!-- UI/UX -->
              <div>
                <div class="flex justify-between text-slate-300 mb-1">
                  <span>UI/UX Design &amp; Prototyping (Figma)</span>
                  <span class="text-pink-400 font-pixel text-[10px]">85%</span>
                </div>
                <div class="w-full bg-slate-950 h-2.5 border border-pink-500/40">
                  <div class="bg-pink-500 h-full shadow-[0_0_8px_#ff007f]" style="width: 85%"></div>
                </div>
              </div>

              <!-- Mobile Flutter -->
              <div>
                <div class="flex justify-between text-slate-300 mb-1">
                  <span>Mobile Development (Flutter)</span>
                  <span class="text-yellow-400 font-pixel text-[10px]">80%</span>
                </div>
                <div class="w-full bg-slate-950 h-2.5 border border-yellow-500/40">
                  <div class="bg-yellow-400 h-full shadow-[0_0_8px_#ffe600]" style="width: 80%"></div>
                </div>
              </div>

              <!-- Programming Java -->
              <div>
                <div class="flex justify-between text-slate-300 mb-1">
                  <span>Programming Fundamentals (Java)</span>
                  <span class="text-purple-400 font-pixel text-[10px]">82%</span>
                </div>
                <div class="w-full bg-slate-950 h-2.5 border border-purple-500/40">
                  <div class="bg-purple-500 h-full shadow-[0_0_8px_#9d4edd]" style="width: 82%"></div>
                </div>
              </div>

              <!-- Modern Nuxt & Tailwind -->
              <div>
                <div class="flex justify-between text-slate-300 mb-1">
                  <span>Modern Frontend (Nuxt &amp; Tailwind)</span>
                  <span class="text-emerald-400 font-pixel text-[10px]">85%</span>
                </div>
                <div class="w-full bg-slate-950 h-2.5 border border-emerald-500/40">
                  <div class="bg-emerald-400 h-full shadow-[0_0_8px_#39ff14]" style="width: 85%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Nav Shortcuts -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <NuxtLink to="/" class="pixel-btn text-xs">
              ◄ KEMBALI KE GAME
            </NuxtLink>

            <NuxtLink to="/skills" class="pixel-btn pixel-btn-pink text-xs">
              LIHAT SKILLS ►
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReturnToGameButton from '~/components/ReturnToGameButton.vue'

useHead({
  title: 'About Me | Rasya N.H. - SMKN 71 Jakarta',
  meta: [
    { name: 'description', content: 'Kenali profil, latar belakang, dan keahlian Rasya N.H. sebagai Student Developer dari SMKN 71 Jakarta.' }
  ]
})
</script>
