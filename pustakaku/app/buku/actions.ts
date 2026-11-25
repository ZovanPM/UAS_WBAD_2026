"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DAFTAR_KATEGORI } from "@/lib/kategori";

export type FormState = {
  sukses: boolean;
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function simpanBuku(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Ambil data dari form
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahun = String(formData.get("tahun") ?? "").trim();
  const stok = String(formData.get("stok") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const values = { judul, penulis, kategori, tahun, stok, deskripsi };

  // 2. Validasi di server
  const galat: NonNullable<FormState["galat"]> = {};
  const tahunIni = new Date().getFullYear();

  if (!judul) galat.judul = "Judul wajib diisi";
  if (!penulis) galat.penulis = "Penulis wajib diisi";
  if (!DAFTAR_KATEGORI.includes(kategori)) galat.kategori = "Kategori wajib dipilih";

  if (tahun) {
    const t = Number(tahun);
    if (!Number.isInteger(t) || t < 1000 || t > tahunIni) {
      galat.tahun = `Tahun harus antara 1000 dan ${tahunIni}`;
    }
  }

  const jumlah = Number(stok);
  if (!stok) {
    galat.stok = "Jumlah stok wajib diisi";
  } else if (!Number.isInteger(jumlah) || jumlah < 1) {
    galat.stok = "Jumlah stok minimal 1";
  }

  if (Object.keys(galat).length > 0) {
    return { sukses: false, pesan: "Periksa kembali isian Anda.", galat, values };
  }

  // 3. Simpan ke database
  let baru: { id: number };
  try {
    baru = await prisma.buku.create({
      data: {
        judul,
        penulis,
        kategori,
        tahun: tahun ? Number(tahun) : null,
        stokTotal: jumlah,
        stokTersedia: jumlah, // buku baru: semua stok tersedia
        deskripsi: deskripsi || null,
      },
    });
  } catch {
    return { sukses: false, pesan: "Terjadi kesalahan di server.", values };
  }

  // 4. Segarkan daftar lalu pindah ke halaman detail (di luar try/catch)
  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`);
}