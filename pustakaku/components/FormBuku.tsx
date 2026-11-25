"use client";

import { useActionState } from "react";
import Link from "next/link";
import { simpanBuku, type FormState } from "@/app/buku/actions";
import { DAFTAR_KATEGORI } from "@/lib/kategori";

const awal: FormState = { sukses: false, pesan: "" };

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(simpanBuku, awal);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="judul" className="block text-sm font-medium">
          Judul *
        </label>
        <input
          id="judul"
          name="judul"
          placeholder="Judul buku"
          defaultValue={state.values?.judul}
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
        />
        {state.galat?.judul && (
          <p className="mt-1 text-sm text-red-600">{state.galat.judul}</p>
        )}
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm font-medium">
          Penulis *
        </label>
        <input
          id="penulis"
          name="penulis"
          placeholder="Nama penulis"
          defaultValue={state.values?.penulis}
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
        />
        {state.galat?.penulis && (
          <p className="mt-1 text-sm text-red-600">{state.galat.penulis}</p>
        )}
      </div>

      <div>
        <label htmlFor="kategori" className="block text-sm font-medium">
          Kategori *
        </label>
        <select
          id="kategori"
          name="kategori"
          defaultValue={state.values?.kategori ?? ""}
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
        >
          <option value="">Pilih kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        {state.galat?.kategori && (
          <p className="mt-1 text-sm text-red-600">{state.galat.kategori}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="block text-sm font-medium">
            Tahun terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            placeholder="2005"
            defaultValue={state.values?.tahun}
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
          />
          {state.galat?.tahun && (
            <p className="mt-1 text-sm text-red-600">{state.galat.tahun}</p>
          )}
        </div>

        <div>
          <label htmlFor="stok" className="block text-sm font-medium">
            Jumlah stok *
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            placeholder="5"
            defaultValue={state.values?.stok}
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
          />
          {state.galat?.stok && (
            <p className="mt-1 text-sm text-red-600">{state.galat.stok}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={3}
          placeholder="Deskripsi buku"
          defaultValue={state.values?.deskripsi}
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2"
        />
      </div>

      {state.pesan && !state.sukses && (
        <p className="text-sm text-red-600">{state.pesan}</p>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/buku"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}