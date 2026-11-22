
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KAYIT_ANAHTARI = "@saglik/su-takibi-v1";
const BARDAK_ML = 250;

function bugun() {
  const tarih = new Date();
  const yil = tarih.getFullYear();
  const ay = String(tarih.getMonth() + 1).padStart(2, "0");
  const gun = String(tarih.getDate()).padStart(2, "0");
  return `${yil}-${ay}-${gun}`;
}

export default function SuTakibi() {
  const [bardak, setBardak] = useState(0);
  const [hedef, setHedef] = useState(2000);
  const [hedefGirdisi, setHedefGirdisi] = useState("2000");
  const [tarih, setTarih] = useState(bugun());
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    async function verileriYukle() {
      try {
        const kayit = await AsyncStorage.getItem(KAYIT_ANAHTARI);

        if (kayit) {
          const veri = JSON.parse(kayit);

          const kayitliHedef =
            typeof veri.hedef === "number" && veri.hedef > 0
              ? veri.hedef
              : 2000;

          setHedef(kayitliHedef);
          setHedefGirdisi(String(kayitliHedef));

          if (veri.tarih === bugun()) {
            setBardak(
              typeof veri.bardak === "number"
                ? Math.max(0, veri.bardak)
                : 0
            );
          }
        }
      } catch {
        Alert.alert("Hata", "Su takibi verileri okunamadı.");
      } finally {
        setHazir(true);
      }
    }

    verileriYukle();
  }, []);

  useEffect(() => {
    if (!hazir) return;

    AsyncStorage.setItem(
      KAYIT_ANAHTARI,
      JSON.stringify({ tarih, bardak, hedef })
    ).catch(() => {
      Alert.alert("Hata", "Su takibi kaydedilemedi.");
    });
  }, [tarih, bardak, hedef, hazir]);

  function bardakDegistir(degisim: number) {
    const simdi = bugun();
    const mevcut = tarih === simdi ? bardak : 0;

    if (tarih !== simdi) {
      setTarih(simdi);
    }

    setBardak(Math.max(0, mevcut + degisim));
  }

  function hedefKaydet() {
    const yeniHedef = Number(hedefGirdisi);

    if (
      !Number.isInteger(yeniHedef) ||
      yeniHedef < 250 ||
      yeniHedef > 10000
    ) {
      Alert.alert(
        "Geçersiz hedef",
        "250 ile 10.000 ml arasında bir hedef gir."
      );
      return;
    }

    setHedef(yeniHedef);
    Alert.alert("Kaydedildi", "Günlük hedef güncellendi.");
  }

  const bugunkuBardak = tarih === bugun() ? bardak : 0;
  const toplam = bugunkuBardak * BARDAK_ML;
  const yuzde = Math.min(100, (toplam / hedef) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.geri}>
          <Text style={styles.geriText}>‹ Geri</Text>
        </Pressable>

        <Text style={styles.baslik}>Su Takibi 💧</Text>
        <Text style={styles.aciklama}>
          Günlük su tüketimini kolayca takip et.
        </Text>

        <View style={styles.kart}>
          <Text style={styles.kartUst}>BUGÜN İÇİLEN SU</Text>

          <Text style={styles.miktar}>
            {toplam.toLocaleString("tr-TR")} ml
          </Text>

          <Text style={styles.hedef}>
            Günlük hedef: {hedef.toLocaleString("tr-TR")} ml
          </Text>

          <View style={styles.cubukArka}>
            <View
              style={[styles.cubuk, { width: `${yuzde}%` }]}
            />
          </View>

          <Text style={styles.yuzde}>
            %{Math.round(yuzde)} tamamlandı
          </Text>
        </View>

        <View style={styles.butonSatiri}>
          <Pressable
            style={[styles.buton, styles.azalt]}
            onPress={() => bardakDegistir(-1)}
            disabled={!hazir}
          >
            <Text style={styles.azaltYazi}>− 1 Bardak</Text>
          </Pressable>

          <Pressable
            style={[styles.buton, styles.ekle]}
            onPress={() => bardakDegistir(1)}
            disabled={!hazir}
          >
            <Text style={styles.ekleYazi}>+ 1 Bardak</Text>
          </Pressable>
        </View>

        <View style={styles.bilgiKarti}>
          <Text style={styles.bilgiBaslik}>Bugünkü kayıt</Text>
          <Text style={styles.bilgiDeger}>
            {bugunkuBardak} bardak
          </Text>
          <Text style={styles.bilgiAlt}>
            1 bardak = 250 ml
          </Text>
        </View>

        <View style={styles.bilgiKarti}>
          <Text style={styles.bilgiBaslik}>
            Günlük hedefini düzenle
          </Text>

          <TextInput
            style={styles.input}
            value={hedefGirdisi}
            onChangeText={setHedefGirdisi}
            keyboardType="number-pad"
            placeholder="Örneğin 2000"
          />

          <Pressable style={styles.kaydet} onPress={hedefKaydet}>
            <Text style={styles.kaydetYazi}>Hedefi Kaydet</Text>
          </Pressable>
        </View>

        <Text style={styles.uyari}>
          Bu ekran yalnızca kişisel takip amaçlıdır.
          Günlük su ihtiyacı kişiye ve sağlık durumuna göre değişir.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FC",
  },
  content: {
    padding: 22,
    paddingBottom: 45,
  },
  geri: {
    marginBottom: 24,
  },
  geriText: {
    color: "#087E80",
    fontSize: 17,
    fontWeight: "700",
  },
  baslik: {
    fontSize: 30,
    fontWeight: "900",
    color: "#172B4D",
  },
  aciklama: {
    color: "#7C8CA1",
    marginTop: 8,
    marginBottom: 24,
  },
  kart: {
    backgroundColor: "#087E80",
    padding: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  kartUst: {
    color: "#B5EAE4",
    fontSize: 12,
    fontWeight: "800",
  },
  miktar: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 15,
  },
  hedef: {
    color: "#D6F1EF",
    marginTop: 8,
  },
  cubukArka: {
    height: 12,
    backgroundColor: "#4DA8A8",
    borderRadius: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  cubuk: {
    height: "100%",
    backgroundColor: "#B5EAE4",
  },
  yuzde: {
    color: "#FFFFFF",
    marginTop: 12,
    fontWeight: "700",
  },
  butonSatiri: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  buton: {
    flex: 1,
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
  },
  azalt: {
    backgroundColor: "#E4F6F2",
  },
  ekle: {
    backgroundColor: "#087E80",
  },
  azaltYazi: {
    fontSize: 14,
    fontWeight: "800",
    color: "#087E80",
  },
  ekleYazi: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  bilgiKarti: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAF0F5",
  },
  bilgiBaslik: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 12,
  },
  bilgiDeger: {
    fontSize: 27,
    fontWeight: "900",
    color: "#087E80",
  },
  bilgiAlt: {
    color: "#7C8CA1",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDE6EC",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#172B4D",
    marginBottom: 12,
  },
  kaydet: {
    backgroundColor: "#087E80",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  kaydetYazi: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  uyari: {
    color: "#8A9AAF",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 12,
  },
});
