import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl p-6 text-center">
      <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-gray-600">
        Buku atau halaman yang kamu cari tidak ada.
      </p>
      <Link
        href="/buku"
        className="mt-6 inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
      >
        Kembali ke daftar buku
      </Link>
    </main>
  );
}