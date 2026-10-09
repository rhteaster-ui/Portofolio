# R_HMT V2.1 — Immersive Digital Archive

Portofolio React + TypeScript + Vite, static-first, dengan dua scene Three.js dan API chat serverless Vercel. Tidak membutuhkan database, Express, atau server yang terus berjalan.

## Revisi visual 2.1

Identitas header/footer dan inti orbit memakai `pp-dev.png` melalui turunan WebP. Hero memakai `pp.png` asli, dengan framing CSS; foto dan wajah tidak diregenerasi. Space Grotesk + Manrope variable menggantikan serif. Hero memiliki lapisan foto, pointer tilt, frame Three.js, dan gerak scroll. Progress perjalanan, reveal section, arsip asimetris, serta galeri berlapis melengkapi sistem motion. Tombol Motion di header menghentikan animasi halaman; reduced-motion dihormati.

Preview terbaru: `docs/screenshots/v2.1/`. Batas pengujian revisi: `docs/QA_V2_1.md`.

## Jalankan lokal

Gunakan Node.js 22 LTS atau 24 LTS dan npm. Dari folder yang berisi `package.json`:

```sh
npm ci
npm run dev
```

Buka `http://localhost:4173`. Dev server juga menjalankan adapter lokal untuk `/api/chat`, `/api/health`, dan `/api/contact`. Untuk env opsional, salin `.env.example` menjadi `.env.local`, isi hanya jika diperlukan, lalu restart dev server.

```sh
npm test
npm run build
npm run preview
```

`build` menjalankan TypeScript, menghasilkan `dist`, lalu melakukan prerender HTML. `preview` hanya menyajikan hasil static build; endpoint serverless tidak berjalan di perintah ini. Gunakan `dev` atau deployment Vercel untuk menguji chat.

## Deploy ke Vercel

1. Ekstrak ZIP. Upload isi folder `R_HMT_V2` ke repository Git milikmu.
2. Import repository tersebut ke Vercel. Root Directory harus folder yang berisi `package.json` dan folder `api`, bukan `dist`.
3. Framework: **Vite**. Install Command: **npm ci**. Build Command: **npm run build**. Output Directory: **dist**. Node.js: **22.x** atau **24.x**.
4. `vercel.json` sudah menyimpan konfigurasi build dan durasi maksimum chat 30 detik. Folder `api` otomatis menjadi Vercel Functions.
5. Deploy. Uji `/api/health`, halaman utama, video, dan chat pada URL deployment.
6. Tambahkan domain `rhmt.biz.id` di pengaturan domain Vercel. Ikuti record DNS yang diberikan untuk project tersebut. Canonical, OG, robots, dan sitemap sudah memakai domain ini.

Tidak ada deployment publik yang dibuat dalam paket ini. DNS, akun Vercel, dan ketersediaan penyedia AI tetap bergantung pada lingkungan deployment.

## Environment variables

Semua variabel berikut **opsional dan hanya untuk server**. Tidak ada key yang harus ditanam di frontend.

| Variabel | Default / penggunaan |
| --- | --- |
| `CHAT_API_URL` | `https://api.nexray.eu.cc/ai/gemini`; menggunakan GET dengan parameter `text` sesuai provider lama |
| `CHAT_API_KEY` | Kosong. Isi hanya jika penyedia endpoint memang mensyaratkan Bearer token |
| `CHAT_TIMEOUT_MS` | `18000`, dibatasi 1000–22000 ms |

Jangan gunakan prefix `VITE_` untuk kredensial. `.env.local` tidak boleh masuk repository. Jika mengganti endpoint, pastikan kontraknya tetap GET `text` dan response JSON yang kompatibel, atau ubah adapter `api/chat.js` secara eksplisit.

**Status AI:** adapter dan alur UI sudah diuji. Pengujian live dari lingkungan ini memperoleh respons upstream yang tidak dapat digunakan, sehingga jawaban AI nyata/follow-up nyata belum terverifikasi. Situs menampilkan error dan tombol coba lagi. Tidak ada jawaban palsu, chatbot lokal pengganti, atau klaim endpoint live. Baca `docs/QA_REPORT.md` untuk batas pengujian.

## Ubah konten

| Yang diubah | Lokasi |
| --- | --- |
| Proyek, journey, tools, orang, komunitas | `shared/content.json` |
| About, filosofi, tautan pemilik, anime, video | `shared/profile.json` |
| Pengetahuan publik AI | `shared/knowledge.mjs`, diturunkan dari kedua JSON yang sama |
| Gambar teroptimasi | `public/images` |
| Poster hero / video | `public/posters` |
| Metadata, canonical, OG | `index.html`, `public/og-image.jpg`, `public/robots.txt`, `public/sitemap.xml` |
| Warna, typography, breakpoint | `src/index.css`, `src/experience.css` |
| Geometri dan animasi 3D | `src/scenes/engine.ts` |

### Proyek

Setiap proyek memiliki ID unik, judul, kategori, ringkasan, detail, URL, status, dan `visualType`. ID dipakai untuk deep link `#work-id`. Pilihan empat karya utama ada di `src/components/Archive.tsx`. Semua 16 karya tersedia melalui pencarian/filter dan tombol seluruh arsip. HTML tanpa JavaScript juga berisi indeks lengkap.

Gunakan `ONLINE_UNVERIFIED` untuk link yang belum berhasil diverifikasi. Gunakan `ARCHIVED` jika demo tidak tersedia/diketahui tidak dapat diakses. Jangan mengganti menjadi `LIVE_VERIFIED` tanpa pemeriksaan nyata. Cover CSS/SVG adalah ilustrasi dan dilabeli demikian. Pixcraft dan Dewa Store dicatat sebagai kandidat di `docs/project-candidates.json`, belum diterbitkan karena tidak ada data terverifikasi.

### Anime dan video

Ganti `image` pada entri `anime` dengan path lokal baru; pertahankan nama karakter dan provenance yang sesuai. Elaina adalah karakter utama, Arisu dan Hiyori pendamping. Artwork resmi yang disertakan merupakan aset referensi berhak cipta; tidak ditemukan lisensi penggunaan umum. Catatan sumber dan hak ada di `docs/ASSETS.md`.

Video tetap memakai URL Cloudinary dari instruksi sumber, tanpa transcode. Sumber 720×1280 ditampilkan pada frame 16:9 dengan **CSS rotate(-90deg)**. Poster upright terpisah. Player memiliki play/pause, mute, seek, fullscreen, error/retry, dan pause saat keluar viewport. Untuk mengganti sumber dengan video yang sudah landscape, ubah `rotation` menjadi `0` dan sesuaikan `.cote-video` pada CSS.

## Struktur

```text
api/                  Vercel Functions tanpa database
src/                  React, styling, komponen, scene Three.js
shared/               Satu sumber konten publik UI dan AI
public/               Font lokal, gambar, poster, metadata SEO
scripts/prerender.mjs  HTML static untuk crawler dan tanpa JavaScript
tests/                Validasi kontrak chat, konteks, dan failure handling
docs/                 QA, aset, privasi, screenshot, arsip sumber lama
qa.html               Harness lokal responsive QA; tidak masuk dist
```

Dokumen di `docs/legacy` adalah rekaman sumber lama, **bukan instruksi instalasi V2**. Screenshot V2 berada di `docs/screenshots`; screenshot sebelum redesign berasal dari halaman 6–7 PRD dan ditandai di `docs/reference`.

## Motion dan fallback

Poster tersedia sejak render awal. Scene di-load hanya saat mendekati viewport dan tidak diinisialisasi saat reduced motion, save-data, atau device memory rendah terdeteksi. WebGL2 gagal: poster dan semua kontrol teks tetap tersedia. Scene berhenti merender di luar viewport/tab tersembunyi; node berhenti saat hover/focus. Tombol jeda hanya muncul ketika 3D berhasil aktif.

Browser pengujian menonaktifkan WebGL. Fallback dan interaksi teks diuji, tetapi tampilan/FPS GPU perlu diuji di perangkat nyata. Ini dicatat sebagai **belum terverifikasi**, bukan lulus.

## Referensi konfigurasi

- Vercel Vite: https://vercel.com/docs/frameworks/frontend/vite
- Vercel project configuration: https://vercel.com/docs/project-configuration
- Provider AI: https://api.nexray.eu.cc/category/ai
- Vite release/security policy: https://vite.dev/releases

Detail implementasi ada di `CHANGELOG.md`, `docs/QA_REPORT.md`, `docs/ASSETS.md`, dan `docs/PRIVACY.md`.
