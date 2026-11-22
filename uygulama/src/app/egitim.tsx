
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const egitimler = [
  {
    id: 1,
    baslik: "El Hijyeni",
    aciklama: "Doğru el yıkama alışkanlıkları.",
    ikon: "🧼",
  },
  {
    id: 2,
    baslik: "Sağlıklı Beslenme",
    aciklama: "Dengeli beslenmenin temel ilkeleri.",
    ikon: "🥗",
  },
  {
    id: 3,
    baslik: "Fiziksel Aktivite",
    aciklama: "Günlük hareketin sağlık açısından önemi.",
    ikon: "🏃",
  },
];

export default function EgitimEkrani() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Geri</Text>
        </Pressable>

        <Text style={styles.title}>Hasta Eğitimi</Text>

        <Text style={styles.subtitle}>
          Sağlık hakkında temel bilgilendirme kartları.
        </Text>

        {egitimler.map((egitim) => (
          <View key={egitim.id} style={styles.card}>
            <Text style={styles.icon}>{egitim.ikon}</Text>

            <Text style={styles.cardTitle}>
              {egitim.baslik}
            </Text>

            <Text style={styles.cardDescription}>
              {egitim.aciklama}
            </Text>
          </View>
        ))}

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Bu uygulama tanı veya tedavi önermez.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  back: {
    fontSize: 16,
    color: "#147D83",
    marginBottom: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#65758B",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5ECF4",
  },
  icon: {
    fontSize: 34,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#65758B",
    lineHeight: 22,
  },
  notice: {
    marginTop: 18,
    padding: 18,
    backgroundColor: "#E8F4F4",
    borderRadius: 16,
  },
  noticeText: {
    color: "#176B70",
    fontSize: 13,
    lineHeight: 21,
  },
});
