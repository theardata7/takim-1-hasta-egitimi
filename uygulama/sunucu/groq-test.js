
require("dotenv").config();

const Groq = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
  console.error("HATA: GROQ_API_KEY bulunamadi!");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function testEt() {
  try {
    console.log("Groq baglantisi test ediliyor...");

    const yanit = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "Sen Turkce konusan bir saglik bilgi asistanisin. " +
            "Genel bilgi ver, tani veya tedavi onerme.",
        },
        {
          role: "user",
          content:
            "Merhaba! Kendini bir cumleyle tanitir misin?",
        },
      ],
      max_completion_tokens: 200,
    });

    console.log(
      "\nGROQ CEVABI:\n",
      yanit.choices[0]?.message?.content
    );
  } catch (hata) {
    console.error(
      "GROQ HATASI:",
      hata.status || "",
      hata.message
    );
  }
}

testEt();
