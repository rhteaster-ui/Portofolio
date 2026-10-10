# Deployment dan indexing

## Paket Vercel

Import isi folder `R_HMT_V2`, bukan `dist`, sebagai root repository/project. Pilih Vite, `npm ci`, `npm run build`, output `dist`, Node 22.x/24.x. API berada di folder root `api/`; tidak memerlukan VPS. Rating memakai Upstash Redis bila dua env diaktifkan; halaman dan chat tidak memerlukan database tersebut. Environment ada di `.env.example` dan panduan dua env ada di README.

## SEO yang sudah dipasang

- HTML berbahasa Indonesia; title, description, satu H1, heading bagian dan alt gambar.
- Prerender isi halaman sebelum JavaScript berjalan. Semua 16 proyek hadir di HTML; indeks noscript menyertakan masalah, eksplorasi, hasil, teknologi, dan tautan. Semua 19 tools tercantum.
- Canonical, Open Graph/Twitter image `og-tech.png` 1730×909, serta ProfilePage/Person JSON-LD dengan profil sosial yang memang ada. Gambar OG adalah artwork sharing, bukan screenshot implementasi.
- `robots.txt` mengizinkan halaman publik dan menghindari `/api/`. `sitemap.xml` menunjuk halaman utama.
- File verifikasi Google dari sumber awal dipertahankan.

## Setelah deploy

1. Pastikan domain final memang `https://rhmt.biz.id/`. Jika berbeda, ganti domain pada `index.html`, `public/robots.txt`, dan `public/sitemap.xml`, kemudian build ulang. Jangan biarkan canonical menunjuk domain yang berbeda dari tujuan publik. `docs/design/og-layout.html` adalah sumber OG versi lama, tidak dipakai build V2.3.
2. Sambungkan domain di Vercel dan gunakan DNS record yang ditampilkan untuk project tersebut.
3. Tambahkan/verifikasi kepemilikan properti domain di Google Search Console menggunakan record DNS yang diberikan untuk akunmu. File verifikasi lama hanya berguna bila cocok dengan properti/metode verifikasi yang dipakai.
4. Kirim `https://rhmt.biz.id/sitemap.xml` melalui menu Sitemaps.
5. Gunakan URL Inspection untuk halaman utama, jalankan pengujian URL live, lalu Request Indexing jika halaman bisa diakses. Gunakan Rich Results Test untuk memeriksa JSON-LD setelah URL tersedia publik.
6. Pantau status indexing dan laporan performa. Tidak ada pendaftaran Search Console, perubahan DNS, atau deployment publik yang dilakukan oleh paket ini.

Animasi tidak menyembunyikan konten utama dari HTML. Sitemap/structured data membantu Google memahami dan menemukan halaman; keduanya tidak menjamin indexing, rich result, atau peringkat tertentu. Hash `#work-id` adalah navigasi di satu halaman, bukan URL halaman proyek terpisah dalam sitemap.

Referensi primer (diperiksa 9 Oktober 2026):
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Video / provider AI

Autoplay menggunakan muted dan playsInline. Keputusan akhir autoplay tetap milik browser; V2.3 mencoba kembali pada gesture berikutnya tanpa kontrol play. Chat menuju `/api/chat`, lalu GET Copilot dengan `text` berisi konteks publik dan percakapan. Respons nyata belum berhasil diverifikasi: pengujian provider sebelumnya mendapat HTML “Site Unavailable”, bukan JSON AI. Tidak ada jawaban palsu atau klaim koneksi sukses. QA visual/autoplay V2.3 belum dilakukan; lihat `QA_V2_3.md`.
