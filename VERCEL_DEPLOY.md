# Deploy RuangSI ke Vercel

RuangSI menggunakan build client Vite dan Express/tRPC API. `vercel.json` mengarahkan request API ke `api/[...path].ts` dan mempertahankan client-side routing untuk halaman seperti `/pesan`.

## Environment variables

Tambahkan variable berikut pada Vercel Project Settings → Environment Variables untuk **Production, Preview, dan Development** sesuai kebutuhan:

| Variable | Kegunaan |
|---|---|
| `DATABASE_URL` | Koneksi MySQL/TiDB untuk tabel `users` dan `bookingInquiries`. |
| `JWT_SECRET` | Secret cookie/session authentication. |
| `VITE_APP_ID` | ID aplikasi Manus OAuth. |
| `OAUTH_SERVER_URL` | Base URL server OAuth Manus. |
| `VITE_OAUTH_PORTAL_URL` | Portal login OAuth yang dipakai browser. |
| `OWNER_OPEN_ID` | Identitas owner untuk role admin. |
| `OWNER_NAME` | Nama owner yang dikenali backend. |
| `BUILT_IN_FORGE_API_URL` | Base URL Forge server-side. |
| `BUILT_IN_FORGE_API_KEY` | Token Forge server-side. |
| `SHOPIFY_STORE_DOMAIN` | Domain Shopify untuk Storefront API. |
| `SHOPIFY_STOREFRONT_API_ACCESS_TOKEN` | Token Storefront API Shopify. |
| `VITE_ANALYTICS_ENDPOINT` | Opsional: endpoint analytics. |
| `VITE_ANALYTICS_WEBSITE_ID` | Opsional: website ID analytics. |

Jangan commit nilai secret ke GitHub. Salin nilai dari Secrets project Manus ke Vercel secara manual atau melalui secret manager yang Anda gunakan.

## Database

Database eksternal harus kompatibel dengan MySQL/TiDB dan dapat diakses dari Vercel. Jalankan migrasi Drizzle pada database target sebelum membuka form pemesanan publik. Tabel yang digunakan RuangSI adalah `users` dan `bookingInquiries`.

## Shopify

Store Shopify perlu diklaim melalui pengaturan integrasi project, memiliki minimal satu produk kelas dengan harga resmi, dan memiliki payment provider aktif. Tanpa tiga hal tersebut halaman `/pesan` tetap menampilkan fallback aman dan CTA WhatsApp, tetapi tidak mengaktifkan tombol checkout live.

## Build

Build command yang dipakai adalah `pnpm build`, dengan output client pada `dist/public`. API dijalankan melalui Vercel Function `api/[...path].ts`; Express tidak lagi bind port saat module di-import pada runtime Vercel.

Manus hosting bawaan tetap menjadi opsi yang paling kompatibel untuk auth, database, dan Shopify karena environment tersebut sudah disediakan oleh project. Vercel membutuhkan penyalinan environment variables dan database eksternal secara manual.
