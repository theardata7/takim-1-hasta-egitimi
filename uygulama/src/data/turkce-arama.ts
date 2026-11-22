
export const aramaSozlugu: Record<string, string[]> = {
  et: [
    "beef",
    "veal",
    "lamb",
    "meat",
    "steak",
  ],
  "et sote": [
    "beef stir fry",
    "beef with vegetables",
    "beef saute",
  ],
  kabak: [
    "zucchini",
    "summer squash",
    "squash",
  ],
  "kabak yemeği": [
    "zucchini cooked",
    "squash cooked",
  ],
  tavuk: [
    "chicken",
  ],
  pilav: [
    "rice",
    "pilaf",
  ],
  makarna: [
    "pasta",
    "spaghetti",
    "macaroni",
  ],
  patates: [
    "potato",
  ],
  yumurta: [
    "egg",
  ],
  peynir: [
    "cheese",
  ],
  süt: [
    "milk",
  ],
  yoğurt: [
    "yogurt",
  ],
  balık: [
    "fish",
    "salmon",
    "tuna",
  ],
  mercimek: [
    "lentil",
  ],
  fasulye: [
    "bean",
  ],
  nohut: [
    "chickpea",
    "garbanzo",
  ],
  ekmek: [
    "bread",
  ],
  elma: [
    "apple",
  ],
  muz: [
    "banana",
  ],
  domates: [
    "tomato",
  ],
  salatalık: [
    "cucumber",
  ],
  havuç: [
    "carrot",
  ],
  ıspanak: [
    "spinach",
  ],
  brokoli: [
    "broccoli",
  ],
  çorba: [
    "soup",
  ],
  köfte: [
    "meatball",
  ],
  döner: [
    "kebab",
    "gyro",
  ],
};

function normalleştir(metin: string) {
  return metin
    .toLocaleLowerCase("tr-TR")
    .trim();
}

export function aramaTerimleriOlustur(
  arama: string
): string[] {
  const sorgu = normalleştir(arama);

  if (!sorgu) return [];

  const terimler = new Set<string>([sorgu]);

  for (const [turkce, ingilizceler] of Object.entries(
    aramaSozlugu
  )) {
    if (
      sorgu === turkce ||
      turkce.startsWith(sorgu)
    ) {
      ingilizceler.forEach((kelime) =>
        terimler.add(kelime.toLowerCase())
      );
    }
  }

  return [...terimler];
}
