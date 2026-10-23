export interface BlockDef {
  id: string
  label: string
  route: string
  color: string
  glowColor: string
  description: string
  icon: string
  worldX: number
  worldY: number
  width: number
  height: number
}

export const BLOCKS_DATA: BlockDef[] = [
  {
    id: 'about',
    label: 'TENTANG SAYA',
    route: '/about',
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.8)',
    description: 'Profil, Filosofi & Bio',
    icon: '👤',
    worldX: 380,
    worldY: 340,
    width: 64,
    height: 64
  },
  {
    id: 'skills',
    label: 'SKILLS',
    route: '/skills',
    color: '#39ff14',
    glowColor: 'rgba(57, 255, 20, 0.8)',
    description: 'Tech Stack & Keahlian',
    icon: '⚡',
    worldX: 840,
    worldY: 300,
    width: 64,
    height: 64
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    route: '/projects',
    color: '#ff007f',
    glowColor: 'rgba(255, 0, 127, 0.8)',
    description: 'Showcase Karya & Web App',
    icon: '🚀',
    worldX: 1360,
    worldY: 280,
    width: 64,
    height: 64
  },
  {
    id: 'contact',
    label: 'KONTAK',
    route: '/contact',
    color: '#9d4edd',
    glowColor: 'rgba(157, 78, 221, 0.8)',
    description: 'Hubungi & Kolaborasi',
    icon: '📡',
    worldX: 1880,
    worldY: 300,
    width: 64,
    height: 64
  }
]

export const useGameState = () => {
  // Player state preserved between routes
  const playerState = useState('playerState', () => ({
    x: 120,
    y: 380,
    vx: 0,
    vy: 0,
    facing: 'right' as 'left' | 'right',
    initialized: false
  }))

  // Unlocked / Visited blocks
  const visitedBlocks = useState<string[]>('visitedBlocks', () => [])
  
  // Last visited block to place player nicely upon returning
  const lastBlockId = useState<string | null>('lastBlockId', () => null)

  // Collectible score
  const score = useState<number>('cyberScore', () => 0)

  // Settings
  const crtFilter = useState<boolean>('crtFilter', () => true)
  const soundMuted = useState<boolean>('soundMuted', () => false)

  // Navigation lock to prevent double hits
  const isTransitioning = useState<boolean>('isTransitioning', () => false)

  const markBlockVisited = (id: string) => {
    if (!visitedBlocks.value.includes(id)) {
      visitedBlocks.value.push(id)
    }
    lastBlockId.value = id
  }

  const setPlayerPos = (x: number, y: number, facing: 'left' | 'right' = 'right') => {
    playerState.value.x = x
    playerState.value.y = y
    playerState.value.facing = facing
    playerState.value.initialized = true
  }

  return {
    playerState,
    visitedBlocks,
    lastBlockId,
    score,
    crtFilter,
    soundMuted,
    isTransitioning,
    markBlockVisited,
    setPlayerPos,
    blocksData: BLOCKS_DATA
  }
}
