
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Mesaj = {
  id: string;
  rol: "kullanici" | "asistan";
  metin: string;
  saat: string;
};

const API_ADRESI = "http://192.168.1.115:3002/api/sor";

const ONERILER = [
  {
    emoji: "❤️",
    baslik: "Kalp Sağlığı",
    soru: "Kalp sağlığını korumak için neler yapılabilir?",
  },
  {
    emoji: "💊",
    baslik: "İlaç Bilgisi",
    soru: "İlaç kullanırken genel olarak nelere dikkat edilmeli?",
  },
  {
    emoji: "🥗",
    baslik: "Beslenme",
    soru: "Dengeli beslenmenin temel ilkeleri nelerdir?",
  },
  {
    emoji: "😴",
    baslik: "Uyku Düzeni",
    soru: "Daha kaliteli uyumak için neler yapılabilir?",
  },
];

function saatAl() {
  return new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ilkMesaj: Mesaj = {
  id: "hosgeldin",
  rol: "asistan",
  metin:
    "Merhaba! 👋 Ben sağlık bilgi asistanınım.\n\n" +
    "Sağlık konularındaki genel sorularını yanıtlamak ve " +
    "sağlık bilgilerini daha iyi anlamana yardımcı olmak için buradayım.\n\n" +
    "Bugün ne hakkında bilgi almak istersin?",
  saat: saatAl(),
};

export default function SorEkrani() {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([
    ilkMesaj,
  ]);
  const [girdi, setGirdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  }, [mesajlar, yukleniyor]);

  async function mesajGonder(hazirSoru?: string) {
    const metin = (hazirSoru ?? girdi).trim();

    if (!metin || yukleniyor) return;

    const yeniMesaj: Mesaj = {
      id: `${Date.now()}-k`,
      rol: "kullanici",
      metin,
      saat: saatAl(),
    };

    // Ilk karsilama mesajini gecmise dahil etmiyoruz.
    const gecmis = mesajlar
      .filter((mesaj) => mesaj.id !== "hosgeldin")
      .map((mesaj) => ({
        rol: mesaj.rol,
        metin: mesaj.metin,
      }));

    setMesajlar((onceki) => [...onceki, yeniMesaj]);
    setGirdi("");
    setYukleniyor(true);

    try {
      const yanit = await fetch(API_ADRESI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mesaj: metin,
          gecmis,
        }),
      });

      const veri = await yanit.json();

      if (!yanit.ok || !veri.basarili) {
        throw new Error(
          veri.hata || "Yapay zeka yaniti alinamadi."
        );
      }

      if (
        typeof veri.cevap !== "string" ||
        !veri.cevap.trim()
      ) {
        throw new Error("Yapay zeka bos cevap verdi.");
      }

      const cevap: Mesaj = {
        id: `${Date.now()}-a`,
        rol: "asistan",
        metin: veri.cevap.trim(),
        saat: saatAl(),
      };

      setMesajlar((onceki) => [...onceki, cevap]);
    } catch (hata) {
      console.error("Sor ekrani API hatasi:", hata);

      const hataMetni =
        hata instanceof Error
          ? hata.message
          : "Bilinmeyen bir hata olustu.";

      const hataMesaji: Mesaj = {
        id: `${Date.now()}-h`,
        rol: "asistan",
        metin:
          "Şu anda yanıt oluşturamadım. 💙\n\n" +
          hataMetni +
          "\n\nLütfen biraz sonra tekrar dene.",
        saat: saatAl(),
      };

      setMesajlar((onceki) => [...onceki, hataMesaji]);
    } finally {
      setYukleniyor(false);
    }
  }

  const sohbetBasladi = mesajlar.length > 1;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.ana}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.geriButon}
          >
            <Text style={styles.geriYazi}>‹</Text>
          </Pressable>

          <View style={styles.avatar}>
            <Text style={styles.avatarYazi}>✦</Text>
          </View>

          <View style={styles.headerBilgi}>
            <Text style={styles.headerBaslik}>
              Sağlık Asistanı
            </Text>

            <View style={styles.durumSatiri}>
              <View style={styles.durumNokta} />
              <Text style={styles.durumYazi}>
                Yapay zekâ aktif
              </Text>
            </View>
          </View>

          <View style={styles.aiEtiket}>
            <Text style={styles.aiEtiketYazi}>AI</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.sohbet}
          contentContainerStyle={styles.sohbetIcerik}
          keyboardShouldPersistTaps="handled"
        >
          {!sohbetBasladi && (
            <View style={styles.karsilama}>
              <View style={styles.buyukAvatar}>
                <Text style={styles.buyukAvatarYazi}>
                  ✨
                </Text>
              </View>

              <Text style={styles.karsilamaBaslik}>
                Merhaba! 👋
              </Text>

              <Text style={styles.karsilamaAciklama}>
                Sağlık hakkında merak ettiklerini sor.
                Genel sağlık bilgilerini keşfetmene
                yardımcı olalım.
              </Text>
            </View>
          )}

          {mesajlar.map((mesaj) => {
            const kullanici = mesaj.rol === "kullanici";

            return (
              <View
                key={mesaj.id}
                style={[
                  styles.mesajSatiri,
                  kullanici && styles.kullaniciSatiri,
                ]}
              >
                {!kullanici && (
                  <View style={styles.kucukAvatar}>
                    <Text style={styles.kucukAvatarYazi}>
                      ✦
                    </Text>
                  </View>
                )}

                <View
                  style={[
                    styles.mesajKutusu,
                    kullanici
                      ? styles.kullaniciMesaji
                      : styles.asistanMesaji,
                  ]}
                >
                  <Text
                    style={[
                      styles.mesajMetni,
                      kullanici && styles.kullaniciMetni,
                    ]}
                  >
                    {mesaj.metin}
                  </Text>

                  <Text
                    style={[
                      styles.saat,
                      kullanici && styles.kullaniciSaat,
                    ]}
                  >
                    {mesaj.saat}
                  </Text>
                </View>
              </View>
            );
          })}

          {!sohbetBasladi && (
            <View style={styles.oneriAlani}>
              <Text style={styles.oneriBaslik}>
                ✨ Ne hakkında konuşalım?
              </Text>

              <View style={styles.oneriGrid}>
                {ONERILER.map((oneri) => (
                  <Pressable
                    key={oneri.baslik}
                    style={styles.oneriKart}
                    onPress={() =>
                      mesajGonder(oneri.soru)
                    }
                  >
                    <Text style={styles.oneriEmoji}>
                      {oneri.emoji}
                    </Text>

                    <Text style={styles.oneriKartBaslik}>
                      {oneri.baslik}
                    </Text>

                    <Text style={styles.oneriSoru}>
                      {oneri.soru}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {yukleniyor && (
            <View style={styles.yukleniyor}>
              <ActivityIndicator color="#087E80" />
              <Text style={styles.yukleniyorYazi}>
                Yapay zekâ yanıt hazırlıyor...
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.altAlan}>
          <Text style={styles.uyari}>
            Bu uygulama tanı veya tedavi önermez.
            Acil durumlarda 112'yi arayın.
          </Text>

          <View style={styles.girdiSatiri}>
            <TextInput
              style={styles.input}
              placeholder="Sağlık hakkında bir şey sor..."
              placeholderTextColor="#94A3B8"
              value={girdi}
              onChangeText={setGirdi}
              multiline
              maxLength={2000}
            />

            <Pressable
              style={[
                styles.gonderButon,
                (!girdi.trim() || yukleniyor) &&
                  styles.pasifButon,
              ]}
              disabled={!girdi.trim() || yukleniyor}
              onPress={() => mesajGonder()}
            >
              <Text style={styles.gonderYazi}>➤</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F8FA",
  },
  ana: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF2",
  },
  geriButon: {
    width: 36,
    alignItems: "center",
  },
  geriYazi: {
    fontSize: 34,
    color: "#123047",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#087E80",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  avatarYazi: {
    color: "#FFFFFF",
    fontSize: 25,
  },
  headerBilgi: {
    flex: 1,
    marginLeft: 12,
  },
  headerBaslik: {
    color: "#123047",
    fontSize: 17,
    fontWeight: "900",
  },
  durumSatiri: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  durumNokta: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  durumYazi: {
    color: "#64748B",
    fontSize: 12,
  },
  aiEtiket: {
    backgroundColor: "#E6F5F3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  aiEtiketYazi: {
    color: "#087E80",
    fontWeight: "900",
  },
  sohbet: {
    flex: 1,
  },
  sohbetIcerik: {
    padding: 16,
    paddingBottom: 30,
  },
  karsilama: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 22,
  },
  buyukAvatar: {
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: "#E0F3F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buyukAvatarYazi: {
    fontSize: 34,
  },
  karsilamaBaslik: {
    fontSize: 27,
    fontWeight: "900",
    color: "#123047",
  },
  karsilamaAciklama: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  mesajSatiri: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  kullaniciSatiri: {
    justifyContent: "flex-end",
  },
  kucukAvatar: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "#087E80",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  kucukAvatarYazi: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  mesajKutusu: {
    maxWidth: "82%",
    padding: 15,
    borderRadius: 18,
  },
  asistanMesaji: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#EDF1F4",
  },
  kullaniciMesaji: {
    backgroundColor: "#087E80",
    borderBottomRightRadius: 5,
  },
  mesajMetni: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 22,
  },
  kullaniciMetni: {
    color: "#FFFFFF",
  },
  saat: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "right",
    marginTop: 8,
  },
  kullaniciSaat: {
    color: "#D3F0ED",
  },
  oneriAlani: {
    marginTop: 10,
  },
  oneriBaslik: {
    fontSize: 16,
    fontWeight: "900",
    color: "#123047",
    marginBottom: 14,
  },
  oneriGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  oneriKart: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8EEF2",
    minHeight: 145,
  },
  oneriEmoji: {
    fontSize: 26,
    marginBottom: 10,
  },
  oneriKartBaslik: {
    fontSize: 14,
    fontWeight: "900",
    color: "#123047",
    marginBottom: 6,
  },
  oneriSoru: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 17,
  },
  yukleniyor: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  yukleniyorYazi: {
    color: "#64748B",
    marginLeft: 10,
  },
  altAlan: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EEF2",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
  },
  uyari: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 15,
  },
  girdiSatiri: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F5F8FA",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 6,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#123047",
  },
  gonderButon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#087E80",
    alignItems: "center",
    justifyContent: "center",
  },
  pasifButon: {
    opacity: 0.45,
  },
  gonderYazi: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
  },
});
