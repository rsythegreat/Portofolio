export interface ProjectItem {
  id: string
  title: string
  category: 'web' | 'mobile' | string
  categoryLabel: string
  image: string
  isMockup?: boolean
  mockupBadge?: string
  mockupNote?: string
  tags: string[]
  snippet: string
  desc: string
  highlights: string[]
  githubUrl?: string | null
  demoUrl?: string | null // Configurable: Set to verified live URL when available. If null/undefined, marked as unavailable.
  featured?: boolean
}

export interface ProjectCategory {
  id: string
  label: string
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: 'all', label: 'Semua' },
  { id: 'web', label: 'Web & System' },
  { id: 'mobile', label: 'Mobile & UI/UX' }
]

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'rasyapos',
    title: 'RasyaPOS — Modern Cashier System',
    category: 'web',
    categoryLabel: 'Web Application',
    image: '/images/rasyapos-preview.jpg',
    isMockup: true,
    mockupBadge: 'CUSTOM UI MOCKUP',
    mockupNote: 'Visual mockup antarmuka sistem kasir RasyaPOS (Nuxt 4 / Tailwind CSS). Bukan tangkapan layar langsung dari lingkungan produksi.',
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    snippet: 'A cashier and point-of-sale application for managing products, processing transactions, and reviewing transaction history.',
    desc: 'RasyaPOS adalah aplikasi kasir dan point-of-sale (POS) modern berbasis web yang dirancang untuk mempercepat transaksi belanja, mengelola katalog produk inventaris, serta memantau riwayat transaksi secara real-time dan terstruktur.',
    highlights: [
      'Modul Kasir POS: Pemilihan produk visual, pengaturan kuantitas, kalkulasi subtotal otomatis, PPN 11%, dan perhitungan kembalian instan.',
      'Manajemen Produk: Pengelolaan katalog barang, inventaris stok, harga jual, dan kategori makanan/minuman secara terstruktur.',
      'Riwayat Transaksi: Pencatatan rekapan transaksi dengan multi-metode pembayaran (Tunai, QRIS, Kartu Debit).',
      'Arsitektur Nuxt 4: Dibangun dengan Vue 3 Composition API, type-safe TypeScript, performa tinggi, dan tata letak responsif utility-first Tailwind CSS.'
    ],
    githubUrl: 'https://github.com/rsythegreat/kasir-frontend',
    demoUrl: 'https://kasir-frontend-five.vercel.app/',
    featured: true
  },
  {
    id: 'pororo-ice',
    title: 'Pororo Ice Cream',
    category: 'web',
    categoryLabel: 'Web & System',
    image: '/images/pororo-ice-cream.jpg',
    isMockup: false,
    tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Figma to Code'],
    snippet: 'Frontend website PoRoRo Ice Cream berbasis Nuxt 3 dan Vue 3 yang diimplementasikan secara modular dan presisi berdasarkan desain Figma.',
    desc: 'Website landing page dan katalog produk PoRoRo Ice Cream berbasis Nuxt 3 dan Vue 3. Dibangun secara modular dari rancangan antarmuka Figma dengan centered floating glassmorphism navbar, sistem komponen mandiri, data-driven flavor list, dan layout responsif yang ramah mobile.',
    highlights: [
      'Arsitektur Modular Nuxt 3 & Vue 3: Pembagian section ke komponen mandiri (Navbar, Hero, Flavors, Process, Stories, Store, Footer).',
      'Centered Floating Glassmorphism Navbar: Navigasi sticky berbentuk kapsul melayang dengan efek blur dan responsive drawer menu.',
      'Data-Driven Catalog: Struktur data varian rasa es krim favorit reaktif yang dinamis dan siap dihubungkan ke API / CMS.',
      'Implementasi Desain Figma Presisi: Tipografi display Fraunces dan DM Sans dengan palet warna pastel khas gerai es krim modern.'
    ],
    githubUrl: 'https://github.com/rsythegreat/Pororo-Icecream',
    demoUrl: null
  },
  {
    id: 'ui-ux',
    title: 'Desain UI/UX',
    category: 'mobile',
    categoryLabel: 'Mobile & UI/UX',
    image: '/images/ui-ux.jpg',
    isMockup: false,
    tags: ['Figma', 'UI/UX Design'],
    snippet: 'Eksplorasi antarmuka dengan fokus pada konsistensi visual, sistem tipografi, dan kemudahan alur navigasi pengguna.',
    desc: 'Eksplorasi antarmuka digital menyeluruh dengan prinsip keterbacaan (readability), konsistensi sistem desain warna dan tipografi, serta alur pengalaman pengguna yang intuitif.',
    highlights: [
      'Pembuatan wireframe, komponen reusable, dan alur prototype di Figma.',
      'Rasio kontras warna berstandar accessibility dan nyaman di mata.',
      'Struktur hierarki informasi yang memudahkan penjelajahan konten.'
    ],
    githubUrl: null,
    demoUrl: null
  }
]

