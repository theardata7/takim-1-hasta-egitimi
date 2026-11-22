
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IlaclarimEkrani() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Geri</Text>
      </Pressable>

      <Text style={styles.icon}>💊</Text>

      <Text style={styles.title}>İlaçlarım</Text>

      <Text style={styles.description}>
        Bu bölümde ilaçlarınızı ve hatırlatma
        saatlerinizi takip edebileceksiniz.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Henüz ilaç eklenmedi
        </Text>

        <Text style={styles.cardDescription}>
          İlaç ekleme ve yerel bildirim özellikleri
          sonraki geliştirme aşamasında hazırlanacak.
        </Text>
      </View>

      <Text style={styles.notice}>
        Bu uygulama tanı veya tedavi önermez.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
    padding: 24,
  },
  back: {
    color: "#147D83",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 35,
  },
  icon: {
    fontSize: 46,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    color: "#65758B",
    lineHeight: 25,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5ECF4",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#65758B",
  },
  notice: {
    marginTop: 30,
    color: "#176B70",
    fontSize: 13,
  },
});
