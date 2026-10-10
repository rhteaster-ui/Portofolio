# R_HMT V2.4.1 — Learning in Progress

Portofolio React, TypeScript, Vite, dan Three.js dengan arah visual putih dingin, silver, serta electric blue. Struktur dan isi V2.2 dipertahankan: 16 karya, 6 fase perjalanan, 19 tools, 14 orang, dan 6 komunitas. Foto `pp.png` dan avatar `pp-dev.png` asli tetap disertakan; tampilan menggunakan turunan WebP yang sudah ada.

## Penyempurnaan 2.4.1

- Kamera background menghubungkan posisi seluruh bagian menjadi lintasan scroll yang berkelanjutan, termasuk kembali ke atas. Sinyal lantai tidak lagi mengulang posisi pada pergantian chapter. Scroll halaman tetap native.
- Putaran Journey mempertahankan sudut dan momentum ketika fase dipilih berulang atau berbalik arah. Layar berganti di tengah transisi; sinyal fisik bergerak di sepanjang sambungan enam modul, disertai respons emissive yang berurutan.
- Slider karya mengikuti tujuan yang dipilih segera. Panah dan keyboard bisa dipakai berulang saat smooth scroll masih berjalan, sementara frame 3D yang sedang melewati fokus tetap mengikuti posisi rak sebenarnya.
- Mouse drag memakai pointer capture, mendeteksi arah horizontal, mematikan snap hanya selama drag, lalu memilih posisi snap terdekat dari scroll aktual. Touch swipe dan scroll vertikal tetap native; klik keyboard tidak ikut diblokir setelah drag.
- Posisi karya dibatasi pada panjang rak sebenarnya dan disejajarkan kembali setelah resize atau pergantian breakpoint. Filter dan pencarian tetap mengembalikan rak ke awal.

Seluruh data, API, dan 102 aset publik V2.4 tetap identik. Production build dan 34 tes tercatat di `docs/QA_V2_4_1.md`. Pemeriksaan visual browser/GPU belum tersedia.

## Penyempurnaan 2.4

- Pertahankan palet cool white, silver, electric blue serta susunan bagian. Hero mendapat inventaris 16 karya/19 tools dan badge Vibe coding; portrait asli ditampilkan pada frame depan melalui UV crop tanpa mengubah file gambar.
- Splash memakai bezel avatar lingkaran, rim chrome/ceramic, dan arc blue fisik. Fragmen, gate kesiapan, skip, serta choreography exit tetap tersedia.
- Journey merakit workspace nyata: ponsel asal, laptop berengsel, keyboard/trackpad, layar fase, dan enam modul yang berubah posisi. Perubahan fase mengatur susunan objek, bukaan layar, jaringan modul, serta kamera.
- Orbit memiliki empat rail berpenampang tabung, runner fisik, tile berketebalan, label core, dan respons kategori. Seluruh 19 logo, interaksi drag/inertia/seleksi, dan fallback grid tetap tersedia.
- My Work tetap rak horizontal. Posisi dan kecepatan geseran mengendalikan yaw/depth frame, fokus membawa karya ke depan, dan slider posisi bisa dipakai untuk menjangkau seluruh hasil filter.
- Background ruang 3D menggunakan shader sinyal pada sambungan lantai, material/glass panel, kamera berdasarkan chapter, dan gerak idle yang dibatasi. Motion off/reduced motion/save-data tetap diperhatikan.
- Gambar fallback dipertahankan sampai tekstur stage siap. Gagal memuat tekstur tidak menyembunyikan fallback. Pengukuran bounds dibatch sebelum perubahan style; resize DPR tidak menambah loop render kedua. Diagnostik draw call/triangle mencatat total frame lintas viewport.
- Empat tes choreography baru menguji frustum workspace berikut engsel dan platform melalui transisi chapter, frame karya pada pointer/swipe ekstrem, batas yaw, dan paused camera. Framing diuji secara numerik pada lebar stage 284–570 px; ini bukan browser screenshot atau benchmark.

Semua data, konfigurasi API, dan 102 aset publik dari V2.3.1 tetap utuh. Hasil build, 28 tes, dan preservasi ada di `docs/QA_V2_4.md`. Tampilan/GPU aktual masih perlu browser QA.

## Penyempurnaan 2.3.1

- Perbaiki selector scene agar status renderer pada HTML tidak ikut dirender dan tidak menyembunyikan gambar fallback panel detail.
- Splash menunggu foto/font dan kesiapan renderer/fallback. Fragmen dirakit berurutan, lalu keluar lewat transformasi 3D. Minimum 2,8 detik, dengan waktu rakitan setelah kesiapan; batas tunggu 6 detik, fade 650 ms, dan skip tetap tersedia.
- Inertia orbit memakai integrasi waktu nyata agar jarak putaran konsisten pada 30/60/120 Hz. Drag bisa dimulai dari logo; gerakan vertikal tetap untuk scroll halaman, dan drag tidak menjadi klik tool.
- Hit area logo memakai kedalaman kamera sebenarnya; titik di luar stage atau di belakang kamera tidak menghasilkan target klik tak terlihat. Tap ulang/Escape melepas seleksi.
- Journey membalik perangkat dan mengganti isi layar di tengah putaran. Posisi kamera juga berubah mengikuti scroll.
- Renderer berhenti ketika hanya ruang statis/karya yang sudah diam atau panel dialog terbuka. Environment reflection dibuat kembali setelah context restore; resource shadow dibersihkan saat stage dilepas.
- Audio video dipasang langsung pada elemen media dalam gesture pengguna, tanpa menambah tombol atau kontrol lain.

Semua isi dan aset dari V2.3 tetap utuh. Verifikasi matematika/interaksi pada kode tersedia di `docs/QA_V2_3_1.md`; QA browser/GPU masih belum tersedia.

## Yang berubah

- Background ruang digital dibuat dari geometri 3D: frame silver, panel transparan, lantai perspektif, pencahayaan, dan kamera yang mengikuti bagian serta posisi scroll. Background pegunungan tidak lagi dipakai oleh tampilan aktif.
- Hero memakai empat objek browser frame bertekstur foto asli, kode, Elaina dari galeri, dan ilustrasi karya. Membuka stack mengubah posisi objek dalam ruang 3D; pointer dan scroll memengaruhi susunannya.
- Splash merakit fragmen silver dan blue menjadi frame identitas. Memuat foto/font utama, muncul sekali per sesi, bisa dilewati dengan tombol atau Escape, dan diabaikan pada deep link atau reduced motion.
- Journey memakai model perangkat 3D dengan enam keadaan layar. Selector dan teks fase memiliki ruang sendiri, termasuk pada mobile.
- Orbit memakai empat jalur 3D dan seluruh 19 logo brand lokal. Drag, inertia, pemilihan node, kategori, keyboard, reset, serta pause tetap tersedia.
- Karya berada dalam rak horizontal dengan frame fisik 3D, perspektif sesuai posisi, focus depth, swipe/drag, panah, pencarian, filter, deep link, dan dialog detail. Cover adalah ilustrasi konsep yang dibuat khusus, bukan screenshot produk.
- My Waifu memakai frame 3D dan deskripsi karakter singkat. Referensi sumber disimpan dalam dokumentasi aset, tidak ditampilkan pada galeri.
- Video langsung setelah galeri berbentuk banner 16:9, autoplay muted, loop, dan hanya memiliki tombol audio. Judul masuk dari atas saat hover, atau muncul 2,6 detik setelah sentuhan. Banner Kings & Queen tetap tersedia setelah video.
- Asisten bernama **Relay**, dengan mark frame/signal khusus. Konteks dan adapter Nexray tetap memakai data publik portofolio.
- Bagian kesan pengunjung memakai Upstash Redis: nama dan 1–5 bintang wajib, komentar opsional, tanpa akun atau email. Rate limit dan idempotensi berjalan di server.
- Banner Open Graph tech baru disertakan. Prerender, canonical, sitemap, robots, dan ProfilePage/Person JSON-LD tetap tersedia.

## Jalankan lokal

Gunakan Node 22 atau 24. Dari folder yang berisi `package.json`:

```sh
npm ci
npm run dev
```

Buka `http://localhost:4173`. Salin `.env.example` ke `.env.local` hanya bila ingin mengaktifkan rating atau mengganti konfigurasi chat; restart dev server setelah mengubah env. Adapter lokal tersedia untuk `/api/chat`, `/api/ratings`, `/api/health`, dan `/api/contact`.

```sh
npm run check
npm test
npm run build
```

Build menghasilkan `dist` dan HTML yang sudah diprerender. `npm run preview` hanya menyajikan static build; API membutuhkan dev server atau Vercel.

## Deploy Vercel

1. Ekstrak ZIP, lalu masukkan isi folder `R_HMT_V2` ke repository milikmu. Import repository ke Vercel; Root Directory harus folder yang berisi `package.json` dan `api`, bukan `dist`.
2. Pilih **Vite**, Install Command `npm ci`, Build Command `npm run build`, Output Directory `dist`, dan Node **22.x** atau **24.x**. Deploy. `vercel.json` sudah mengatur function chat 30 detik dan rating 15 detik.

Untuk mengaktifkan rating, cukup buat satu database Redis di Upstash, kemudian salin **REST URL** dan **REST token** ke Environment Variables project Vercel:

```dotenv
UPSTASH_REDIS_REST_URL=https://DATABASE.upstash.io
UPSTASH_REDIS_REST_TOKEN=TOKEN_DARI_UPSTASH
```

Aktifkan pada environment Production (dan Preview bila diperlukan), lalu redeploy. Tidak membutuhkan tabel, migrasi, SDK, atau server tambahan. Gunakan token yang dapat menulis, bukan read-only token. Jangan gunakan prefix `VITE_` dan jangan commit `.env.local`.

Jika belum diisi, rating tampil sebagai belum tersedia dan form tidak mengaku berhasil menyimpan. Database nyata dan deployment publik belum dibuat atau diuji dari lingkungan pengembangan ini.

Canonical saat ini `https://rhmt.biz.id/`. Jika memakai domain lain, sesuaikan `index.html`, `public/robots.txt`, dan `public/sitemap.xml` sebelum deploy. Panduan Search Console ada di `docs/SEO_DEPLOY.md`.

## Batas rating

Seluruh pemeriksaan dan penulisan rating dilakukan lewat satu skrip Lua Redis. Pengiriman ulang dengan ID dan isi yang sama mengembalikan hasil sebelumnya selama batas request belum terlampaui, sehingga tidak menambah hitungan lagi selama 24 jam. Replay juga memakai kuota percobaan untuk mencegah bypass batas request.

| Batas | Nilai |
| --- | --- |
| Rating berhasil per browser | 1 per 24 jam |
| Rating berhasil per IP | 1 per 10 menit, maksimal 3 per 24 jam |
| Percobaan kirim per IP | 12 per 10 menit |
| Rating berhasil seluruh situs | 500 per 24 jam |
| Pembacaan per IP / seluruh situs | 60 / 500 per menit |
| Nama / komentar | 50 / 600 karakter |
| Daftar komentar tersimpan / ditampilkan | 250 / 20 terbaru |

Validasi JSON, same-origin, honeypot, serta challenge bertanda tangan diterapkan di server. Token Redis tidak dikirim ke frontend; identitas IP/browser pada key berupa HMAC. Ini kontrol anti-spam sederhana untuk portofolio, bukan jaminan menahan serangan terdistribusi. Ringkasan bintang dan jumlah rating tetap tersimpan meski daftar komentar dibatasi 250 terbaru.

Nama dan komentar tampil publik. Untuk menghapus atau memoderasi kesan, gunakan dashboard Redis; aplikasi tidak menambahkan sistem admin.

## Konten dan komponen

| Yang diubah | Lokasi |
| --- | --- |
| Proyek, journey, tools, orang, komunitas | `shared/content.json` |
| About, filosofi, sosial, anime, video | `shared/profile.json` |
| Pengetahuan Relay | `shared/knowledge.mjs` |
| Layout, warna, typography, breakpoint | `src/spatial.css` |
| Geometri, material, lighting, kamera, choreography | `src/scenes/world.ts` |
| Jembatan React dan renderer | `src/components/SpatialWorld.tsx` |
| Galeri dan video | `src/components/Personal.tsx`, `VideoPlayer.tsx` |
| UI / API rating | `src/components/Ratings.tsx`, `api/ratings.js` |
| Generator cover khusus | `scripts/generate-components.mjs` |
| Metadata dan OG | `index.html`, `public/og-tech.png` |

`npm run build` memakai `src/spatial.css` sebagai stylesheet aktif. CSS dan engine versi lama yang masih disertakan adalah arsip implementasi, bukan jalur runtime aktif.

Semua 16 karya tersedia untuk pencarian/filter dan indeks tanpa JavaScript. Status `ONLINE_UNVERIFIED` berarti tautan belum terverifikasi; `ARCHIVED` berarti arsip. Jangan mengganti status menjadi `LIVE_VERIFIED` tanpa pemeriksaan nyata.

Video tetap memakai URL Cloudinary dari sumber asli, tanpa transcode. Sumber portrait ditampilkan landscape dengan `rotation: -90`. Bila mengganti dengan video landscape, set `rotation: 0` dan ubah dimensi `.cote-video` menjadi width/height 100%. Browser menentukan izin autoplay; player mencoba kembali pada gesture berikutnya tanpa menambahkan kontrol play.

## Motion dan fallback

Satu renderer WebGL2 memakai viewport yang dipotong sesuai stage; scene dibuat ketika terlihat. Material silver/ceramic/glass, environment reflection, directional lighting, dan shadow adalah bagian dari engine Three.js. Kontrol dan teks tetap elemen HTML yang dapat difokuskan.

Target render 60 fps desktop dan 30 fps mobile; ini target dalam kode, **bukan hasil benchmark perangkat**. DPR dibatasi dan diturunkan jika frame berat; rendering berhenti pada tab tersembunyi. Global Motion dan reduced motion menampilkan scene statis. Jika WebGL2 tidak tersedia atau context hilang, foto/ilustrasi dan grid tool lokal tetap tersedia.

## Verifikasi

TypeScript, build/prerender, 28 tes backend/data/proyeksi 3D/choreography, validitas SVG, tautan aset lokal, dan pemeriksaan preservasi konten dilakukan. Tes Lua menjalankan skrip produksi di liblua dengan model perintah Redis; ini belum merupakan pengujian database Upstash nyata.

**QA visual V2.4 belum dilakukan:** browser QA yang diwajibkan workflow tidak tersedia. Kemiripan 100% dengan gambar konsep, posisi UI pada perangkat fisik, material/refleksi nyata, FPS, dan autoplay aktual belum dapat dinyatakan lulus. Gambar di `docs/design/approved-tech-concept.png` adalah arah visual yang disetujui; `public/og-tech.png` adalah artwork sharing, bukan screenshot website.

Screenshot di `docs/screenshots` berasal dari versi sebelum V2.3. Tidak ada screenshot baru yang diklaim sebagai tampilan aktual V2.4. Daftar pemeriksaan yang masih diperlukan ada di `docs/QA_V2_4.md`.

Chat tetap memakai `/api/chat` → Nexray GET `text`. Probe live sebelumnya mendapat HTML Site Unavailable; jawaban AI nyata belum terverifikasi. UI menyediakan error dan retry, tanpa respons palsu.

## Dokumen

- `CHANGELOG.md`: perubahan versi.
- `docs/QA_V2_4.md`: hasil pemeriksaan V2.4, preservasi, dan batas verifikasi; laporan versi sebelumnya tetap disertakan.
- `docs/QA_V2_3_1.md`: hasil pemeriksaan terbaru dan batas verifikasi; laporan V2.3 tetap disertakan.
- `docs/CONTENT_PRESERVATION.json`: inventaris yang dipertahankan.
- `docs/ASSETS_V2_3.md` dan `docs/ASSETS_V2_2.md`: aset baru serta sumber foto/brand/anime.
- `docs/PRIVACY.md`: data layanan dan penyimpanan rating.
- `docs/SEO_DEPLOY.md`: domain, metadata, sitemap, dan langkah Search Console.

Tidak ada deployment Vercel, perubahan DNS, pendaftaran Search Console, atau koneksi database pengguna yang dilakukan dalam paket ini.
