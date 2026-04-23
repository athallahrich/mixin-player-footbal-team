# ⚽ Pengacak Tim Bola

Aplikasi web untuk mengacak pemain sepak bola ke dalam tim secara adil dan acak. Dibangun dengan Nuxt 3, Pinia, dan Tailwind CSS dengan tema Neobrutalism.

## Fitur

- Input nama pemain satu per satu
- Muat daftar pemain default dari data statis
- Tentukan jumlah tim yang diinginkan
- Acak pemain ke tim secara adil (distribusi merata)
- Acak ulang tanpa mengubah daftar pemain
- Reset semua data
- Desain Neobrutalism yang bold dan modern
- Responsif untuk mobile dan desktop

## Setup

```bash
# Install dependencies
npm install

# Jalankan development server (http://localhost:3000)
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## Update Data Pemain Default

Edit file `data/players.json` untuk mengubah daftar pemain default:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-04-23",
  "players": [
    "Nama Pemain 1",
    "Nama Pemain 2",
    ...
  ]
}
```

## Deploy ke Vercel

### Cara 1: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Cara 2: Via GitHub

1. Push repository ke GitHub
2. Buka [vercel.com](https://vercel.com) dan import repository
3. Vercel akan otomatis mendeteksi Nuxt 3
4. Klik Deploy

### Cara 3: Manual

```bash
npm run build
vercel deploy --prebuilt
```

## Struktur Project

```
soccer-team-randomizer/
├── components/          # Vue components
│   ├── PlayerInput.vue
│   ├── TeamCountInput.vue
│   ├── RandomizeButton.vue
│   ├── TeamDisplay.vue
│   ├── ClearButton.vue
│   └── ErrorNotification.vue
├── stores/              # Pinia stores
│   └── teamRandomizer.ts
├── utils/               # Business logic
│   ├── randomization.ts # Fisher-Yates shuffle & team distribution
│   └── validation.ts    # Input validation
├── types/               # TypeScript types
│   └── index.ts
├── data/                # Static data
│   └── players.json     # Default player list (edit ini!)
├── server/api/          # API routes
│   └── players.get.ts
├── pages/
│   └── index.vue        # Main page
└── assets/css/
    └── main.css         # Neobrutalism CSS classes
```

## Rencana Pengembangan

- [ ] Sistem login & autentikasi
- [ ] Integrasi dengan admin portal API
- [ ] Simpan histori pengacakan
- [ ] Export hasil tim ke PDF/gambar
- [ ] Mode tournament bracket
