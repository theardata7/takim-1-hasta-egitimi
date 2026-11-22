
const fs = require("fs");
const path = require("path");

const dosya = path.join(
  __dirname,
  "src",
  "data",
  "surveyDownload.json"
);

if (!fs.existsSync(dosya)) {
  console.error("JSON dosyası bulunamadı:", dosya);
  process.exit(1);
}

console.log("JSON okunuyor...");

const veri = JSON.parse(
  fs.readFileSync(dosya, "utf8")
);

console.log("\nAna alanlar:");
console.log(Object.keys(veri));

for (const [anahtar, deger] of Object.entries(veri)) {
  if (Array.isArray(deger)) {
    console.log(
      `\n${anahtar}: ${deger.length} kayıt`
    );

    if (deger.length > 0) {
      console.log(
        "İlk kaydın alanları:",
        Object.keys(deger[0])
      );

      console.log(
        "İlk kayıt örneği:",
        JSON.stringify(deger[0], null, 2).slice(0, 2500)
      );
    }
  }
}
