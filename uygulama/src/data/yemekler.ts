
export type Yemek = {
  id: string;
  ad: string;
  kategori: string;
  kalori: number;
  protein: number;
  karbonhidrat: number;
  yag: number;
};

// Bütün değerler 100 gram içindir.
// İlk sürüm için yaklaşık referans değerlerdir.
// Marka, tarif ve pişirme yöntemine göre değişebilir.

export const yemekler: Yemek[] = [
  {
    id: "tavuk-gogsu",
    ad: "Tavuk Göğsü (Pişmiş)",
    kategori: "Et ve Protein",
    kalori: 165,
    protein: 31,
    karbonhidrat: 0,
    yag: 3.6,
  },
  {
    id: "pirinc",
    ad: "Beyaz Pirinç (Pişmiş)",
    kategori: "Tahıllar",
    kalori: 130,
    protein: 2.7,
    karbonhidrat: 28.2,
    yag: 0.3,
  },
  {
    id: "yumurta",
    ad: "Haşlanmış Yumurta",
    kategori: "Kahvaltılık",
    kalori: 155,
    protein: 12.6,
    karbonhidrat: 1.1,
    yag: 10.6,
  },
  {
    id: "muz",
    ad: "Muz",
    kategori: "Meyveler",
    kalori: 89,
    protein: 1.1,
    karbonhidrat: 22.8,
    yag: 0.3,
  },
  {
    id: "mercimek",
    ad: "Mercimek (Pişmiş)",
    kategori: "Baklagiller",
    kalori: 116,
    protein: 9,
    karbonhidrat: 20.1,
    yag: 0.4,
  },
  {
    id: "yogurt",
    ad: "Yoğurt (Sade)",
    kategori: "Süt Ürünleri",
    kalori: 61,
    protein: 3.5,
    karbonhidrat: 4.7,
    yag: 3.3,
  },
  {
    id: "yulaf",
    ad: "Yulaf Ezmesi (Kuru)",
    kategori: "Tahıllar",
    kalori: 389,
    protein: 16.9,
    karbonhidrat: 66.3,
    yag: 6.9,
  },
  {
    id: "elma",
    ad: "Elma",
    kategori: "Meyveler",
    kalori: 52,
    protein: 0.3,
    karbonhidrat: 13.8,
    yag: 0.2,
  },
  {
    id: "patates",
    ad: "Patates (Haşlanmış)",
    kategori: "Sebzeler",
    kalori: 87,
    protein: 1.9,
    karbonhidrat: 20.1,
    yag: 0.1,
  },
  {
    id: "badem",
    ad: "Badem",
    kategori: "Kuruyemişler",
    kalori: 579,
    protein: 21.2,
    karbonhidrat: 21.6,
    yag: 49.9,
  },
];