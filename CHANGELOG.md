# V2.2 — 2026-10-09

- Preserve data inventory and original identity while brightening the existing visual direction.
- Add generated landscape background, expandable photo stack, skippable session splash, six-state journey vignette, 19-node branded orbit, and accessible horizontal archive.
- Integrate exact supplied Pinterest reference assets with provenance; preserve originals.
- Autoplay muted video in view, loop, pause on exit/hidden tab; respect manual pause.
- Apply Aboutme language refinement and shared public AI database-only instruction.
- Switch default AI endpoint to Nexray Copilot; retain same-origin Vercel function, timeout, honest error/retry.
- Add aligned OG banner, updated metadata, complete static archive details and Search Console deployment guide.
- Fix mobile anime-card aspect-ratio overflow; preserve desktop/mobile controls and reduced-motion behavior.

# 2.1.0 — Origin / revisi sesuai masukan pemilik

- Memulihkan identitas pp-dev untuk header/footer/orbit dan pp asli untuk hero.
- Mengganti seluruh display serif dengan Space Grotesk; body Manrope variable.
- Menambahkan susunan foto CSS 3D, tilt pointer, frame WebGL, gerak scroll, progress perjalanan dan reveal section.
- Menambahkan jeda motion global dan mempertahankan reduced-motion/static fallback.
- Memperbarui arsip asimetris, kedalaman galeri, skala teks dan layout 360–1440.
- Mempertahankan seluruh shared content, API chat dan konfigurasi Vercel.
- Memperbarui favicon/Apple/OG, screenshot produksi, lisensi dan manifest aset.

# V2 — 2026-10-08

## Dipertahankan

- Identitas R_HMT, perjalanan belajar dari Oppo A3s, filosofi pembelajar mandiri.
- Seluruh 16 proyek, 6 fase journey, 19 tools dalam 4 kelompok, 14 orang, 6 komunitas; tautan sumber tersedia pada detail.
- Gambar komunitas/avatar asli, provider Nexray, endpoint publik `/api/chat`.
- Video Cloudinary persis dari instruksi; sumber tidak ditranscode.

## Diganti dan dimigrasi

- Cyan-grid/splash panjang diganti arah editorial charcoal, ivory, champagne, font lokal Instrument Serif + Manrope.
- Hero menjadi artefak monogram R berlapis; orbit menjadi scene Three.js berperspektif dengan 4 bidang orbit dan node DOM yang dapat difokuskan.
- Card proyek menjadi arsip terfilter, pencarian, detail dialog, deep link, cover ilustratif yang ditandai.
- Data UI dan pengetahuan AI disatukan di `shared`. Klaim hasil proyek tidak disajikan sebagai keberhasilan live. 11 proyek berstatus link belum diverifikasi; 5 arsip.
- `api/chat` meneruskan riwayat dan profil publik, mengoreksi host provider yang malformed, memvalidasi payload, menambah timeout, rate limit per instance, dan parser respons terbatas.
- About, journey accordion, kategori tools, profil/komunitas dialog, personal gallery, player landscape, ethos, dan kontak langsung dibangun ulang.
- HTML diprerender, indeks seluruh karya tanpa JavaScript, metadata domain canonical, OG 1200×630, sitemap, robots, favicon, dan Apple icon ditambahkan.
- Vite diperbarui ke 6.4.4 beserta dependensi transitive sesuai audit; paket build dipisahkan ke devDependencies. npm audit akhir: 0 temuan pada tanggal pengujian.

## Dihapus dari runtime

- Express/server permanen dan jalur build ganda; sumber lama disimpan di `docs/legacy`.
- GSAP/Motion yang tumpang tindih; animasi menggunakan CSS/Three.js.
- Form kontak yang hanya console.log tetapi mengaku berhasil. Kontak sekarang memakai tautan langsung. Endpoint lama mengembalikan 410.
- Jumlah anggota, label komunitas aktif, dan klaim metrik yang belum terverifikasi.

## Masih memerlukan verifikasi eksternal

- Jawaban nyata dari provider AI dan follow-up live. Error state diuji; sukses upstream hanya diuji dengan fixture kontrak.
- Tampilan dan FPS Three.js pada perangkat WebGL2; cloud browser QA tidak menyediakan GPU/WebGL.
- URL proyek yang tidak dapat diverifikasi, status terkini komunitas, hak publikasi artwork referensi anime.
- Pixcraft dan Dewa Store belum ditambahkan ke UI: data/link belum tersedia.
- Deploy Vercel, DNS domain, indexing Google, Safari/iOS dan Android fisik belum dilakukan.
