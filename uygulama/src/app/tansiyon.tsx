
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type Olcum = {
  id: string;
  buyuk: number;
  kucuk: number;
  nabiz: number;
  tarih: string;
};

const KAYIT_ANAHTARI = "@saglik/tansiyon-v1";

export default function TansiyonEkrani() {
  const [buyuk, setBuyuk] = useState("");
  const [kucuk, setKucuk] = useState("");
  const [nabiz, setNabiz] = useState("");
  const [olcumler, setOlcumler] = useState<Olcum[]>([]);
  const [yuklendi, setYuklendi] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);

  useEffect(() => {
    async function verileriYukle() {
      try {
        const veri = await AsyncStorage.getItem(KAYIT_ANAHTARI);
        if (veri) {
          const kayitlar = JSON.parse(veri);
          if (Array.isArray(kayitlar)) {
            setOlcumler(kayitlar);
          }
        }
      } catch {
        Alert.alert("Hata", "Önceki ölçümler yüklenemedi.");
      } finally {
        setYuklendi(true);
      }
    }

    verileriYukle();
  }, []);

  async function olcumKaydet() {
    if (!yuklendi || kaydediliyor) return;

    const sistolik = Number(buyuk.trim());
    const diyastolik = Number(kucuk.trim());
    const kalpAtisi = Number(nabiz.trim());

    if (!buyuk.trim() || !kucuk.trim() || !nabiz.trim()) {
      Alert.alert("Eksik bilgi", "Lütfen üç alanı da doldur.");
      return;
    }

    if (
      !Number.isInteger(sistolik) ||
      !Number.isInteger(diyastolik) ||
      !Number.isInteger(kalpAtisi) ||
      sistolik < 1 ||
      diyastolik < 1 ||
      kalpAtisi < 1 ||
      sistolik > 300 ||
      diyastolik > 250 ||
      kalpAtisi > 250
    ) {
      Alert.alert(
        "Geçersiz değer",
        "Lütfen ölçüm cihazında gördüğün pozitif tam sayı değerlerini gir."
      );
      return;
    }

    const simdi = new Date();

    const yeniOlcum: Olcum = {
      id: `${simdi.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
      buyuk: sistolik,
      kucuk: diyastolik,
      nabiz: kalpAtisi,
      tarih: simdi.toISOString(),
    };

    const yeniListe = [yeniOlcum, ...olcumler];

    setKaydediliyor(true);
    try {
      await AsyncStorage.setItem(
        KAYIT_ANAHTARI,
        JSON.stringify(yeniListe)
      );
      setOlcumler(yeniListe);
      setBuyuk("");
      setKucuk("");
      setNabiz("");
      Keyboard.dismiss();
      Alert.alert("Kaydedildi", "Tansiyon ölçümün günlüğe eklendi.");
    } catch {
      Alert.alert("Hata", "Ölçüm kaydedilemedi. Tekrar dene.");
    } finally {
      setKaydediliyor(false);
    }
  }

  function olcumSil(id: string) {
    Alert.alert(
      "Ölçümü sil",
      "Bu ölçüm kaydını silmek istiyor musun?",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            if (kaydediliyor) return;

            setKaydediliyor(true);
            try {
              const yeniListe = olcumler.filter(
                (olcum) => olcum.id !== id
              );
              await AsyncStorage.setItem(
                KAYIT_ANAHTARI,
                JSON.stringify(yeniListe)
              );
              setOlcumler(yeniListe);
            } catch {
              Alert.alert("Hata", "Ölçüm silinemedi.");
            } finally {
              setKaydediliyor(false);
            }
          },
        },
      ]
    );
  }

  function tarihYaz(tarih: string) {
    return new Date(tarih).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <ScrollView
      style={styles.sayfa}
      contentContainerStyle={styles.icerik}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.geriButonu}
        onPress={() => router.back()}
      >
        <Text style={styles.geriYazi}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.baslik}>❤️ Tansiyon Günlüğü</Text>
      <Text style={styles.aciklama}>
        Ölçümlerini kaydet, geçmiş değerlerini takip et.
      </Text>

      <View style={styles.kart}>
        <Text style={styles.kartBaslik}>Yeni Ölçüm</Text>

        <Text style={styles.etiket}>Büyük Tansiyon (mmHg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 120"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={buyuk}
          onChangeText={setBuyuk}
          maxLength={3}
        />

        <Text style={styles.etiket}>Küçük Tansiyon (mmHg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 80"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={kucuk}
          onChangeText={setKucuk}
          maxLength={3}
        />

        <Text style={styles.etiket}>Nabız (atım/dk)</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 75"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={nabiz}
          onChangeText={setNabiz}
          maxLength={3}
        />

        <TouchableOpacity
          style={[
            styles.kaydetButonu,
            (!yuklendi || kaydediliyor) && styles.pasifButon,
          ]}
          onPress={olcumKaydet}
          disabled={!yuklendi || kaydediliyor}
        >
          <Text style={styles.kaydetYazi}>
            {kaydediliyor ? "Kaydediliyor..." : "Ölçümü Kaydet"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bolumBaslik}>
        Geçmiş Ölçümler ({olcumler.length})
      </Text>

      {!yuklendi ? (
        <Text style={styles.bosMetin}>Kayıtlar yükleniyor...</Text>
      ) : olcumler.length === 0 ? (
        <View style={styles.bosKart}>
          <Text style={styles.bosIkon}>📋</Text>
          <Text style={styles.bosMetin}>
            Henüz ölçüm kaydı bulunmuyor.
          </Text>
        </View>
      ) : (
        olcumler.map((olcum) => (
          <View key={olcum.id} style={styles.olcumKart}>
            <View style={styles.olcumUst}>
              <Text style={styles.tarih}>{tarihYaz(olcum.tarih)}</Text>
              <TouchableOpacity
                onPress={() => olcumSil(olcum.id)}
                disabled={kaydediliyor}
              >
                <Text style={styles.silYazi}>Sil</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.degerSatiri}>
              <View style={styles.degerKutu}>
                <Text style={styles.deger}>{olcum.buyuk}</Text>
                <Text style={styles.degerEtiket}>Büyük</Text>
              </View>

              <Text style={styles.ayrac}>/</Text>

              <View style={styles.degerKutu}>
                <Text style={styles.deger}>{olcum.kucuk}</Text>
                <Text style={styles.degerEtiket}>Küçük</Text>
              </View>

              <View style={styles.nabizKutu}>
                <Text style={styles.nabizDeger}>♥ {olcum.nabiz}</Text>
                <Text style={styles.degerEtiket}>Nabız</Text>
              </View>
            </View>
          </View>
        ))
      )}

      <View style={styles.uyari}>
        <Text style={styles.uyariMetni}>
          Bu ekran yalnızca ölçüm kaydı tutmak içindir.
          Tıbbi değerlendirme veya teşhis yapmaz.
          Ölçümlerinle ilgili endişen varsa bir sağlık
          uzmanına başvur. Şiddetli göğüs ağrısı, nefes
          darlığı veya felç belirtilerinde acil yardım iste.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sayfa: {
    flex: 1,
    backgroundColor: "#F6F9FC",
  },
  icerik: {
    padding: 20,
    paddingTop: 58,
    paddingBottom: 50,
  },
  geriButonu: {
    marginBottom: 18,
  },
  geriYazi: {
    fontSize: 16,
    fontWeight: "700",
    color: "#087E80",
  },
  baslik: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 8,
  },
  aciklama: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 24,
    lineHeight: 22,
  },
  kart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  kartBaslik: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 18,
  },
  etiket: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 17,
    color: "#172B4D",
    marginBottom: 18,
  },
  kaydetButonu: {
    backgroundColor: "#087E80",
    paddingVertical: 16,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },
  pasifButon: {
    opacity: 0.5,
  },
  kaydetYazi: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  bolumBaslik: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 14,
  },
  bosKart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  bosIkon: {
    fontSize: 32,
    marginBottom: 12,
  },
  bosMetin: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  olcumKart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  olcumUst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tarih: {
    fontSize: 13,
    color: "#64748B",
  },
  silYazi: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },
  degerSatiri: {
    flexDirection: "row",
    alignItems: "center",
  },
  degerKutu: {
    alignItems: "center",
    minWidth: 68,
  },
  deger: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172B4D",
  },
  degerEtiket: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  ayrac: {
    fontSize: 23,
    color: "#94A3B8",
    marginHorizontal: 5,
  },
  nabizKutu: {
    alignItems: "center",
    marginLeft: "auto",
    backgroundColor: "#FFF1F2",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  nabizDeger: {
    fontSize: 20,
    fontWeight: "800",
    color: "#E11D48",
  },
  uyari: {
    backgroundColor: "#E4F6F2",
    borderRadius: 14,
    padding: 16,
    marginTop: 22,
  },
  uyariMetni: {
    color: "#335B60",
    fontSize: 13,
    lineHeight: 20,
  },
});
