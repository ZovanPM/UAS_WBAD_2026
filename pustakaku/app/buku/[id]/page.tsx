import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { pastikanSeed } from "@/lib/seed";

async function DataBuku({ params }: { params: Promise<{ id: string }> }) {
  // 1. Baca parameter dari URL
  const { id } = await params;

  // 2. Parameter selalu string, ubah ke angka dan validasi
  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  // 3. Ambil satu buku dari database
  await pastikanSeed();
  const b = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!b) notFound();

  return (
    <div className="mt-4 flex flex-col gap-6 rounded border border-gray-200 bg-white p-6 sm:flex-row">
      <div className="flex h-48 w-full shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500 sm:w-36">
        Sampul
      </div>

      <div>
        <h1 className="text-2xl font-bold">{b.judul}</h1>
        <p className="mt-2 text-sm text-gray-700">Penulis: {b.penulis}</p>
        <p className="text-sm text-gray-700">
          Kategori: {b.kategori} · Tahun: {b.tahun ?? "-"}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Stok:{" "}
          <span
            className={`rounded px-2 py-0.5 text-xs ${
              b.stokTersedia === 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-800"
            }`}
          >
            {b.stokTersedia} dari {b.stokTotal} tersedia
          </span>
        </p>
        <p className="mt-4 text-sm text-gray-600">
          {b.deskripsi ?? "Belum ada deskripsi."}
        </p>
      </div>
    </div>
  );
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/buku" className="text-sm text-blue-600 underline">
        &larr; Kembali ke daftar
      </Link>
      <Suspense fallback={<p className="mt-4 text-gray-500">Memuat data...</p>}>
        <DataBuku params={params} />
      </Suspense>
    </main>
  );
}