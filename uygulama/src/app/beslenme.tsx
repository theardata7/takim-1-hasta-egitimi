
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { aramaTerimleriOlustur } from "../data/turkce-arama";
import yemekVeritabani from "../data/yemek-veritabani.json";

type Yemek = {
  id: string;
  ad: string;
  kalori: number;
  protein: number;
  karbonhidrat: number;
  yag: number;
};

type Ogun = {
  id: string;
  ad: string;
  gram: number;
  kalori: number;
  protein: number;
  karbonhidrat: number;
  yag: number;
};

const yemekler = yemekVeritabani as Yemek[];

const GUNLUK_HEDEF = 2200;

const sayi = (deger: number) => Math.round(deger * 10) / 10;

export default function BeslenmeEkrani() {
  const [arama, setArama] = useState("");
  const [seciliYemek, setSeciliYemek] = useState<Yemek | null>(null);
  const [gram, setGram] = useState("100");
  const [ogunler, setOgunler] = useState<Ogun[]>([]);

 
const sonuclar = useMemo(() => {
  const sorgu = arama.trim();

  if (sorgu.length < 2 || seciliYemek) {
    return [];
  }

  const terimler = aramaTerimleriOlustur(sorgu);

  return yemekler
    .filter((yemek) => {
      const ad = yemek.ad.toLocaleLowerCase("tr-TR");

      return terimler.some((terim) =>
        ad.includes(terim)
      );
    })
    .slice(0, 30);
}, [arama, seciliYemek]);

  const miktar = Number(gram.replace(",", "."));

  const hesap = useMemo(() => {
    if (
      !seciliYemek ||
      !Number.isFinite(miktar) ||
      miktar <= 0 ||
      miktar > 5000
    ) {
      return null;
    }

    const carpan = miktar / 100;

    return {
      kalori: sayi(seciliYemek.kalori * carpan),
      protein: sayi(seciliYemek.protein * carpan),
      karbonhidrat: sayi(seciliYemek.karbonhidrat * carpan),
      yag: sayi(seciliYemek.yag * carpan),
    };
  }, [seciliYemek, miktar]);

  const toplam = useMemo(
    () =>
      ogunler.reduce(
        (t, o) => ({
          kalori: t.kalori + o.kalori,
          protein: t.protein + o.protein,
          karbonhidrat: t.karbonhidrat + o.karbonhidrat,
          yag: t.yag + o.yag,
        }),
        { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 }
      ),
    [ogunler]
  );

  function yemekSec(yemek: Yemek) {
    setSeciliYemek(yemek);
    setArama(yemek.ad);
    setGram("100");
    Keyboard.dismiss();
  }

  function temizle() {
    setSeciliYemek(null);
    setArama("");
    setGram("100");
  }

  function ogunEkle() {
    if (!seciliYemek || !hesap) return;

    setOgunler((onceki) => [
      ...onceki,
      {
        id: `${Date.now()}-${Math.random()}`,
        ad: seciliYemek.ad,
        gram: miktar,
        ...hesap,
      },
    ]);

    temizle();
  }

  const kalan = Math.max(
    0,
    GUNLUK_HEDEF - toplam.kalori
  );

  const ilerleme = Math.min(
    100,
    (toplam.kalori / GUNLUK_HEDEF) * 100
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()}>
          <Text style={styles.geri}>← Geri</Text>
        </Pressable>

        <Text style={styles.baslik}>🥗 Akıllı Beslenme</Text>
        <Text style={styles.altBaslik}>
          Yemeğini bul, gramını yaz, gerisini bize bırak.
        </Text>

        <View style={styles.kart}>
          <Text style={styles.kucuk}>BUGÜNKÜ KALORİN</Text>
          <Text style={styles.buyuk}>
            {Math.round(toplam.kalori)}
            <Text style={styles.birim}> / {GUNLUK_HEDEF} kcal</Text>
          </Text>

          <View style={styles.cubuk}>
            <View
              style={[
                styles.doluluk,
                { width: `${ilerleme}%` },
              ]}
            />
          </View>

          <Text style={styles.kalan}>
            {Math.round(kalan)} kcal kaldı
          </Text>

          <View style={styles.makrolar}>
            <Text style={styles.makro}>
              Protein{"\n"}{sayi(toplam.protein)} g
            </Text>
            <Text style={styles.makro}>
              Karbonhidrat{"\n"}{sayi(toplam.karbonhidrat)} g
            </Text>
            <Text style={styles.makro}>
              Yağ{"\n"}{sayi(toplam.yag)} g
            </Text>
          </View>
        </View>

        <Text style={styles.bolum}>🔍 Ne yedin?</Text>

        <TextInput
          style={styles.input}
          placeholder="Örn: beef, chicken, rice..."
          placeholderTextColor="#94A3B8"
          value={arama}
          onChangeText={(metin) => {
            setArama(metin);
            setSeciliYemek(null);
          }}
        />

        {!seciliYemek && arama.trim().length >= 2 && (
          <View style={styles.sonucKutusu}>
            <Text style={styles.sonucBaslik}>
              {sonuclar.length > 0
                ? "Eşleşen yemekler"
                : "Yemek bulunamadı"}
            </Text>

            {sonuclar.map((yemek) => (
              <Pressable
                key={yemek.id}
                style={styles.sonuc}
                onPress={() => yemekSec(yemek)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.yemekAdi}>
                    {yemek.ad}
                  </Text>
                  <Text style={styles.yemekKalori}>
                    100 g · {yemek.kalori} kcal
                  </Text>
                </View>
                <Text style={styles.arti}>＋</Text>
              </Pressable>
            ))}
          </View>
        )}

        {seciliYemek && (
          <View style={styles.kart}>
            <Text style={styles.secimBaslik}>
              {seciliYemek.ad}
            </Text>

            <Pressable onPress={temizle}>
              <Text style={styles.degistir}>
                Başka yemek seç
              </Text>
            </Pressable>

            <Text style={styles.etiket}>
              Kaç gram yedin?
            </Text>

            <TextInput
              style={styles.input}
              value={gram}
              onChangeText={setGram}
              keyboardType="decimal-pad"
              placeholder="Örn: 200"
            />

            {hesap && (
              <View style={styles.hesapKutusu}>
                <Text style={styles.hesapKalori}>
                  {hesap.kalori} kcal
                </Text>

                <Text style={styles.hesapMakro}>
                  Protein: {hesap.protein} g
                </Text>
                <Text style={styles.hesapMakro}>
                  Karbonhidrat: {hesap.karbonhidrat} g
                </Text>
                <Text style={styles.hesapMakro}>
                  Yağ: {hesap.yag} g
                </Text>
              </View>
            )}

            <Pressable
              style={[
                styles.buton,
                !hesap && { opacity: 0.5 },
              ]}
              disabled={!hesap}
              onPress={ogunEkle}
            >
              <Text style={styles.butonYazi}>
                + Günlüğüme Ekle
              </Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.bolum}>
          📋 Bugünkü Öğünlerim
        </Text>

        {ogunler.length === 0 ? (
          <View style={styles.bos}>
            <Text style={styles.bosYazi}>
              Henüz yemek eklemedin.
            </Text>
          </View>
        ) : (
          ogunler.map((ogun) => (
            <View key={ogun.id} style={styles.ogun}>
              <View style={{ flex: 1 }}>
                <Text style={styles.yemekAdi}>
                  {ogun.ad}
                </Text>
                <Text style={styles.yemekKalori}>
                  {ogun.gram} g · {ogun.kalori} kcal
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  setOgunler((liste) =>
                    liste.filter((o) => o.id !== ogun.id)
                  )
                }
              >
                <Text style={styles.sil}>Sil</Text>
              </Pressable>
            </View>
          ))
        )}

        <Text style={styles.uyari}>
          Besin değerleri USDA verilerinden alınan
          yaklaşık değerlerdir. Tarif ve pişirme
          yöntemine göre değişebilir. Günlük 2200 kcal
          hedefi örnektir. Kayıtlar henüz uygulama
          kapatıldığında saklanmaz. Bu uygulama tanı
          veya tedavi önermez.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F8FA",
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  geri: {
    color: "#087E80",
    fontWeight: "700",
    marginBottom: 20,
  },
  baslik: {
    fontSize: 28,
    fontWeight: "900",
    color: "#123047",
  },
  altBaslik: {
    color: "#64748B",
    marginTop: 8,
    marginBottom: 24,
  },
  kart: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
  },
  kucuk: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "800",
  },
  buyuk: {
    fontSize: 34,
    fontWeight: "900",
    color: "#123047",
    marginVertical: 12,
  },
  birim: {
    fontSize: 15,
    color: "#94A3B8",
  },
  cubuk: {
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    overflow: "hidden",
  },
  doluluk: {
    height: "100%",
    backgroundColor: "#087E80",
    borderRadius: 20,
  },
  kalan: {
    marginTop: 10,
    color: "#087E80",
    fontWeight: "700",
  },
  makrolar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  makro: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 22,
  },
  bolum: {
    fontSize: 19,
    fontWeight: "900",
    color: "#123047",
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE6EA",
    borderRadius: 15,
    padding: 16,
    fontSize: 16,
    color: "#123047",
    marginBottom: 12,
  },
  sonucKutusu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 20,
    padding: 12,
  },
  sonucBaslik: {
    color: "#64748B",
    fontWeight: "700",
    marginBottom: 10,
  },
  sonuc: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F4",
    flexDirection: "row",
    alignItems: "center",
  },
  yemekAdi: {
    color: "#123047",
    fontWeight: "700",
    fontSize: 14,
  },
  yemekKalori: {
    color: "#64748B",
    marginTop: 5,
    fontSize: 12,
  },
  arti: {
    color: "#087E80",
    fontSize: 25,
  },
  secimBaslik: {
    fontSize: 18,
    fontWeight: "900",
    color: "#123047",
  },
  degistir: {
    color: "#087E80",
    marginTop: 8,
    marginBottom: 20,
  },
  etiket: {
    fontWeight: "700",
    color: "#123047",
    marginBottom: 10,
  },
  hesapKutusu: {
    backgroundColor: "#F0F9F8",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
  },
  hesapKalori: {
    fontSize: 28,
    fontWeight: "900",
    color: "#087E80",
    marginBottom: 10,
  },
  hesapMakro: {
    color: "#475569",
    marginTop: 5,
  },
  buton: {
    backgroundColor: "#087E80",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  butonYazi: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  bos: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 18,
    marginBottom: 20,
  },
  bosYazi: {
    textAlign: "center",
    color: "#94A3B8",
  },
  ogun: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sil: {
    color: "#DC2626",
    fontWeight: "800",
    marginLeft: 12,
  },
  uyari: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 20,
  },
});
