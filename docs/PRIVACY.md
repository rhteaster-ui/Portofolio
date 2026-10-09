# Data publik dan perilaku layanan

UI dan AI memakai `shared/content.json` serta `shared/profile.json`. Profil AI berisi alias publik, narasi belajar mandiri/Oppo A3s, filosofi, fase perjalanan, ringkasan proyek dan statusnya, nama tools, anime favorit, nama jejaring/komunitas, dan tautan sosial publik pemilik.

Nomor telepon, tautan kontak pribadi milik orang lain, usia, sekolah, alamat rumah, dan detail pribadi dari prompt lama tidak dimasukkan ke pengetahuan AI. Tautan sosial orang/komunitas yang sudah ada dalam sumber tetap tersedia pada dialog UI. Tinjau kembali bila pemilik tautan meminta penghapusan.

Riwayat chat berada di memori halaman, hilang setelah reload/tutup. Tidak ada database, localStorage chat, analytics, cookie tracking, atau backend penyimpanan pesan. Tombol hapus mengosongkan riwayat lokal. Maksimum 8 pesan terbaru dikirim, masing-masing 1.200 karakter; respons lama dipotong jika perlu. Gagal kirim tidak menghasilkan jawaban palsu.

Saat pengguna mengirim chat, browser mengirim teks ke `/api/chat`. Function meneruskan profil publik dan riwayat terbatas ke Nexray melalui HTTPS menggunakan parameter GET `text`, sesuai kontrak provider. Karena berbentuk query, layanan upstream/infrastruktur dapat mencatat URL/prompt. Kebijakan retensi pihak tersebut berada di luar aplikasi ini. Jangan kirim data rahasia. UI menyampaikan pemberitahuan sebelum chat.

Function tidak mencatat isi chat atau key. Hash IP dan penghitung sementara dipakai untuk batas 8 permintaan per menit per warm instance. Ini best effort, bukan batas global/durable lintas instance. Tambahkan kontrol Vercel Firewall sesuai kebutuhan deployment. Tidak ada jaminan kebal prompt injection: semua pengetahuan yang diberikan memang publik dan AI tidak memiliki tool aksi.

Gambar/avatar dan font dilayani lokal. Video dimuat dari Cloudinary hanya setelah play; memutar video menyebabkan request ke layanan itu. Tautan eksternal terbuka dengan `noopener noreferrer`. Form kontak pengiriman email tidak tersedia; kontak langsung mengikuti layanan yang dipilih pengunjung. `/api/contact` mengembalikan 410 dan tidak mengklaim ada pesan terkirim.

`docs/legacy` berisi sumber lama untuk audit, bukan file publik dalam `dist`. Jangan menaruh rahasia dalam file sumber atau mempublikasikan arsip lama tanpa review tersendiri. Tidak ada kredensial baru yang ditambahkan ke paket V2.
