
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnaSayfa() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.badge}>SAĞLIK ASİSTANI</Text>

          <Text style={styles.title}>
            Sağlığınız için bilgi ve takip
          </Text>

          <Text style={styles.subtitle}>
            Güvenilir eğitim içeriklerine ulaşın,
            ilaçlarınızı takip edin ve merak ettiklerinizi sorun.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Nasıl yardımcı olabiliriz?
        </Text>

        <Link href="/egitim" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>📚</Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Hasta Eğitimi
              </Text>

              <Text style={styles.cardDescription}>
                Sağlık konularında bilgilendirici
                eğitim kartlarını inceleyin.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/ilaclarim" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>💊</Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                İlaçlarım
              </Text>

              <Text style={styles.cardDescription}>
                İlaç listenizi ve hatırlatmalarınızı yönetin.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/sor" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>🤖</Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Yapay Zekâya Sor
              </Text>

              <Text style={styles.cardDescription}>
                Eğitim içerikleri hakkında
                sorularınızı sorun.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>
            Önemli bilgilendirme
          </Text>

          <Text style={styles.noticeText}>
            Bu uygulama tanı veya tedavi önermez.
            Sağlığınızla ilgili kararlar için bir
            sağlık profesyoneline danışın.
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
    paddingBottom: 36,
  },

  header: {
    marginTop: 20,
    marginBottom: 32,
  },

  badge: {
    color: "#147D83",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 14,
  },

  title: {
    fontSize: 31,
    fontWeight: "800",
    color: "#172B4D",
    lineHeight: 39,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: "#65758B",
    lineHeight: 24,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5ECF4",
  },

  cardIcon: {
    fontSize: 29,
    marginRight: 15,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 13,
    color: "#65758B",
    lineHeight: 20,
  },

  arrow: {
    fontSize: 30,
    color: "#147D83",
    marginLeft: 10,
  },

  notice: {
    marginTop: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#E8F4F4",
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#176B70",
    marginBottom: 8,
  },

  noticeText: {
    fontSize: 13,
    lineHeight: 21,
    color: "#35696C",
  },
});
