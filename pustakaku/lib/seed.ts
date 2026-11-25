import { prisma } from "@/lib/prisma";

const dataAwal = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Novel", tahun: 2005, stokTotal: 5, stokTersedia: 3, deskripsi: "Kisah sepuluh anak di Belitung yang berjuang bersekolah." },
  { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Novel", tahun: 1980, stokTotal: 2, stokTersedia: 0, deskripsi: "Kisah Minke pada masa kolonial." },
  { judul: "Fisika Dasar", penulis: "Halliday", kategori: "Sains", tahun: 2010, stokTotal: 2, stokTersedia: 2, deskripsi: null },
  { judul: "Sejarah Indonesia Modern", penulis: "M.C. Ricklefs", kategori: "Sejarah", tahun: 2008, stokTotal: 4, stokTersedia: 1, deskripsi: "Ringkasan sejarah Indonesia sejak 1200." },
  { judul: "Kamus Besar Bahasa Indonesia", penulis: "Tim Penyusun", kategori: "Referensi", tahun: null, stokTotal: 3, stokTersedia: 0, deskripsi: null },
];

export async function pastikanSeed() {
  const ada = await prisma.buku.findMany({ take: 1 });
  if (ada.length > 0) return;

  for (const b of dataAwal) {
    await prisma.buku.create({ data: b });
  }
}