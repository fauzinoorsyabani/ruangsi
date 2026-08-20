# Tindak Lanjut RuangSI

- [x] Menerima nomor WhatsApp bisnis dengan kode negara dan URL Instagram final dari pemilik.
- [ ] Menerima daftar kelas, harga, deskripsi, kuota, dan jadwal yang benar untuk katalog pembayaran.
- [ ] Menyiapkan storefront dan checkout pembayaran untuk program kelas bimbingan.
- [x] Menyambungkan router commerce Shopify, provider keranjang, dan environment storefront ke proyek full-stack.
- [ ] Membuat halaman katalog/pemesanan yang mengambil kelas aktif dari Shopify dan mengarahkan checkout ke alur Shopify.
- [ ] Membuat minimal satu produk kelas aktif dengan harga dan deskripsi yang disetujui pemilik setelah katalog diberikan.
- [ ] Mengklaim dev store Shopify dan mengaktifkan penyedia pembayaran sebelum checkout dipakai publik.
- [x] Menambahkan halaman pemesanan yang dapat memilih program, menangkap kebutuhan awal, dan meneruskan mahasiswa ke checkout.
- [x] Menyimpan konteks CTA asal mahasiswa pada inquiry agar tindak lanjut konsultasi dan kelas dapat dibedakan.
- [x] Memperjelas keadaan katalog kosong serta identitas study-signal board pada halaman pemesanan agar tidak terlihat seperti loading tanpa akhir.
- [x] Menambahkan jalur WhatsApp alternatif pada katalog kosong untuk calon mahasiswa yang ingin menanyakan kelas sebelum katalog aktif.
- [x] Menampilkan placeholder kontak dan bukti sosial yang eksplisit sampai nomor, tautan Instagram, serta testimoni asli diterima.
- [x] Menghubungkan CTA konsultasi ke pesan WhatsApp yang sesuai konteks dan footer ke Instagram.
- [x] Mengaktifkan nomor WhatsApp 62895609250509 dan Instagram @jago.jokitugas pada seluruh CTA publik RuangSI.
- [ ] Menerima testimoni serta cerita sukses asli, beserta izin publikasi, nama/pseudonim, dan hasil yang boleh diklaim.
- [x] Menambahkan section bukti sosial tanpa membuat atau memalsukan review, rating, maupun metrik.
- [ ] Menguji link kontak, jalur pemesanan, checkout, dan tampilan responsif sebelum menyampaikan pembaruan.
- [x] Memeriksa remote GitHub, menyimpan commit versi terbaru, dan mendorong source code RuangSI ke repository privat pengguna.

- [x] Audit dan perbaiki error deployment Vercel berdasarkan log dan build aktual.
- [x] Menyesuaikan struktur aset/media agar tidak bergantung pada file lokal yang tidak kompatibel dengan Vercel.
- [x] Menambahkan konfigurasi deployment Vercel yang kompatibel dengan build full-stack, tanpa memasukkan secret ke repository.
- [x] Menjalankan build, test, dan pemeriksaan rute setelah perbaikan Vercel.
- [x] Mendorong perbaikan kompatibilitas Vercel ke GitHub.
- [x] Menyampaikan environment variables dan batasan Shopify/database yang wajib dikonfigurasi di Vercel.

## Deployment Audit Notes

- [x] Build lokal TypeScript dan produksi saat ini berhasil.
- [x] Tidak ditemukan gambar/media lokal yang perlu dipindahkan dari client/public atau client/src/assets.
- [x] Database RuangSI berisi tabel users dan bookingInquiries; deployment eksternal memerlukan database yang kompatibel dan DATABASE_URL.
- [x] Verifikasi endpoint runtime dan konfigurasi environment pada server production lokal sebagai simulasi Vercel.
- [ ] Verifikasi endpoint runtime dan konfigurasi environment pada deployment Vercel nyata setelah project diimpor dan variables diisi.

## Previous TODO History

- [x] Previous RuangSI features and GitHub export history retained above.
- [ ] Class catalog, prices, checkout activation, and authenticated alumni stories remain blocked until owner data is provided.
- [ ] Configure Shopify ownership and payment provider before public checkout.
- [ ] Add verified alumni testimonials only after owner provides permissioned source material.
- [ ] Run final end-to-end contact, order, checkout, and responsive checks before public deployment.
- [ ] Fix any remaining deployment compatibility errors and push the final commit.
- [ ] Record Vercel environment variable checklist and external-hosting caveats.

## Current Request

- [x] Repair Vercel deployment compatibility and push the final changes to GitHub.

## Existing Completed Work

- [x] RuangSI landing page and Peta Studi visual system.
- [x] Booking inquiry form with CTA context persistence.
- [x] Shopify storefront/cart integration with empty-catalog fallback.
- [x] WhatsApp and Instagram contact activation.
- [x] GitHub private repository export.

- [ ] Memeriksa apakah konektor Vercel tersedia dan aktif pada sesi Manus.
- [ ] Memastikan repository GitHub RuangSI berisi konfigurasi deployment terbaru.
- [ ] Menjalankan atau memverifikasi deployment Vercel nyata jika konektor dan otorisasi tersedia.
