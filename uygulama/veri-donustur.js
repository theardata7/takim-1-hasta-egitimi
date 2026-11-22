
const fs = require("fs");
const path = require("path");

const kaynak = path.join(
  __dirname,
  "src",
  "data",
  "surveyDownload.json"
);

const hedef = path.join(
  __dirname,
  "src",
  "data",
  "yemek-veritabani.json"
);

console.log("USDA yemek verileri okunuyor...");

const veri = JSON.parse(
  fs.readFileSync(kaynak, "utf8")
);

function besinDegeri(besinler, kod, birim) {
  const kayit = besinler.find(
    (item) =>
      item.nutrient?.id === kod &&
      item.nutrient?.unitName?.toLowerCase() === birim
  );

  return kayit && Number.isFinite(kayit.amount)
    ? kayit.amount
    : null;
}

function yuvarla(sayi) {
  return Math.round(sayi * 10) / 10;
}

const yemekler = [];

for (const yemek of veri.SurveyFoods) {
  const besinler = yemek.foodNutrients || [];

  const kalori = besinDegeri(besinler, 1008, "kcal");
  const protein = besinDegeri(besinler, 1003, "g");
  const karbonhidrat = besinDegeri(besinler, 1005, "g");
  const yag = besinDegeri(besinler, 1004, "g");

  // Eksik veya gecersiz besin degerlerini atla.
  if (
    [kalori, protein, karbonhidrat, yag].some(
      (deger) => deger === null || deger < 0
    )
  ) {
    continue;
  }

  if (!yemek.description?.trim()) {
    continue;
  }

  yemekler.push({
    id: String(yemek.fdcId),
    ad: yemek.description.trim(),
    kalori: yuvarla(kalori),
    protein: yuvarla(protein),
    karbonhidrat: yuvarla(karbonhidrat),
    yag: yuvarla(yag),
  });
}

fs.writeFileSync(
  hedef,
  JSON.stringify(yemekler),
  "utf8"
);

console.log("ISLEM TAMAMLANDI!");
console.log("Toplam kaynak:", veri.SurveyFoods.length);
console.log("Aktarilan yemek:", yemekler.length);
console.log("Dosya:", hedef);
console.log("Ilk 3 yemek:", yemekler.slice(0, 3));
