# R_HMT V2.6.1 — Learning in Progress

Portofolio React, TypeScript, dan Vite dengan konsep ruang kaca, graphite, silver, serta light mode pearl white. Dark mode mengikuti referensi terbaru pengguna. Nomor versi hanya dicatat di dokumentasi dan metadata paket; tidak ada badge versi di halaman.

Isi terbaru: **18 karya, 6 fase perjalanan, 19 tools, 14 orang, dan 5 komunitas**. Dua proyek ditambahkan dan BELAJAR CODING & BAHAS ANIME dihapus sesuai permintaan. Aset identitas asli tetap identik, termasuk `pp.png`, `pp-dev.png`, gambar karakter, dan duo Kings & Queen. Tampilan memakai turunan WebP yang sudah tersedia. Perubahan bahasa mengikuti `Aboutme.txt`, dengan “tidak” menggantikan “nggak” serta konteks personal tetap dipertahankan.

## Pembaruan visual dan motion

- Hero desktop: narasi dan inventaris di kiri, foto asli dalam frame kaca berlapis di tengah, serta semesta teknologi di kanan. Tablet dan HP menyusun ulang bagian tersebut agar tetap terbaca.
- Dua latar arsitektur kaca dibuat khusus dengan imagegen. Latar memiliki pantulan nyata dalam gambar, lalu bergerak lewat parallax. Material pada frame memakai beberapa lapisan dengan perspektif dan kedalaman CSS.
- Renderer Three.js seluruh halaman dilepas dari jalur runtime. Scene dan tes lama tetap disertakan sebagai riwayat teknis; pengunjung tidak mengunduh bundle Three.js atau world dari entry aktif.
- Orbit menampilkan seluruh 19 logo pada dua jalur yang terpisah, dengan satu rail silver tambahan. Ikon tetap tegak. Drag, momentum, seleksi, kategori, reset, pause, keyboard, dan deskripsi tool tersedia. Posisi node memakai transform GPU; satu loop lokal berjalan sekitar 30 pembaruan per detik saat dibutuhkan.
- Orbit berhenti saat tidak terlihat, tab tersembunyi, intro/dialog terbuka, pointer ditekan/drag atau seleksi aktif, motion dijeda, atau reduced motion dipilih. Resize memperbarui posisi meski orbit sedang diam.
- Splash tampil **setiap refresh**, termasuk deep link. Frame kaca dirakit, avatar asli masuk, lalu hero dibuka berurutan. Aset utama dan font masuk loading progress; tersedia skip/Escape, batas tunggu 4 detik, dan versi statis singkat untuk reduced motion.
- Stack foto bisa dibuka, merespons pointer, dan mengubah sudut mengikuti scroll. Gerak idle kecil dan pantulan bergerak memakai transform/opacity.
- Journey memakai ponsel asal dan enam modul kaca. Scroll mengendalikan posisi/sudut workspace; pergantian fase mengubah layar, perangkat, modul aktif, dan sinyal. Narasi lengkap enam fase tetap tersedia.
- Karya berada dalam rak horizontal: tiga kartu desktop, dua tablet, satu kartu dengan petunjuk kartu berikutnya pada HP. Swipe/drag, panah, slider, filter, pencarian, keyboard, dan deep link tetap tersedia. Cover mendapat depth sesuai posisi. Cover merupakan ilustrasi konsep, bukan screenshot produk.
- My Waifu memakai tiga kartu karakter dan deskripsi singkat. HP memiliki galeri swipe; desktop merespons pointer dengan tilt. Tidak menampilkan label “anime edit” atau sumber Pinterest.
- Video langsung setelah galeri tetap banner 16:9, autoplay muted, loop, dan hanya memiliki kontrol audio. Judul muncul dari atas saat hover atau selama 2,6 detik setelah tap. Tidak ada tombol play, durasi, atau timeline.
- Kings & Queen menampilkan **gambar utuh** dengan `object-fit: contain`, bersama caption dalam satu banner.
- Relay, jejaring, komunitas, rating, footer, dialog, dan formulir mengikuti tema yang sama. Pilihan dark/light disimpan; pilihan ini tidak memengaruhi splash.
- Open Graph/Twitter memakai URL Cloudinary persis dari pengguna, JPEG 1734×907. Aset OG lokal lama tetap disimpan sebagai arsip.

## Pembaruan interaksi V2.6

- Tiga foto hero menyimpan posisi layer; klik gambar belakang atau pilihan gambar untuk mengangkatnya ke depan. Foto asli selalu bisa dipilih kembali.
- Hover dan fokus keyboard tidak menghentikan orbit. Tekan/drag atau pilih ikon untuk jeda; tekan ikon yang sama atau Escape untuk melanjutkan.
- Selected Works naik menutup hero yang dipin. Hero panjang di HP tetap dapat dibaca sebelum bagian terakhir dipin. Scroll native dan gerak dapat dibalik; reduced motion menampilkan halaman biasa.
- Bagian 04 memakai exploded stack dengan GitHub di tengah, React, Vite, TypeScript, CSS/SVG, Upstash, Node.js, Vercel, dan REST. Jalur signal, float, pointer tilt, pemisahan layer, dan klik penjelasan menggunakan CSS/SVG; daftar 19 tools tetap tersedia.
- Dialog karya hanya gambar, nama, deskripsi, dan stack. Deskripsi publik dikoreksi dari situs asli; Finora Journey dan Alight Motion Pro ditambahkan. Stack yang belum dapat dibuktikan tidak diisi sebagai kepastian. Catatan penelusuran: `docs/PROJECT_RESEARCH_V2_6.md`.
- The community memakai foto komunitas HIRASAWA.ID dari halaman undangan WhatsApp asli dan penanda WhatsApp. Tidak memakai ikon coding acak.
- Kimi light mode memakai K gelap, dot brand tetap biru. SVG asli tidak diubah.
- Kesan pengunjung berupa satu rail horizontal tanpa testimonial duplikat. Rail bergerak perlahan, balik arah di ujung, bisa dijeda/swipe/keyboard/panah, dan berhenti ketika disentuh, difokuskan, hover, offscreen, tab tersembunyi, atau reduced motion.

## Polish V2.6.1

Transisi penutup hero dimulai dari posisi awal Selected Works, sehingga hero pendek di layar desktop tinggi tidak meredup sebelum scroll. Gerak otomatis komentar menyimpan posisi pecahan sendiri agar tetap bergerak ketika browser membulatkan `scrollLeft`. Pembaruan visual rail dibatasi sekitar 30 Hz dan ukuran rail diukur saat resize/wake; fokus, sentuhan, dan navigasi manual tetap menjeda gerak.

## Jalankan lokal

Gunakan Node 22 atau 24. Jalankan dari folder yang berisi `package.json`:

```sh
npm ci
npm run dev
```

Buka `http://localhost:4173`. Salin `.env.example` ke `.env.local` jika ingin mengaktifkan rating atau mengganti konfigurasi chat. Restart dev server setelah perubahan env. API lokal tersedia untuk `/api/chat`, `/api/ratings`, `/api/health`, dan `/api/contact`.

```sh
npm run check
npm test
npm run build
```

Build menghasilkan `dist` dan HTML prerender. `npm run preview` hanya menyajikan static build; API membutuhkan dev server atau Vercel.

## Deploy Vercel

1. Ekstrak ZIP. Masukkan isi folder `R_HMT_V2` ke repository, lalu import ke Vercel.
2. Root Directory adalah folder yang berisi `package.json` dan `api`, bukan `dist`.
3. Pilih Vite, Install Command `npm ci`, Build Command `npm run build`, Output Directory `dist`, dan Node 22.x atau 24.x. `vercel.json` sudah tersedia.

Rating membutuhkan dua Environment Variables dari satu database Upstash Redis:

```dotenv
UPSTASH_REDIS_REST_URL=https://DATABASE.upstash.io
UPSTASH_REDIS_REST_TOKEN=TOKEN_DARI_UPSTASH
```

Gunakan REST token yang dapat menulis. Aktifkan pada Production dan redeploy; tidak memerlukan tabel, migrasi, atau SDK tambahan. Jangan memakai prefix `VITE_` dan jangan commit `.env.local`. Bila env belum tersedia, form tidak mengaku berhasil menyimpan.

Canonical, JSON-LD, OG URL, robots, dan sitemap dipasangkan saat build: `PORTFOLIO_SITE_URL` jika diisi; jika tidak, hostname Production Vercel; terakhir fallback `https://rhmt.biz.id/`. Untuk domain custom, cukup isi satu env opsional `PORTFOLIO_SITE_URL=https://domainmu/` lalu redeploy. Prerender, Person/ProfilePage JSON-LD, sitemap, robots, dan file verifikasi Google tetap disertakan. Panduan Search Console ada di `docs/SEO_DEPLOY.md`.

Paket ini siap di-build untuk Vercel. Deployment publik dan database nyata belum dibuat atau diuji dari lingkungan ini.

## Rating dan Relay

Nama dan bintang 1–5 wajib; komentar opsional. Nama serta komentar tampil publik. Tanpa email atau akun. Rate limit, honeypot, same-origin, challenge HMAC, dan idempotensi tetap diperiksa pada server melalui skrip Lua atomik.

| Batas | Nilai |
| --- | --- |
| Rating berhasil per browser | 1 per 24 jam |
| Rating berhasil per IP | 1 per 10 menit; maksimal 3 per 24 jam |
| Percobaan kirim per IP | 12 per 10 menit |
| Rating berhasil seluruh situs | 500 per 24 jam |
| Pembacaan per IP / seluruh situs | 60 / 500 per menit |
| Nama / komentar | 50 / 600 karakter |
| Komentar tersimpan / ditampilkan | 250 / 20 terbaru |

Retry dengan ID dan isi yang sama tidak menambah hitungan selama 24 jam. Token Redis tetap di server. Moderasi melalui dashboard Redis; tidak ada sistem admin tambahan.

Relay memakai `/api/chat` → Nexray GET `text`, dengan konteks publik dari sumber data yang sama. Probe sebelumnya mendapat HTML Site Unavailable; respons live provider belum terverifikasi. UI menyediakan error, retry, dan stop, tanpa jawaban palsu. Riwayat hanya bertahan selama halaman terbuka.

## Lokasi perubahan

| Bagian | Lokasi |
| --- | --- |
| Konten karya, journey, tools, orang, komunitas | `shared/content.json` |
| About, sosial, karakter, video | `shared/profile.json` |
| Tata letak, palet, breakpoint, motion | `src/glass.css` |
| Frame foto | `src/components/Scene.tsx` |
| Orbit dan momentum | `src/components/ToolOrbit.tsx`, `src/interaction/orbit.mjs` |
| Scroll dan interaksi pointer | `src/hooks/useExperience.ts` |
| Rak karya | `Archive.tsx`, `useWorkShelf.ts` |
| Galeri, Kings & Queen, video | `Personal.tsx`, `VideoPlayer.tsx` |
| Rating / chat API | `api/ratings.js`, `api/chat.js` |
| Latar, prompt, referensi, OG source | `public/images/glass`, `docs/design/glass` |

`src/glass.css` adalah stylesheet aktif. `spatial.css`, `SpatialWorld.tsx`, dan engine lama tidak dipakai entry halaman. Three.js masih dependency untuk source/tes historis, tetapi tidak masuk bundle pengunjung.

Video mempertahankan URL Cloudinary asli. Source portrait ditampilkan landscape melalui rotasi −90°. Jika mengganti dengan source landscape, ubah `rotation` menjadi 0 dan ukuran `.cote-video` ke 100% × 100%. Browser menentukan izin autoplay; player mencoba kembali pada gesture berikutnya.

## Verifikasi dan batasnya

Production build dan **49 tes lulus**. Empat tes tambahan V2.6 memeriksa transisi chapter, hero HP yang panjang, pemilihan canonical, dan penolakan URL canonical tidak valid. Empat tes V2.5 memeriksa jarak 19 target orbit pada berbagai ukuran, momentum 30/60/120 Hz, kondisi penghentian render, serta koordinat rail. Tes lain mencakup backend, Lua, native shelf, dan kontrak geometri historis. Tes geometri lama tidak membuktikan tampilan baru.

Audit versi terbaru mencatat entitas, pelestarian aset identitas, empat API, satu H1, ID, referensi aset, SVG, metadata sosial, dan video. Hasil terukur ada di laporan JSON terbaru.

**QA tampilan/FPS browser belum dijalankan.** Browser QA yang diizinkan workflow tidak tersedia. [Panduan Sites](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md) menyatakan: “If `$control-browser` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Karena itu kemiripan 100%, FPS perangkat, autoplay nyata, serta interaksi browser belum dapat dinyatakan lulus. Screenshot lama dalam dokumentasi bukan hasil tampilan baru.

Laporan terbaru: `docs/QA_V2_6_1.md`, `docs/static-validation-v2.6.1.json`, `docs/build-output-v2.6.1.txt`, dan `docs/test-output-v2.6.1.txt`. Riwayat perubahan ada di `CHANGELOG.md`. Referensi dan aset hasil imagegen adalah acuan visual, bukan bukti runtime.
