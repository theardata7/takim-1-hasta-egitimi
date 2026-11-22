
const fs = require("fs");
const path = require("path");

const kaynak = path.join(
  __dirname,
  "src",
  "data",
  "yemek-veritabani.json"
);

const hedef = path.join(
  __dirname,
  "src",
  "data",
  "yemek-ceviri-test.json"
);

const yemekler = JSON.parse(
  fs.readFileSync(kaynak, "utf8")
);

async function cevir(metin) {
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx&sl=en&tl=tr&dt=t&q=" +
    encodeURIComponent(metin);

  const cevap = await fetch(url);

  if (!cevap.ok) {
    throw new Error("HTTP " + cevap.status);
  }

  const veri = await cevap.json();

  const sonuc = veri[0]
    .map((parca) => parca[0])
    .join("")
    .trim();

  if (!sonuc) {
    throw new Error("Bos ceviri");
  }

  return sonuc;
}

async function baslat() {
  const secilenler = yemekler.slice(0, 10);
  const cevrilenler = [];

  for (const yemek of secilenler) {
    try {
      const turkce = await cevir(yemek.ad);

      cevrilenler.push({
        ...yemek,
        orijinalAd: yemek.ad,
        ad: turkce,
      });

      console.log(yemek.ad, "=>", turkce);
    } catch (hata) {
      console.error(
        "CEVIRI HATASI:",
        yemek.ad,
        hata.message
      );

      // Hatalı kaydı Türkçe diye kaydetme.
      cevrilenler.push({
        ...yemek,
        orijinalAd: yemek.ad,
        ceviriDurumu: "basarisiz",
      });
    }
  }

  fs.writeFileSync(
    hedef,
    JSON.stringify(cevrilenler, null, 2),
    "utf8"
  );

  console.log("\nTEST TAMAMLANDI");
  console.log("Dosya:", hedef);
}

baslat().catch(console.error);
