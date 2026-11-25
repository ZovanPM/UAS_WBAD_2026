import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Selamat datang di PustakaKu</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          PustakaKu adalah aplikasi web sederhana untuk mencatat koleksi buku
          perpustakaan SMA. Pencatatan manual diganti dengan data yang tersimpan
          rapi di database, sehingga petugas bisa mencari buku dan memantau stok
          dengan cepat.
        </p>
        <Link
          href="/buku"
          className="mt-6 inline-block rounded bg-gray-900 px-6 py-3 text-white hover:bg-gray-700"
        >
          Lihat Daftar Buku
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Cari Buku</h2>
          <p className="mt-1 text-sm text-gray-600">
            Temukan buku berdasarkan judul atau nama penulis.
          </p>
        </div>
        <div className="rounded border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Pantau Stok</h2>
          <p className="mt-1 text-sm text-gray-600">
            Stok yang habis langsung ditandai merah di daftar.
          </p>
        </div>
        <div className="rounded border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Tambah Koleksi</h2>
          <p className="mt-1 text-sm text-gray-600">
            Masukkan buku baru lewat formulir sederhana.
          </p>
        </div>
      </section>
    </main>
  );
}