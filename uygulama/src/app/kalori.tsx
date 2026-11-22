
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type Cinsiyet = "erkek" | "kadin";
type Aktivite = "az" | "hafif" | "orta" | "yuksek";
type Hedef = "koruma" | "verme" | "alma";

const aktiviteKatsayilari: Record<Aktivite, number> = {
  az: 1.2,
  hafif: 1.375,
  orta: 1.55,
  yuksek: 1.725,
};

export default function KaloriEkrani() {
  const [yas, setYas] = useState("");
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");

  const [cinsiyet, setCinsiyet] = useState<Cinsiyet>("erkek");
  const [aktivite, setAktivite] = useState<Aktivite>("hafif");
  const [hedef, setHedef] = useState<Hedef>("koruma");

  const [sonuc, setSonuc] = useState<null | {
    bmr: number;
    tdee: number;
    kalori: number;
    protein: number;
    karbonhidrat: number;
    yag: number;
  }>(null);

  function hesapla() {
    const y = Number(yas.replace(",", "."));
    const b = Number(boy.replace(",", "."));
    const k = Number(kilo.replace(",", "."));

    if (
      !Number.isFinite(y) ||
      !Number.isFinite(b) ||
      !Number.isFinite(k) ||
      y < 18 || y > 100 ||
      b < 100 || b > 230 ||
      k < 30 || k > 350
    ) {
      Alert.alert(
        "Bilgileri kontrol et",
        "18-100 yaş, 100-230 cm boy ve 30-350 kg aralığında geçerli bilgiler gir."
      );
      return;
    }

    // Mifflin-St Jeor formülü
    const bmr =
      10 * k + 6.25 * b - 5 * y +
      (cinsiyet === "erkek" ? 5 : -161);

    const tdee = bmr * aktiviteKatsayilari[aktivite];

    const kalori =
      hedef === "verme" ? tdee - 300 :
      hedef === "alma" ? tdee + 300 :
      tdee;

    // Örnek makro dağılımı: %25 / %50 / %25
    const protein = (kalori * 0.25) / 4;
    const karbonhidrat = (kalori * 0.5) / 4;
    const yag = (kalori * 0.25) / 9;

    setSonuc({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      kalori: Math.round(kalori),
      protein: Math.round(protein),
      karbonhidrat: Math.round(karbonhidrat),
      yag: Math.round(yag),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Geri</Text>
        </Pressable>

        <Text style={styles.eyebrow}>BESLENME ARAÇLARI</Text>
        <Text style={styles.title}>Kalori ve{"\n"}Makro Hesapla 🥗</Text>
        <Text style={styles.subtitle}>
          Günlük enerji ihtiyacını ve örnek makro
          dağılımını keşfet.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vücut bilgilerin</Text>

          <Text style={styles.label}>Yaş</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 25"
            keyboardType="numeric"
            value={yas}
            onChangeText={setYas}
          />

          <Text style={styles.label}>Boy (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 178"
            keyboardType="numeric"
            value={boy}
            onChangeText={setBoy}
          />

          <Text style={styles.label}>Kilo (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 80"
            keyboardType="numeric"
            value={kilo}
            onChangeText={setKilo}
          />

          <Text style={styles.label}>Hesaplama formülü</Text>
          <View style={styles.options}>
            {([
              ["erkek", "Erkek"],
              ["kadin", "Kadın"],
            ] as const).map(([value, label]) => (
              <Pressable
                key={value}
                style={[
                  styles.option,
                  cinsiyet === value && styles.selected,
                ]}
                onPress={() => {
                  setCinsiyet(value);
                  setSonuc(null);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    cinsiyet === value && styles.selectedText,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Aktivite düzeyi</Text>
          {([
            ["az", "Hareketsiz"],
            ["hafif", "Hafif aktif"],
            ["orta", "Orta aktif"],
            ["yuksek", "Çok aktif"],
          ] as const).map(([value, label]) => (
            <Pressable
              key={value}
              style={[
                styles.choice,
                aktivite === value && styles.choiceSelected,
              ]}
              onPress={() => {
                setAktivite(value);
                setSonuc(null);
              }}
            >
              <Text style={styles.choiceText}>{label}</Text>
              <Text>{aktivite === value ? "🟢" : "⚪"}</Text>
            </Pressable>
          ))}

          <Text style={styles.label}>Hedef</Text>
          {([
            ["koruma", "Kilomu korumak"],
            ["verme", "Kilo vermek"],
            ["alma", "Kilo almak"],
          ] as const).map(([value, label]) => (
            <Pressable
              key={value}
              style={[
                styles.choice,
                hedef === value && styles.choiceSelected,
              ]}
              onPress={() => {
                setHedef(value);
                setSonuc(null);
              }}
            >
              <Text style={styles.choiceText}>{label}</Text>
              <Text>{hedef === value ? "🟢" : "⚪"}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.button} onPress={hesapla}>
            <Text style={styles.buttonText}>Hesapla →</Text>
          </Pressable>
        </View>

        {sonuc && (
          <View style={styles.resultCard}>
            <Text style={styles.resultEyebrow}>TAHMİNİ GÜNLÜK HEDEF</Text>
            <Text style={styles.calories}>
              {sonuc.kalori.toLocaleString("tr-TR")}
            </Text>
            <Text style={styles.unit}>kcal / gün</Text>

            <View style={styles.divider} />

            <Text style={styles.resultLine}>
              Bazal metabolizma: {sonuc.bmr} kcal
            </Text>
            <Text style={styles.resultLine}>
              Koruma kalorisi: {sonuc.tdee} kcal
            </Text>

            <Text style={styles.macroTitle}>Örnek makro dağılımı</Text>

            <View style={styles.macroRow}>
              <View style={[styles.macro, { backgroundColor: "#E4F6F2" }]}>
                <Text style={styles.macroEmoji}>🥩</Text>
                <Text style={styles.macroValue}>{sonuc.protein} g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={[styles.macro, { backgroundColor: "#FFF1DF" }]}>
                <Text style={styles.macroEmoji}>🍞</Text>
                <Text style={styles.macroValue}>{sonuc.karbonhidrat} g</Text>
                <Text style={styles.macroLabel}>Karb.</Text>
              </View>
              <View style={[styles.macro, { backgroundColor: "#EBEAFF" }]}>
                <Text style={styles.macroEmoji}>🥑</Text>
                <Text style={styles.macroValue}>{sonuc.yag} g</Text>
                <Text style={styles.macroLabel}>Yağ</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Hesaplamalar yetişkinler için genel tahminlerdir.
            Aktivite katsayıları ve makro oranları kişisel
            gereksinimleri tam yansıtmayabilir. Bu araç
            tıbbi veya kişiye özel diyet önerisi sunmaz.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F9FC" },
  content: { padding: 22, paddingBottom: 45 },
  back: {
    fontSize: 16, color: "#087E80",
    fontWeight: "700", marginBottom: 25,
  },
  eyebrow: {
    fontSize: 12, fontWeight: "800",
    letterSpacing: 2, color: "#0C938D",
    marginBottom: 12,
  },
  title: {
    fontSize: 31, fontWeight: "900",
    color: "#172B4D", lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15, color: "#74859A",
    lineHeight: 24, marginBottom: 25,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, padding: 20,
    borderWidth: 1, borderColor: "#EAF0F5",
  },
  sectionTitle: {
    fontSize: 20, fontWeight: "800",
    color: "#172B4D", marginBottom: 20,
  },
  label: {
    fontSize: 14, fontWeight: "700",
    color: "#45556C", marginBottom: 9,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F6F9FC",
    borderRadius: 13, padding: 15,
    fontSize: 16, color: "#172B4D",
    borderWidth: 1, borderColor: "#E4ECF3",
    marginBottom: 5,
  },
  options: {
    flexDirection: "row", gap: 10,
    marginBottom: 10,
  },
  option: {
    flex: 1, padding: 14,
    borderRadius: 12, alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  selected: { backgroundColor: "#087E80" },
  optionText: {
    color: "#65758B", fontWeight: "700",
  },
  selectedText: { color: "#FFFFFF" },
  choice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F9FC",
    padding: 14, borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1, borderColor: "#EAF0F5",
  },
  choiceSelected: {
    borderColor: "#0C938D",
    backgroundColor: "#EAF6F2",
  },
  choiceText: {
    fontSize: 14, color: "#45556C",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#087E80",
    borderRadius: 15, padding: 17,
    alignItems: "center", marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", fontWeight: "800",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, padding: 22,
    marginTop: 20,
    borderWidth: 1, borderColor: "#EAF0F5",
    alignItems: "center",
  },
  resultEyebrow: {
    fontSize: 11, fontWeight: "800",
    letterSpacing: 1.5, color: "#087E80",
  },
  calories: {
    fontSize: 48, fontWeight: "900",
    color: "#172B4D", marginTop: 10,
  },
  unit: { fontSize: 14, color: "#74859A" },
  divider: {
    height: 1, backgroundColor: "#EAF0F5",
    width: "100%", marginVertical: 20,
  },
  resultLine: {
    fontSize: 14, color: "#65758B",
    marginBottom: 8,
  },
  macroTitle: {
    fontSize: 18, fontWeight: "800",
    color: "#172B4D",
    marginTop: 20, marginBottom: 16,
  },
  macroRow: {
    flexDirection: "row", gap: 8, width: "100%",
  },
  macro: {
    flex: 1, paddingVertical: 15,
    borderRadius: 15, alignItems: "center",
  },
  macroEmoji: { fontSize: 22, marginBottom: 8 },
  macroValue: {
    fontSize: 17, fontWeight: "900",
    color: "#172B4D",
  },
  macroLabel: {
    fontSize: 11, color: "#74859A",
    marginTop: 5,
  },
  notice: {
    backgroundColor: "#EAF6F2",
    borderRadius: 16, padding: 18,
    marginTop: 20,
  },
  noticeText: {
    fontSize: 12, color: "#467B7A",
    lineHeight: 20,
  },
});
