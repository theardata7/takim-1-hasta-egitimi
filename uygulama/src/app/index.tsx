
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ozellikler = [
  {
  baslik: "Tansiyon Günlüğü",
  aciklama: "Tansiyon ve nabız ölçümlerini kaydet.",
  ikon: "❤️",
  renk: "#FFE4E6",
  yol: "/tansiyon" as const,
},
  {
    baslik: "Hasta Eğitimi",
    aciklama: "Sağlıklı yaşam hakkında bilgi edin.",
    ikon: "📚",
    renk: "#E4F6F2",
    yol: "/egitim" as const,
  },
  {
    baslik: "İlaçlarım",
    aciklama: "İlaçlarını ve kullanım saatlerini takip et.",
    ikon: "💊",
    renk: "#EDF0FF",
    yol: "/ilaclarim" as const,
  },
  {
    baslik: "Yapay Zekâya Sor",
    aciklama: "Sağlık konularında genel bilgi al.",
    ikon: "🤖",
    renk: "#FFF1E6",
    yol: "/sor" as const,
  },
  {
  baslik: "Su Takibi",
  aciklama: "Günlük su tüketimini kaydet ve takip et.",
  ikon: "💧",
  renk: "#E4F6F2",
  yol: "/su-takibi" as const,
},
];

export default function AnaSayfa() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HOŞ GELDİN 👋</Text>
            <Text style={styles.title}>
              Sağlığın için{"\n"}
              <Text style={styles.titleAccent}>bir adım at.</Text>
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>✚</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCircle} />

          <Text style={styles.heroEyebrow}>
            SAĞLIK ASİSTANIN
          </Text>

          <Text style={styles.heroTitle}>
            Daha bilinçli,{"\n"}daha sağlıklı.
          </Text>

          <Text style={styles.heroDescription}>
            Eğitim içeriklerini keşfet, ilaçlarını takip et
            ve merak ettiklerini öğren.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.heroButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/egitim")}
          >
            <Text style={styles.heroButtonText}>
              Keşfet →
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Senin için
          </Text>
          <Text style={styles.sectionSubtitle}>
            Hızlı erişim
          </Text>
        </View>

        {ozellikler.map((ozellik) => (
          <Pressable
            key={ozellik.yol}
            style={({ pressed }) => [
              styles.featureCard,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push(ozellik.yol)}
          >
            <View
              style={[
                styles.featureIconBox,
                { backgroundColor: ozellik.renk },
              ]}
            >
              <Text style={styles.featureIcon}>
                {ozellik.ikon}
              </Text>
            </View>

            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>
                {ozellik.baslik}
              </Text>
              <Text style={styles.featureDescription}>
                {ozellik.aciklama}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Günün küçük hatırlatması
            </Text>
            <Text style={styles.tipDescription}>
              Gün içinde kısa hareket molaları vermek,
              uzun süre hareketsiz kalmayı azaltır.
            </Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Bu uygulama tanı veya tedavi önermez.
            İçerikler genel bilgilendirme amaçlıdır.
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
    paddingTop: 20,
    paddingBottom: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  greeting: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0C938D",
    marginBottom: 12,
  },
  title: {
    fontSize: 33,
    fontWeight: "900",
    color: "#172B4D",
    lineHeight: 42,
  },
  titleAccent: {
    color: "#0C938D",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#E2F5F1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0C938D",
  },
  hero: {
    backgroundColor: "#087E80",
    borderRadius: 28,
    padding: 26,
    marginBottom: 34,
    overflow: "hidden",
    minHeight: 235,
  },
  heroCircle: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#15999A",
    right: -85,
    top: -75,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B5EAE4",
    letterSpacing: 2,
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 34,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 13,
    color: "#D6F1EF",
    lineHeight: 21,
    maxWidth: 260,
    marginBottom: 22,
  },
  heroButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 13,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#087E80",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#172B4D",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8A9AAF",
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAF0F5",
    shadowColor: "#16324F",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  featureIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  featureIcon: {
    fontSize: 29,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: "#7C8CA1",
    lineHeight: 18,
  },
  arrow: {
    fontSize: 30,
    color: "#9FB0BF",
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#EAF6F2",
    borderRadius: 20,
    padding: 20,
    marginTop: 14,
    marginBottom: 20,
  },
  tipIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#176B70",
    marginBottom: 7,
  },
  tipDescription: {
    fontSize: 13,
    color: "#467B7A",
    lineHeight: 21,
  },
  notice: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  noticeText: {
    fontSize: 12,
    color: "#8A9AAF",
    lineHeight: 19,
    textAlign: "center",
  },
});
