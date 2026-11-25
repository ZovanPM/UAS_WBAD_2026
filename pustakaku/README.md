# PustakaKu

Aplikasi web sederhana untuk mencatat koleksi buku perpustakaan SMA, pengganti pencatatan manual.
Dibuat untuk UAS Web Application Development, Semester Ganjil 2026-1.

**Nama:** Zovan Christiano Efendi  
**NIM:** 23502510009

## Teknologi

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma 6 + SQLite
- Server Action untuk form tambah buku

## Fitur

- Landing page berisi penjelasan aplikasi dan tombol ke daftar buku
- Daftar buku dengan pencarian (judul atau penulis); stok bernilai 0 tampil merah
- Detail buku, dengan halaman 404 untuk buku yang tidak ada
- Form tambah buku dengan validasi di server dan redirect ke halaman detail
- Seed otomatis: 5 buku awal terisi saat tabel masih kosong

## Rute

| Halaman | Rute |
|---|---|
| Landing page | `/` |
| Daftar buku | `/buku` |
| Detail buku | `/buku/[id]` |
| Form tambah | `/buku/baru` |

## Cara menjalankan

Prasyarat: Node.js 20 atau lebih baru.

```bash
git clone <url-repo-ini>
cd <nama-folder-repo>
npm install
cp .env.example .env        # Windows CMD: copy .env.example .env
npx prisma migrate dev
npm run dev
```

Buka http://localhost:3000.

`npx prisma migrate dev` membuat file database SQLite (`prisma/dev.db`) beserta tabelnya.
Data awal terisi otomatis saat halaman `/buku` pertama kali dibuka.

## Struktur folder

```
app/
  layout.tsx          layout bersama (navbar)
  page.tsx            landing page
  not-found.tsx       halaman 404
  buku/
    page.tsx          daftar buku + pencarian
    loading.tsx       tampilan loading
    actions.ts        Server Action simpan buku
    baru/page.tsx     form tambah buku
    [id]/page.tsx     detail buku
components/
  Navbar.tsx
  FormBuku.tsx
lib/
  prisma.ts           koneksi database tunggal
  seed.ts             data awal
  kategori.ts         daftar kategori
prisma/
  schema.prisma       skema tabel Buku
```

## Skema database

Tabel `Buku`: `id`, `judul`, `penulis`, `kategori`, `tahun` (opsional), `stokTotal`,
`stokTersedia`, `deskripsi` (opsional), `createdAt`.

//