
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const egitimler = [
  {
    id: "el-hijyeni",
    baslik: "El Hijyeni",
    aciklama: "Doğru el yıkama tekniklerini öğren.",
    ikon: "🧼",
    kategori: "KİŞİSEL BAKIM",
    sure: "3 dk",
    renk: "#E0F5F0",
    vurgu: "#087E80",
  },
  {
    id: "saglikli-beslenme",
    baslik: "Sağlıklı Beslenme",
    aciklama: "Dengeli beslenmenin temel ilkelerini keşfet.",
    ikon: "🥗",
    kategori: "BESLENME",
    sure: "5 dk",
    renk: "#FFF0DB",
    vurgu: "#C77D22",
  },
  {
    id: "fiziksel-aktivite",
    baslik: "Fiziksel Aktivite",
    aciklama: "Hareketli yaşam için ilk adımı at.",
    ikon: "🏃",
    kategori: "AKTİF YAŞAM",
    sure: "4 dk",
    renk: "#E9E8FF",
    vurgu: "#6B5BD2",
  },
] as const;

export default function EgitimEkrani() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Geri</Text>
        </Pressable>

        <Text style={styles.eyebrow}>SAĞLIK KÜTÜPHANESİ</Text>
        <Text style={styles.title}>Öğren, keşfet,{"\n"}iyi hisset.</Text>
        <Text style={styles.subtitle}>
          Günlük yaşamında kullanabileceğin güvenilir
          ve anlaşılır sağlık eğitimleri.
        </Text>

        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>✨</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Bilgi, sağlıklı yaşamın ilk adımı.
            </Text>
            <Text style={styles.bannerText}>
              Bir konu seç ve öğrenmeye başla.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Eğitimler</Text>
          <Text style={styles.count}>3 içerik</Text>
        </View>

        {egitimler.map((egitim) => (
          <Pressable
            key={egitim.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/egitim-detay",
                params: { id: egitim.id },
              })
            }
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: egitim.renk },
              ]}
            >
              <Text style={styles.icon}>{egitim.ikon}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text
                style={[
                  styles.category,
                  { color: egitim.vurgu },
                ]}
              >
                {egitim.kategori}
              </Text>
              <Text style={styles.cardTitle}>
                {egitim.baslik}
              </Text>
              <Text style={styles.cardDescription}>
                {egitim.aciklama}
              </Text>
              <Text style={styles.duration}>
                ◷ {egitim.sure} okuma
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Bu uygulama tanı veya tedavi önermez.
            Eğitim içerikleri genel bilgilendirme amaçlıdır.
          </Text>
        </View>
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
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    marginBottom: 22,
  },
  backText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#087E80",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0C938D",
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 41,
    color: "#172B4D",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#74859A",
    lineHeight: 24,
    marginBottom: 24,
  },
  banner: {
    backgroundColor: "#E5F5F1",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bannerIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#176B70",
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 13,
    color: "#538581",
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#172B4D",
  },
  count: {
    fontSize: 13,
    color: "#8A9AAF",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EAF0F5",
    shadowColor: "#16324F",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  iconBox: {
    width: 72,
    height: 90,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    fontSize: 35,
  },
  cardContent: {
    flex: 1,
  },
  category: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 7,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: "#7C8CA1",
    lineHeight: 18,
    marginBottom: 9,
  },
  duration: {
    fontSize: 11,
    color: "#9AA8B8",
    fontWeight: "600",
  },
  arrow: {
    fontSize: 28,
    color: "#9FB0BF",
    marginLeft: 6,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  notice: {
    padding: 18,
    marginTop: 15,
    borderRadius: 16,
    backgroundColor: "#EAF6F2",
  },
  noticeText: {
    fontSize: 12,
    color: "#467B7A",
    lineHeight: 20,
    textAlign: "center",
  },
});
