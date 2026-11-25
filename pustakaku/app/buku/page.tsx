import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pastikanSeed } from "@/lib/seed";

async function TabelBuku({ cari }: { cari?: string }) {
  await pastikanSeed(); // isi data awal kalau tabel masih kosong

  const daftar = await prisma.buku.findMany({
    where: cari
      ? {
          OR: [
            { judul: { contains: cari } },
            { penulis: { contains: cari } },
          ],
        }
      : undefined,
    orderBy: { id: "asc" },
  });

  if (daftar.length === 0) {
    return <p className="mt-6 text-gray-500">Buku tidak ditemukan.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Penulis</th>
            <th className="p-3">Kategori</th>
            <th className="p-3">Stok</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {daftar.map((b, i) => (
            <tr key={b.id}>
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium">{b.judul}</td>
              <td className="p-3">{b.penulis}</td>
              <td className="p-3">{b.kategori}</td>
              <td className="p-3">
                <span
                  className={
                    b.stokTersedia === 0
                      ? "rounded bg-red-100 px-2 py-0.5 text-red-700"
                      : ""
                  }
                >
                  {b.stokTersedia}/{b.stokTotal}
                </span>
              </td>
              <td className="p-3">
                <Link
                  href={`/buku/${b.id}`}
                  className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function PencarianBuku({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const { cari: nilaiCari } = await searchParams;
  const cari = Array.isArray(nilaiCari) ? nilaiCari[0] : nilaiCari;

  return (
    <>
      <form action="/buku" method="get" className="mt-4 flex gap-2">
        <input
          name="cari"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className="w-full rounded border border-gray-300 bg-white p-2"
        />
        <button className="rounded bg-gray-900 px-4 text-white">Cari</button>
      </form>
      <Suspense
        key={cari}
        fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}
      >
        <TabelBuku cari={cari?.trim()} />
      </Suspense>
    </>
  );
}

export default function DaftarBukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Daftar buku</h1>
        <Link
          href="/buku/baru"
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          + Tambah buku
        </Link>
      </div>
      <Suspense fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}>
        <PencarianBuku searchParams={searchParams} />
      </Suspense>
    </main>
  );
}