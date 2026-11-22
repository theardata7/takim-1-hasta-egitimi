
require("dotenv").config();

const express = require("express");
const Groq = require("groq-sdk");

const app = express();
const PORT = 3002;

app.use(express.json({ limit: "50kb" }));

if (!process.env.GROQ_API_KEY) {
  console.error("HATA: GROQ_API_KEY bulunamadi!");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SISTEM_TALIMATI = `
Sen Turkce konusan bir saglik bilgi asistanisin.

Gorevin kullanicilara genel saglik egitimi sunmaktir.

Kurallar:
- Her zaman anlasilir Turkce kullan.
- Hastalik tanisi koyma.
- Kisiye ozel tedavi veya ilac dozu onerme.
- Belirsiz bilgileri kesinmis gibi sunma.
- Gerektiginde saglik profesyoneline yonlendir.
- Acil belirtilerde 112'ye basvurulmasini oner.
- Kullaniciya gereksiz korku verme.
- Sorulara duzenli, nazik ve acik yanitlar ver.
- Kendini doktor olarak tanitma.
`;

app.get("/api/durum", (req, res) => {
  res.json({
    basarili: true,
    mesaj: "Groq saglik asistani calisiyor!",
    model: "openai/gpt-oss-120b",
  });
});

app.post("/api/sor", async (req, res) => {
  try {
    const { mesaj, gecmis = [] } = req.body || {};

    if (
      typeof mesaj !== "string" ||
      !mesaj.trim() ||
      mesaj.length > 2000
    ) {
      return res.status(400).json({
        basarili: false,
        hata: "Gecerli bir soru gondermelisin.",
      });
    }

    const temizGecmis = Array.isArray(gecmis)
      ? gecmis
          .slice(-10)
          .filter(
            (m) =>
              m &&
              (m.rol === "kullanici" ||
                m.rol === "asistan") &&
              typeof m.metin === "string" &&
              m.metin.length <= 2000
          )
          .map((m) => ({
            role:
              m.rol === "kullanici"
                ? "user"
                : "assistant",
            content: m.metin,
          }))
      : [];

    const yanit = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: SISTEM_TALIMATI,
        },
        ...temizGecmis,
        {
          role: "user",
          content: mesaj.trim(),
        },
      ],
      max_completion_tokens: 1500,
      temperature: 0.4,
    });

    const cevap = yanit.choices?.[0]?.message?.content;

    if (!cevap) {
      return res.status(502).json({
        basarili: false,
        hata: "Yapay zeka bos yanit dondurdu.",
      });
    }

    res.json({
      basarili: true,
      cevap,
    });
  } catch (hata) {
    console.error(
      "Groq hatasi:",
      hata.status || "",
      hata.message
    );

    const durum = hata.status === 429 ? 429 : 502;

    res.status(durum).json({
      basarili: false,
      hata:
        durum === 429
          ? "Ucretsiz API kullanim sinirina ulasildi. Biraz sonra tekrar dene."
          : "Yapay zeka yaniti alinamadi. Lutfen tekrar dene.",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("================================");
  console.log(" GROQ SAGLIK ASISTANI CALISIYOR!");
  console.log("================================");
  console.log(`Adres: http://localhost:${PORT}`);
  console.log("Model: openai/gpt-oss-120b");
  console.log("================================");
});
