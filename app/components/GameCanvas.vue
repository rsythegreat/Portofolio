<template>
  <div class="relative w-full h-[calc(100vh-45px)] overflow-hidden bg-[#070712] select-none">
    <!-- Main Game Canvas -->
    <canvas
      ref="canvasRef"
      class="w-full h-full block cursor-crosshair"
      :style="{ imageRendering: 'pixelated' }"
    ></canvas>

    <!-- Top World Info Overlay -->
    <div class="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center">
      <div class="px-3 py-1 bg-slate-950/80 border border-cyan-500/50 text-[11px] font-pixel text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)] backdrop-blur-sm text-center">
        LOMPAT &amp; SUNDUL BALOK DARI BAWAH UNTUK BUKA HALAMAN
      </div>
      <div class="mt-1 text-[10px] font-mono-tech text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
        Controls: [A/D] atau [◄/►] Jalan • [SPACE/W] Lompat
      </div>
    </div>

    <!-- Active Warp / Transition Notification Banner -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="navigatingBanner"
        class="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs"
      >
        <div
          class="pixel-box p-6 max-w-md mx-4 text-center border-2 animate-pulse-glow"
          :style="{ borderColor: navigatingBanner.color, boxShadow: `0 0 25px ${navigatingBanner.color}` }"
        >
          <div class="text-3xl mb-2">{{ navigatingBanner.icon }}</div>
          <div class="font-pixel text-sm text-white mb-2">
            MEMBUKA HALAMAN:
          </div>
          <div
            class="font-pixel text-lg md:text-xl font-bold mb-3 tracking-wider"
            :style="{ color: navigatingBanner.color, textShadow: `0 0 10px ${navigatingBanner.color}` }"
          >
            [ {{ navigatingBanner.label }} ]
          </div>
          <div class="text-xs font-mono-tech text-slate-300 mb-3">
            {{ navigatingBanner.description }}
          </div>
          <div class="w-full bg-slate-800 h-2 rounded overflow-hidden">
            <div
              class="h-full bg-cyan-400 transition-all duration-300 animate-pulse"
              :style="{ backgroundColor: navigatingBanner.color, width: '100%' }"
            ></div>
          </div>
          <div class="text-[10px] font-pixel text-slate-400 mt-2">
            WARPING TO {{ navigatingBanner.route }} ...
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Virtual Controls (Always available on touch or small screens) -->
    <div class="absolute bottom-4 left-4 z-30 flex items-center gap-2 select-none md:hidden">
      <button
        @touchstart.prevent="touchKeys.left = true"
        @touchend.prevent="touchKeys.left = false"
        @mousedown.prevent="touchKeys.left = true"
        @mouseup.prevent="touchKeys.left = false"
        @mouseleave.prevent="touchKeys.left = false"
        class="w-14 h-14 bg-slate-900/90 border-2 border-cyan-400 text-cyan-300 text-xl font-pixel flex items-center justify-center active:bg-cyan-400 active:text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]"
      >
        ◄
      </button>
      <button
        @touchstart.prevent="touchKeys.right = true"
        @touchend.prevent="touchKeys.right = false"
        @mousedown.prevent="touchKeys.right = true"
        @mouseup.prevent="touchKeys.right = false"
        @mouseleave.prevent="touchKeys.right = false"
        class="w-14 h-14 bg-slate-900/90 border-2 border-cyan-400 text-cyan-300 text-xl font-pixel flex items-center justify-center active:bg-cyan-400 active:text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]"
      >
        ►
      </button>
    </div>

    <div class="absolute bottom-4 right-4 z-30 flex items-center gap-2 select-none md:hidden">
      <button
        @touchstart.prevent="triggerJump"
        @mousedown.prevent="triggerJump"
        class="w-16 h-16 bg-slate-900/90 border-2 border-pink-500 text-pink-300 text-sm font-pixel flex flex-col items-center justify-center active:bg-pink-500 active:text-black shadow-[0_0_12px_rgba(255,0,127,0.5)]"
      >
        <span>▲</span>
        <span class="text-[9px]">LOMPAT</span>
      </button>
    </div>

    <!-- Quick Respawn / Reset position button -->
    <div class="absolute bottom-3 right-4 z-20 hidden md:block">
      <button
        @click="resetPlayerPos"
        class="px-2 py-1 bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-[10px] font-mono-tech text-slate-400 hover:text-cyan-300"
        title="Reset posisi karakter ke titik awal"
      >
        ↺ Reset Posisi
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState, type BlockDef } from '~/composables/useGameState'
import { useAudioSynth } from '~/composables/useAudioSynth'

const router = useRouter()
const { playerState, visitedBlocks, lastBlockId, score, markBlockVisited, blocksData } = useGameState()
const audio = useAudioSynth()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const navigatingBanner = ref<BlockDef | null>(null)

// Touch keys state
const touchKeys = reactive({
  left: false,
  right: false,
  jump: false
})

const triggerJump = () => {
  touchKeys.jump = true
  setTimeout(() => {
    touchKeys.jump = false
  }, 120)
}

// Particle System
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

// Floating Cyber Chip Collectible
interface CyberChip {
  id: number
  x: number
  y: number
  baseY: number
  collected: boolean
  bobOffset: number
}

// Platform in game world
interface Platform {
  x: number
  y: number
  w: number
  h: number
  color?: string
}

let animFrameId: number | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Level Constants
  const LEVEL_WIDTH = 2900
  const GROUND_Y = 440

  // Resize canvas to match display size
  const resizeCanvas = () => {
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight || (window.innerHeight - 45)
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Interactive Blocks in the game
  const blocks = blocksData.map((b) => ({
    ...b,
    bumpY: 0,
    bumpVy: 0,
    bounceTimer: 0,
    isHit: false
  }))

  // Solid Platforms
  const platforms: Platform[] = [
    // Main Ground Segments
    { x: 0, y: GROUND_Y, w: LEVEL_WIDTH, h: 100 },
    
    // Sector 1: Tentang Saya Steps
    { x: 260, y: 390, w: 90, h: 16 },
    { x: 470, y: 370, w: 80, h: 16 },

    // Sector 2: Skills Elevated Ridge
    { x: 740, y: 380, w: 90, h: 16 },
    { x: 820, y: 340, w: 110, h: 16 },
    { x: 960, y: 360, w: 90, h: 16 },

    // Sector 3: Projects Multi-level Plaza
    { x: 1240, y: 370, w: 90, h: 16 },
    { x: 1340, y: 330, w: 110, h: 16 },
    { x: 1480, y: 360, w: 90, h: 16 },
    { x: 1400, y: 220, w: 80, h: 14 }, // Upper look-out

    // Sector 4: Kontak Antenna Tower
    { x: 1760, y: 380, w: 90, h: 16 },
    { x: 1860, y: 350, w: 110, h: 16 },
    { x: 2000, y: 370, w: 90, h: 16 },

    // Final platforms
    { x: 2280, y: 380, w: 90, h: 16 },
    { x: 2380, y: 340, w: 110, h: 16 },
    { x: 2520, y: 360, w: 90, h: 16 },
  ]

  // Collectible Cyber Data Chips
  const chips: CyberChip[] = [
    { id: 1, x: 200, y: 390, baseY: 390, collected: false, bobOffset: 0 },
    { id: 2, x: 300, y: 340, baseY: 340, collected: false, bobOffset: 1 },
    { id: 3, x: 500, y: 320, baseY: 320, collected: false, bobOffset: 2 },
    { id: 4, x: 670, y: 390, baseY: 390, collected: false, bobOffset: 3 },
    { id: 5, x: 780, y: 330, baseY: 330, collected: false, bobOffset: 4 },
    { id: 6, x: 1000, y: 310, baseY: 310, collected: false, bobOffset: 5 },
    { id: 7, x: 1180, y: 390, baseY: 390, collected: false, bobOffset: 0.5 },
    { id: 8, x: 1280, y: 320, baseY: 320, collected: false, bobOffset: 1.5 },
    { id: 9, x: 1440, y: 170, baseY: 170, collected: false, bobOffset: 2.5 },
    { id: 10, x: 1650, y: 390, baseY: 390, collected: false, bobOffset: 3.5 },
    { id: 11, x: 1800, y: 330, baseY: 330, collected: false, bobOffset: 4.5 },
    { id: 12, x: 2150, y: 390, baseY: 390, collected: false, bobOffset: 1 },
    { id: 13, x: 2320, y: 330, baseY: 330, collected: false, bobOffset: 2 },
    { id: 14, x: 2470, y: 290, baseY: 290, collected: false, bobOffset: 3 },
    { id: 15, x: 2600, y: 390, baseY: 390, collected: false, bobOffset: 4 }
  ]

  // Particles Array
  let particles: Particle[] = []

  // Player Definition
  const player = {
    x: 120,
    y: 380,
    w: 26,
    h: 40,
    vx: 0,
    vy: 0,
    isGrounded: false,
    facing: 'right' as 'left' | 'right',
    animFrame: 0,
    animTimer: 0,
    coyoteTimer: 0,
    jumpBuffer: 0,
    isLocked: false
  }

  // Restore Player Position from GameState if available!
  if (lastBlockId.value) {
    const targetBlock = blocks.find(b => b.id === lastBlockId.value)
    if (targetBlock) {
      // Position player comfortably near the block
      player.x = targetBlock.worldX + targetBlock.width / 2 - player.w / 2
      player.y = GROUND_Y - player.h - 10
      player.facing = 'right'
      
      // Spawn welcoming cyber particles
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: player.x + player.w / 2,
          y: player.y + player.h / 2,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6 - 2,
          size: Math.random() * 3 + 2,
          color: targetBlock.color,
          alpha: 1,
          life: 0,
          maxLife: 35
        })
      }
    }
  } else if (playerState.value.initialized) {
    player.x = playerState.value.x
    player.y = playerState.value.y
    player.facing = playerState.value.facing
  }

  // Camera
  const camera = {
    x: Math.max(0, player.x - canvas.width * 0.35)
  }

  // Keyboard input tracking
  const keys: Record<string, boolean> = {}

  const onKeyDown = (e: KeyboardEvent) => {
    keys[e.code] = true
    if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
      player.jumpBuffer = 8
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    keys[e.code] = false
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  // Spawn pixel explosion particles for hit block
  const spawnHitParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 26; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 7 + 2
      particles.push({
        x: x + 28,
        y: y + 28,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.floor(Math.random() * 4) + 2,
        color: color,
        alpha: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 25) + 20
      })
    }
  }

  // Main Loop
  let lastTime = performance.now()

  const gameLoop = (currentTime: number) => {
    const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
    lastTime = currentTime

    // ------------------------------------
    // 1. UPDATE PHYSICS & INPUT
    // ------------------------------------
    if (!player.isLocked) {
      const moveLeft = keys['ArrowLeft'] || keys['KeyA'] || touchKeys.left
      const moveRight = keys['ArrowRight'] || keys['KeyD'] || touchKeys.right
      const jumpPressed = keys['Space'] || keys['ArrowUp'] || keys['KeyW'] || touchKeys.jump

      if (jumpPressed) {
        player.jumpBuffer = 6
      }

      // Horizontal Acceleration
      const accel = 0.85
      const maxSpeed = 4.6
      const friction = 0.8

      if (moveLeft) {
        player.vx = Math.max(player.vx - accel, -maxSpeed)
        player.facing = 'left'
      } else if (moveRight) {
        player.vx = Math.min(player.vx + accel, maxSpeed)
        player.facing = 'right'
      } else {
        player.vx *= friction
        if (Math.abs(player.vx) < 0.1) player.vx = 0
      }

      // Coyote Time & Jump
      if (player.isGrounded) {
        player.coyoteTimer = 8
      } else {
        player.coyoteTimer = Math.max(0, player.coyoteTimer - 1)
      }

      if (player.jumpBuffer > 0) {
        player.jumpBuffer--
        if (player.coyoteTimer > 0) {
          player.vy = -10.8
          player.isGrounded = false
          player.coyoteTimer = 0
          player.jumpBuffer = 0
          audio.playJump()

          // Jump foot sparks
          for (let i = 0; i < 5; i++) {
            particles.push({
              x: player.x + player.w / 2 + (Math.random() - 0.5) * 10,
              y: player.y + player.h,
              vx: (Math.random() - 0.5) * 3,
              vy: Math.random() * -2,
              size: 2,
              color: '#00f0ff',
              alpha: 0.9,
              life: 0,
              maxLife: 15
            })
          }
        }
      }

      // Gravity
      player.vy += 0.48
      if (player.vy > 12) player.vy = 12

      // Previous positions for precise collision sweep
      const prevX = player.x
      const prevY = player.y

      // Integrate position
      player.x += player.vx
      player.y += player.vy

      // Level Boundaries
      if (player.x < 10) player.x = 10
      if (player.x + player.w > LEVEL_WIDTH - 10) player.x = LEVEL_WIDTH - 10 - player.w

      player.isGrounded = false

      // ------------------------------------
      // PLATFORM COLLISIONS
      // ------------------------------------
      for (const plat of platforms) {
        // Landing on top of platform
        if (
          prevY + player.h <= plat.y + 4 &&
          player.y + player.h >= plat.y &&
          player.x + player.w > plat.x &&
          player.x < plat.x + plat.w
        ) {
          player.y = plat.y - player.h
          player.vy = 0
          player.isGrounded = true
        }
      }

      // ------------------------------------
      // INTERACTIVE BLOCKS COLLISIONS (CRITICAL MECHANIC)
      // ------------------------------------
      for (const block of blocks) {
        const curBlockY = block.worldY + block.bumpY
        const bLeft = block.worldX
        const bRight = block.worldX + block.width
        const bTop = curBlockY
        const bBottom = curBlockY + block.height

        const horizOverlap = player.x + player.w > bLeft + 4 && player.x < bRight - 4

        // 1. HIT FROM BELOW (SUNDUL DARI BAWAH) -> ACTIVATES PAGE
        if (horizOverlap && player.vy < 0) {
          if (prevY >= bBottom - 6 && player.y <= bBottom) {
            // Hit confirmed!
            player.y = bBottom
            player.vy = 2.5 // Bounce player back down

            // Trigger Block Bounce Animation
            block.bumpVy = -11
            block.isHit = true
            spawnHitParticles(block.worldX, curBlockY, block.color)

            // Audio & Feedback
            audio.playBlockHit()
            audio.playWarp()
            markBlockVisited(block.id)

            // Save player position to game state
            playerState.value.x = player.x
            playerState.value.y = player.y + 10
            playerState.value.facing = player.facing

            // Lock player and prepare automatic navigation
            player.isLocked = true
            navigatingBanner.value = block

            // Navigate after hit bounce animation finishes (~450ms)
            setTimeout(() => {
              router.push(block.route)
            }, 500)
            break
          }
        }

        // 2. LANDING ON TOP OF BLOCK -> SOLID PLATFORM ONLY (NO NAVIGATION!)
        if (
          horizOverlap &&
          player.vy >= 0 &&
          prevY + player.h <= bTop + 8 &&
          player.y + player.h >= bTop
        ) {
          player.y = bTop - player.h
          player.vy = 0
          player.isGrounded = true
        }

        // 3. HORIZONTAL SIDES -> SOLID OBSTACLE
        if (player.y + player.h > bTop + 4 && player.y < bBottom - 4) {
          // Colliding from left
          if (prevX + player.w <= bLeft && player.x + player.w > bLeft) {
            player.x = bLeft - player.w
            player.vx = 0
          }
          // Colliding from right
          else if (prevX >= bRight && player.x < bRight) {
            player.x = bRight
            player.vx = 0
          }
        }
      }

      // ------------------------------------
      // COLLECTIBLE CHIPS
      // ------------------------------------
      for (const chip of chips) {
        if (!chip.collected) {
          chip.y = chip.baseY + Math.sin(currentTime * 0.005 + chip.bobOffset) * 6
          const dist = Math.hypot(
            (player.x + player.w / 2) - chip.x,
            (player.y + player.h / 2) - chip.y
          )
          if (dist < 28) {
            chip.collected = true
            score.value += 1
            audio.playCollect()
            // Sparkles
            for (let i = 0; i < 12; i++) {
              particles.push({
                x: chip.x,
                y: chip.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                size: 2,
                color: '#ffe600',
                alpha: 1,
                life: 0,
                maxLife: 20
              })
            }
          }
        }
      }

      // Animation cycle
      if (Math.abs(player.vx) > 0.5 && player.isGrounded) {
        player.animTimer++
        if (player.animTimer > 6) {
          player.animFrame = (player.animFrame + 1) % 4
          player.animTimer = 0
        }
      } else {
        player.animFrame = 0
      }
    }

    // Update Block Bounce Physics
    for (const block of blocks) {
      if (block.bumpY !== 0 || block.bumpVy !== 0) {
        block.bumpY += block.bumpVy
        block.bumpVy += 0.8 // Spring pull-back gravity
        if (block.bumpY >= 0) {
          block.bumpY = 0
          block.bumpVy = 0
        }
      }
    }

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.15
      p.life++
      p.alpha = Math.max(0, 1 - p.life / p.maxLife)
      if (p.life >= p.maxLife) {
        particles.splice(i, 1)
      }
    }

    // Smooth Camera Tracking
    const targetCamX = player.x - canvas.width * 0.4
    camera.x += (targetCamX - camera.x) * 0.08
    camera.x = Math.max(0, Math.min(LEVEL_WIDTH - canvas.width, camera.x))

    // ------------------------------------
    // 2. RENDER GRAPHICS
    // ------------------------------------
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // A. Deep Cyberpunk Sky & Parallax Skyline
    drawBackground(ctx, canvas, camera.x, currentTime)

    // Save context for camera translation
    ctx.save()
    ctx.translate(-Math.floor(camera.x), 0)

    // B. World Signposts & Holograms
    drawWorldProps(ctx, camera.x, currentTime)

    // C. Platforms & Cyber Ground
    drawPlatforms(ctx, platforms, currentTime)

    // D. Interactive Blocks
    drawInteractiveBlocks(ctx, blocks, currentTime)

    // E. Collectible Cyber Chips
    drawChips(ctx, chips, currentTime)

    // F. Particles
    drawParticles(ctx, particles)

    // G. Player Character
    drawPlayer(ctx, player, currentTime)

    ctx.restore()

    animFrameId = requestAnimationFrame(gameLoop)
  }

  animFrameId = requestAnimationFrame(gameLoop)

  // ------------------------------------
  // DRAWING HELPERS
  // ------------------------------------

  function drawBackground(c: CanvasRenderingContext2D, cvs: HTMLCanvasElement, camX: number, time: number) {
    // Cyber Sky Gradient
    const skyGrad = c.createLinearGradient(0, 0, 0, cvs.height)
    skyGrad.addColorStop(0, '#04040a')
    skyGrad.addColorStop(0.5, '#0b081b')
    skyGrad.addColorStop(1, '#150f2e')
    c.fillStyle = skyGrad
    c.fillRect(0, 0, cvs.width, cvs.height)

    // Cyber Moon / Sun
    const moonX = cvs.width * 0.8 - (camX * 0.03) % cvs.width
    c.save()
    c.shadowColor = '#00f0ff'
    c.shadowBlur = 30
    c.fillStyle = 'rgba(0, 240, 255, 0.15)'
    c.beginPath()
    c.arc(moonX, 100, 50, 0, Math.PI * 2)
    c.fill()
    c.fillStyle = '#e6ffff'
    c.beginPath()
    c.arc(moonX, 100, 32, 0, Math.PI * 2)
    c.fill()
    // Moon scan lines
    c.fillStyle = 'rgba(11, 8, 27, 0.8)'
    for (let y = 80; y <= 120; y += 8) {
      c.fillRect(moonX - 35, y, 70, 3)
    }
    c.restore()

    // Parallax Layer 1: Distant City Skyscrapers
    c.fillStyle = '#0a081a'
    const p1Speed = 0.15
    for (let i = 0; i < 25; i++) {
      const bx = (i * 120 - (camX * p1Speed) % 3000)
      const bh = 140 + (i % 5) * 35
      const by = cvs.height - bh - 60
      c.fillRect(bx, by, 70, bh + 60)
      
      // Building windows
      c.fillStyle = (i % 2 === 0) ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 0, 127, 0.2)'
      for (let wy = by + 20; wy < by + bh - 10; wy += 22) {
        c.fillRect(bx + 12, wy, 8, 10)
        c.fillRect(bx + 32, wy, 8, 10)
        c.fillRect(bx + 52, wy, 8, 10)
      }
      c.fillStyle = '#0a081a'
    }

    // Parallax Layer 2: Midground Neon Grid & Towers
    const p2Speed = 0.35
    for (let i = 0; i < 15; i++) {
      const bx = (i * 220 - (camX * p2Speed) % 3300)
      const bh = 100 + (i % 4) * 40
      const by = cvs.height - bh - 40
      c.fillStyle = '#100c26'
      c.fillRect(bx, by, 110, bh + 40)
      c.strokeStyle = 'rgba(157, 78, 221, 0.3)'
      c.strokeRect(bx, by, 110, bh + 40)

      // Hologram Ad atop building
      if (i % 3 === 0) {
        c.fillStyle = 'rgba(0, 240, 255, 0.7)'
        c.font = '8px "Press Start 2P"'
        c.fillText('RASYA.DEV', bx + 15, by - 12)
        c.strokeStyle = '#00f0ff'
        c.beginPath()
        c.moveTo(bx + 10, by)
        c.lineTo(bx + 20, by - 10)
        c.lineTo(bx + 90, by - 10)
        c.stroke()
      }
    }
  }

  function drawWorldProps(c: CanvasRenderingContext2D, camX: number, time: number) {
    // Welcome sign at spawn
    c.save()
    c.fillStyle = 'rgba(13, 13, 29, 0.9)'
    c.strokeStyle = '#00f0ff'
    c.lineWidth = 2
    c.fillRect(50, 310, 150, 70)
    c.strokeRect(50, 310, 150, 70)
    
    c.fillStyle = '#00f0ff'
    c.font = '7px "Press Start 2P"'
    c.fillText('PORTFOLIO_HUB', 60, 330)
    c.fillStyle = '#ffffff'
    c.font = '6px "Press Start 2P"'
    c.fillText('RASYA // 2026', 60, 345)
    c.fillStyle = '#39ff14'
    c.fillText('STATUS: ONLINE', 60, 360)

    // Sign poles
    c.fillStyle = '#334155'
    c.fillRect(70, 380, 6, 60)
    c.fillRect(170, 380, 6, 60)
    c.restore()

    // Neon Arrow Signboards guiding player forward
    const arrows = [
      { x: 300, y: 320, text: 'TENTANG SAYA ➔' },
      { x: 720, y: 320, text: 'SKILLS ➔' },
      { x: 1200, y: 300, text: 'PROJECTS ➔' },
      { x: 1720, y: 310, text: 'KONTAK ➔' }
    ]

    for (const a of arrows) {
      c.save()
      c.fillStyle = 'rgba(20, 20, 40, 0.85)'
      c.strokeStyle = 'rgba(0, 240, 255, 0.5)'
      c.fillRect(a.x - 10, a.y - 12, 120, 20)
      c.strokeRect(a.x - 10, a.y - 12, 120, 20)
      c.fillStyle = '#00f0ff'
      c.font = '6px "Press Start 2P"'
      c.fillText(a.text, a.x, a.y + 2)
      c.restore()
    }
  }

  function drawPlatforms(c: CanvasRenderingContext2D, plats: Platform[], time: number) {
    for (const p of plats) {
      // Platform body
      c.fillStyle = '#0d0d1e'
      c.fillRect(p.x, p.y, p.w, p.h)

      // Neon Top Border
      c.fillStyle = '#00f0ff'
      c.fillRect(p.x, p.y, p.w, 3)

      // Cyber Grid Pattern on platforms
      c.strokeStyle = 'rgba(0, 240, 255, 0.15)'
      c.lineWidth = 1
      for (let gx = p.x; gx < p.x + p.w; gx += 20) {
        c.beginPath()
        c.moveTo(gx, p.y)
        c.lineTo(gx, p.y + p.h)
        c.stroke()
      }

      // Platform Under-glow
      c.fillStyle = 'rgba(0, 240, 255, 0.05)'
      c.fillRect(p.x, p.y + 3, p.w, 12)
    }
  }

  function drawInteractiveBlocks(c: CanvasRenderingContext2D, bList: typeof blocks, time: number) {
    for (const block of bList) {
      const bx = block.worldX
      const by = block.worldY + block.bumpY
      const bw = block.width
      const bh = block.height

      const isVisited = visitedBlocks.value.includes(block.id)

      c.save()

      // 1. Floating Animated Arrow pointing DOWN to block ("HIT ME!")
      const arrowBob = Math.sin(time * 0.006 + bx) * 5
      const arrowY = by - 38 + arrowBob

      // Label background pill
      c.font = '8px "Press Start 2P"'
      const labelMetrics = c.measureText(`[ ${block.label} ]`)
      const pillWidth = Math.max(labelMetrics.width + 16, 90)
      const pillX = bx + bw / 2 - pillWidth / 2

      c.fillStyle = 'rgba(10, 10, 24, 0.92)'
      c.strokeStyle = block.color
      c.lineWidth = 2
      c.shadowColor = block.color
      c.shadowBlur = 8
      c.fillRect(pillX, arrowY - 14, pillWidth, 22)
      c.strokeRect(pillX, arrowY - 14, pillWidth, 22)

      // Label text
      c.fillStyle = '#ffffff'
      c.fillText(`[ ${block.label} ]`, pillX + 8, arrowY)

      // Arrow pointing down
      c.fillStyle = block.color
      c.beginPath()
      c.moveTo(bx + bw / 2 - 6, arrowY + 9)
      c.lineTo(bx + bw / 2 + 6, arrowY + 9)
      c.lineTo(bx + bw / 2, arrowY + 16)
      c.closePath()
      c.fill()

      // "HIT FROM BELOW" sub-text
      c.font = '6px "Press Start 2P"'
      c.fillStyle = block.color
      c.fillText('▼ HIT ME ▼', bx + bw / 2 - 24, arrowY + 28)

      // 2. The Interactive Pixel Block Box
      c.shadowColor = block.color
      c.shadowBlur = block.isHit ? 25 : 12

      // Outer block body
      c.fillStyle = isVisited ? 'rgba(25, 20, 45, 0.95)' : 'rgba(15, 12, 35, 0.95)'
      c.fillRect(bx, by, bw, bh)

      // Neon Pixel Border
      c.strokeStyle = block.color
      c.lineWidth = 3
      c.strokeRect(bx, by, bw, bh)

      // Corner accent pixels
      c.fillStyle = '#ffffff'
      c.fillRect(bx + 4, by + 4, 4, 4)
      c.fillRect(bx + bw - 8, by + 4, 4, 4)
      c.fillRect(bx + 4, by + bh - 8, 4, 4)
      c.fillRect(bx + bw - 8, by + bh - 8, 4, 4)

      // Center Question Mark / Icon
      c.shadowBlur = 10
      c.font = '22px "Press Start 2P"'
      c.fillStyle = block.color

      if (isVisited) {
        c.font = '16px "Press Start 2P"'
        c.fillStyle = '#39ff14'
        c.fillText('✓', bx + bw / 2 - 8, by + bh / 2 + 7)
      } else {
        // Pulsing ? mark
        const qGlow = (Math.sin(time * 0.008) + 1) * 0.5
        c.fillStyle = qGlow > 0.4 ? block.color : '#ffffff'
        c.fillText('?', bx + bw / 2 - 9, by + bh / 2 + 8)
      }

      // Visited badge below block
      if (isVisited) {
        c.font = '6px "Press Start 2P"'
        c.fillStyle = '#39ff14'
        c.fillText('UNLOCKED', bx + bw / 2 - 20, by + bh + 14)
      }

      c.restore()
    }
  }

  function drawChips(c: CanvasRenderingContext2D, cList: CyberChip[], time: number) {
    for (const chip of cList) {
      if (!chip.collected) {
        c.save()
        c.translate(chip.x, chip.y)
        
        // Spin effect
        const scaleX = Math.cos(time * 0.006 + chip.bobOffset)
        c.scale(scaleX, 1)

        c.shadowColor = '#ffe600'
        c.shadowBlur = 10
        c.fillStyle = '#ffe600'
        
        // Chip Diamond shape
        c.beginPath()
        c.moveTo(0, -9)
        c.lineTo(9, 0)
        c.lineTo(0, 9)
        c.lineTo(-9, 0)
        c.closePath()
        c.fill()

        // Inner core
        c.fillStyle = '#ffffff'
        c.beginPath()
        c.arc(0, 0, 3, 0, Math.PI * 2)
        c.fill()

        c.restore()
      }
    }
  }

  function drawParticles(c: CanvasRenderingContext2D, pList: Particle[]) {
    for (const p of pList) {
      c.save()
      c.globalAlpha = p.alpha
      c.fillStyle = p.color
      c.shadowColor = p.color
      c.shadowBlur = 6
      c.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size)
      c.restore()
    }
  }

  function drawPlayer(c: CanvasRenderingContext2D, p: typeof player, time: number) {
    c.save()
    c.translate(p.x, p.y)

    // Flip horizontally if facing left
    if (p.facing === 'left') {
      c.translate(p.w, 0)
      c.scale(-1, 1)
    }

    const isMoving = Math.abs(p.vx) > 0.5 && p.isGrounded
    const bobY = isMoving ? (p.animFrame % 2 === 0 ? 0 : -2) : 0

    // Cyber Shadow on ground
    c.fillStyle = 'rgba(0, 240, 255, 0.25)'
    c.beginPath()
    c.ellipse(p.w / 2, p.h + 2, 12, 3, 0, 0, Math.PI * 2)
    c.fill()

    // 1. Legs / Cyber Boots
    c.fillStyle = '#090a18'
    if (isMoving) {
      if (p.animFrame === 0) {
        c.fillRect(4, p.h - 10 + bobY, 6, 10)
        c.fillRect(16, p.h - 8 + bobY, 6, 8)
      } else if (p.animFrame === 1) {
        c.fillRect(6, p.h - 10 + bobY, 6, 10)
        c.fillRect(14, p.h - 10 + bobY, 6, 10)
      } else if (p.animFrame === 2) {
        c.fillRect(16, p.h - 10 + bobY, 6, 10)
        c.fillRect(4, p.h - 8 + bobY, 6, 8)
      } else {
        c.fillRect(8, p.h - 10 + bobY, 6, 10)
        c.fillRect(14, p.h - 10 + bobY, 6, 10)
      }
    } else if (!p.isGrounded) {
      // Jump pose: legs tucked
      c.fillRect(4, p.h - 8, 6, 6)
      c.fillRect(15, p.h - 6, 6, 5)
    } else {
      // Idle stand
      c.fillRect(4, p.h - 10, 6, 10)
      c.fillRect(16, p.h - 10, 6, 10)
    }

    // Boot neon accents
    c.fillStyle = '#00f0ff'
    c.fillRect(4, p.h - 3 + bobY, 7, 3)
    c.fillRect(15, p.h - 3 + bobY, 7, 3)

    // 2. Coat / Torso
    c.fillStyle = '#14142b'
    c.fillRect(3, 14 + bobY, 20, 18)

    // Coat neon collar & trim
    c.fillStyle = '#ff007f'
    c.fillRect(5, 14 + bobY, 2, 18)
    c.fillRect(19, 14 + bobY, 2, 18)

    // Cyber backpack / battery pack
    c.fillStyle = '#00f0ff'
    c.fillRect(0, 16 + bobY, 3, 12)

    // 3. Head & Cyber Hair
    c.fillStyle = '#ffd1b3' // Skin tone
    c.fillRect(7, 4 + bobY, 13, 11)

    // Cyberpunk Hair (Neon Magenta/Purple spiky)
    c.fillStyle = '#9d4edd'
    c.fillRect(5, 0 + bobY, 16, 6)
    c.fillRect(3, 3 + bobY, 4, 6)
    c.fillRect(19, 2 + bobY, 4, 4)

    // 4. Glowing Cyber Visor
    c.shadowColor = '#00f0ff'
    c.shadowBlur = 8
    c.fillStyle = '#00f0ff'
    c.fillRect(11, 6 + bobY, 9, 4)
    // Visor gleam
    c.fillStyle = '#ffffff'
    c.fillRect(13, 7 + bobY, 2, 2)

    c.restore()
  }

  // Cleanup on unmount
  onBeforeUnmount(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
  })
})

const resetPlayerPos = () => {
  playerState.value.x = 120
  playerState.value.y = 380
  lastBlockId.value = null
  window.location.reload()
}
</script>
