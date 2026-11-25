import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 p-4">
        <Link href="/" className="text-lg font-bold">
          PustakaKu
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <Link href="/buku" className="hover:underline">
            Daftar Buku
          </Link>
          <Link href="/buku/baru" className="hover:underline">
            Tambah Buku
          </Link>
        </div>
      </nav>
    </header>
  );
}