<template>
  <div class="min-h-full flex-1 cyber-grid-bg py-8 px-4 sm:px-6 lg:px-8 relative">
    <ReturnToGameButton />

    <div class="max-w-5xl mx-auto mt-12 md:mt-10">
      <!-- Sector Header -->
      <div class="pixel-box p-6 mb-8 border-purple-500 bg-slate-950/85">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-purple-400 font-pixel text-xs mb-1">
              <span class="inline-block w-2 h-2 bg-purple-500 animate-ping"></span>
              <span>SEKTOR 04 // TELECOM_COMM_STATION</span>
            </div>
            <h1 class="font-pixel text-2xl sm:text-3xl text-white tracking-wide">
              KONTAK &amp; <span class="text-purple-400 neon-glow-purple">KOMUNIKASI</span>
            </h1>
            <p class="font-mono-tech text-slate-300 text-sm mt-1">
              Kirimkan transmisi pesan, ajakan kolaborasi proyek, atau diskusikan ide inovatif Anda.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-pixel text-xs">
              SINYAL: ONLINE (OPEN FOR HIRE)
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Left: Quick Direct Channels & Availability -->
        <div class="space-y-6">
          <!-- Availability Badge -->
          <div class="pixel-box p-5 border-cyan-400 bg-slate-900/90">
            <h2 class="font-pixel text-xs text-cyan-300 mb-3 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>STATUS KETERSEDIAAN</span>
            </h2>
            <p class="text-xs text-slate-300 font-cyber mb-4 leading-relaxed">
              Saya saat ini terbuka untuk proyek freelance, kontrak pengembangan web, maupun posisi tim full-time.
            </p>
            <div class="space-y-2 text-xs font-mono-tech text-slate-300">
              <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Waktu Respon:</span>
                <span class="text-emerald-400">&lt; 24 Jam</span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Lokasi:</span>
                <span class="text-cyan-300">Indonesia (Remote Friendly)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Zona Waktu:</span>
                <span class="text-purple-300">WIB (UTC+7)</span>
              </div>
            </div>
          </div>

          <!-- Direct Channels with 1-Click Copy -->
          <div class="pixel-box p-5 border-purple-500 bg-slate-900/90">
            <h3 class="font-pixel text-xs text-purple-300 mb-4 flex items-center gap-2">
              <span>📡</span>
              <span>SALURAN TRANSMISI</span>
            </h3>

            <div class="space-y-3">
              <!-- Email -->
              <div class="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-mono-tech text-slate-400">EMAIL RESMI</div>
                  <div class="text-xs font-mono-tech text-cyan-300">rasya.official@gmail.com</div>
                </div>
                <button
                  @click="copyToClipboard('rasya.official@gmail.com', 'email')"
                  class="px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[10px] font-pixel text-slate-300 hover:text-cyan-300"
                >
                  {{ copiedField === 'email' ? 'TERSALIN!' : 'SALIN' }}
                </button>
              </div>

              <!-- GitHub -->
              <a
                href="https://github.com"
                target="_blank"
                class="p-3 bg-slate-950 border border-slate-800 hover:border-purple-400 flex items-center justify-between transition-colors block group"
              >
                <div>
                  <div class="text-[10px] font-mono-tech text-slate-400">GITHUB REPOSITORI</div>
                  <div class="text-xs font-mono-tech text-purple-300 group-hover:text-purple-200">github.com/rasya-dev</div>
                </div>
                <span class="text-purple-400 font-pixel text-xs">↗</span>
              </a>

              <!-- LinkedIn -->
              <a
                href="https://linkedin.com"
                target="_blank"
                class="p-3 bg-slate-950 border border-slate-800 hover:border-cyan-400 flex items-center justify-between transition-colors block group"
              >
                <div>
                  <div class="text-[10px] font-mono-tech text-slate-400">LINKEDIN KONEKSI</div>
                  <div class="text-xs font-mono-tech text-cyan-300 group-hover:text-cyan-200">linkedin.com/in/rasyadev</div>
                </div>
                <span class="text-cyan-400 font-pixel text-xs">↗</span>
              </a>

              <!-- Telegram / Discord -->
              <div class="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-mono-tech text-slate-400">DISCORD / TELEGRAM</div>
                  <div class="text-xs font-mono-tech text-yellow-300">@rasyadev</div>
                </div>
                <button
                  @click="copyToClipboard('@rasyadev', 'discord')"
                  class="px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-yellow-400 text-[10px] font-pixel text-slate-300 hover:text-yellow-300"
                >
                  {{ copiedField === 'discord' ? 'TERSALIN!' : 'SALIN' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Cyberpunk Terminal Form -->
        <div class="lg:col-span-2">
          <div class="pixel-box p-6 border-purple-500 bg-slate-900/90">
            <h2 class="font-pixel text-sm text-purple-300 mb-2 flex items-center gap-2">
              <span>✉️</span>
              <span>FORM TRANSMISI PESAN TERMINAL</span>
            </h2>
            <p class="text-xs font-mono-tech text-slate-400 mb-6">
              Kirimkan pesan instan langsung ke dashboard komunikasi saya.
            </p>

            <!-- Success Message Notification -->
            <div
              v-if="formSubmitted"
              class="mb-6 p-4 border-2 border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(57,255,20,0.3)] animate-pulse"
            >
              <div class="font-pixel text-xs text-emerald-300 mb-1 flex items-center gap-2">
                <span>✓</span>
                <span>TRANSMISI BERHASIL TERKIRIM!</span>
              </div>
              <p class="text-xs text-slate-200 font-cyber">
                Terima kasih! Sinyal pesan Anda telah masuk ke database. Saya akan membalas ke email Anda dalam waktu 24 jam.
              </p>
              <button
                @click="formSubmitted = false"
                class="mt-3 text-[10px] font-pixel text-emerald-400 underline"
              >
                Kirim Pesan Lain
              </button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-pixel text-[10px] text-cyan-300 mb-1.5">
                    NAMA / IDENTITAS PENGIRIM:
                  </label>
                  <input
                    v-model="formData.name"
                    required
                    type="text"
                    placeholder="e.g. John Cyberpunk"
                    class="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-xs font-mono-tech px-3 py-2.5 outline-none focus:shadow-[0_0_8px_rgba(0,240,255,0.4)] transition-all"
                  />
                </div>

                <div>
                  <label class="block font-pixel text-[10px] text-cyan-300 mb-1.5">
                    ALAMAT EMAIL:
                  </label>
                  <input
                    v-model="formData.email"
                    required
                    type="email"
                    placeholder="nama@domain.com"
                    class="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-xs font-mono-tech px-3 py-2.5 outline-none focus:shadow-[0_0_8px_rgba(0,240,255,0.4)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block font-pixel text-[10px] text-cyan-300 mb-1.5">
                  TOPIK / SUBJEK PESAN:
                </label>
                <select
                  v-model="formData.subject"
                  class="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-xs font-mono-tech px-3 py-2.5 outline-none transition-all"
                >
                  <option value="freelance">Penawaran Proyek Freelance / Pembuatan Web</option>
                  <option value="fulltime">Peluang Karir / Lowongan Full-Time</option>
                  <option value="collaboration">Kolaborasi Game Dev / Open Source</option>
                  <option value="general">Pertanyaan Umum / Menyapa</option>
                </select>
              </div>

              <div>
                <label class="block font-pixel text-[10px] text-cyan-300 mb-1.5">
                  ISI TRANSMISI PESAN:
                </label>
                <textarea
                  v-model="formData.message"
                  required
                  rows="5"
                  placeholder="Ceritakan tentang proyek Anda, ekspektasi, atau pesan yang ingin disampaikan..."
                  class="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 text-slate-100 text-xs font-mono-tech p-3 outline-none focus:shadow-[0_0_8px_rgba(157,78,221,0.4)] transition-all resize-none"
                ></textarea>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSending"
                  class="pixel-btn pixel-btn-pink w-full py-3 text-xs flex items-center justify-center gap-2"
                >
                  <span v-if="isSending" class="animate-spin">⚙</span>
                  <span>{{ isSending ? 'MENGIRIMKAN SINYAL...' : 'KIRIM SINYAL TRANSMISI ►' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Nav Shortcuts -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <NuxtLink to="/" class="pixel-btn text-xs">
          ◄ KEMBALI KE GAME
        </NuxtLink>

        <NuxtLink to="/about" class="pixel-btn text-xs">
          KEMBALI KE SEKTOR 01 (ABOUT) ►
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ReturnToGameButton from '~/components/ReturnToGameButton.vue'
import { useAudioSynth } from '~/composables/useAudioSynth'

useHead({
  title: 'Kontak & Komunikasi | Rasya Cyber Portfolio',
  meta: [
    { name: 'description', content: 'Hubungi Rasya untuk kolaborasi proyek, pembuatan web interaktif, atau peluang kerja.' }
  ]
})

const audio = useAudioSynth()
const copiedField = ref<string | null>(null)
const isSending = ref(false)
const formSubmitted = ref(false)

const formData = reactive({
  name: '',
  email: '',
  subject: 'freelance',
  message: ''
})

const copyToClipboard = async (text: string, field: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = field
    audio.playCollect()
    setTimeout(() => {
      copiedField.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

const handleSubmit = () => {
  isSending.value = true
  audio.playBlockHit()

  setTimeout(() => {
    isSending.value = false
    formSubmitted.value = true
    audio.playWarp()
    formData.name = ''
    formData.email = ''
    formData.message = ''
  }, 1000)
}
</script>
