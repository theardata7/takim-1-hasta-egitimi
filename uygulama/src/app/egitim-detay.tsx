
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const icerikler = {
  "el-hijyeni": {
    baslik: "El Hijyeni",
    ikon: "🧼",
    giris: "El hijyeni, mikropların yayılmasını azaltmaya yardımcı olur.",
    maddeler: [
      "Ellerinizi temiz, akan suyla ıslatın ve sabunlayın.",
      "Avuç içlerini, el sırtlarını, parmak aralarını ve tırnak çevresini ovalayın.",
      "Ellerinizi en az 20 saniye sabunla ovalayın.",
      "Temiz suyla durulayın ve temiz havluyla kurulayın.",
      "Yemek hazırlamadan önce ve tuvaletten sonra ellerinizi temizleyin.",
    ],
  },
  "saglikli-beslenme": {
    baslik: "Sağlıklı Beslenme",
    ikon: "🥗",
    giris: "Dengeli beslenme, vücudun ihtiyaç duyduğu besinleri almasını destekler.",
    maddeler: [
      "Günlük öğünlerde farklı sebze ve meyvelere yer verin.",
      "Tam tahıllı besinleri tercih etmeye çalışın.",
      "Protein kaynaklarını çeşitlendirin.",
      "Aşırı tuz ve ilave şeker tüketimini sınırlandırın.",
      "Gün boyunca yeterli miktarda su tüketin.",
    ],
  },
  "fiziksel-aktivite": {
    baslik: "Fiziksel Aktivite",
    ikon: "🏃",
    giris: "Düzenli hareket, genel sağlığı ve yaşam kalitesini destekler.",
    maddeler: [
      "Gün içinde uzun süre hareketsiz kalmamaya çalışın.",
      "Yürüyüş gibi sevdiğiniz hareketlerle başlayın.",
      "Aktivite süresini ve yoğunluğunu zamanla artırın.",
      "Kendi fiziksel kapasitenize uygun hareketleri seçin.",
      "Kronik hastalığınız varsa egzersiz konusunda sağlık uzmanına danışın.",
    ],
  },
};

export default function EgitimDetayEkrani() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const icerik =
    typeof id === "string"
      ? icerikler[id as keyof typeof icerikler]
      : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Geri</Text>
        </Pressable>

        {!icerik ? (
          <Text style={styles.title}>Eğitim bulunamadı.</Text>
        ) : (
          <>
            <Text style={styles.icon}>{icerik.ikon}</Text>
            <Text style={styles.title}>{icerik.baslik}</Text>
            <Text style={styles.intro}>{icerik.giris}</Text>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Bilmeniz Gerekenler
              </Text>

              {icerik.maddeler.map((madde, index) => (
                <View key={index} style={styles.listRow}>
                  <Text style={styles.number}>{index + 1}.</Text>
                  <Text style={styles.itemText}>{madde}</Text>
                </View>
              ))}
            </View>
          </>
        )}
{id === "saglikli-beslenme" && (
  <Pressable
    onPress={() => router.push("/kalori")}
    style={{
      backgroundColor: "#087E80",
      padding: 20,
      borderRadius: 18,
      marginTop: 20,
      alignItems: "center",
    }}
  >
    <Text
      style={{
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
      }}
    >
      🔥 Kalori ve Makro Hesapla →
    </Text>
  </Pressable>
)}
{id === "saglikli-beslenme" && (
  <Pressable
    onPress={() => router.push("/beslenme")}
    style={{
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: "#087E80",
      padding: 20,
      borderRadius: 18,
      marginTop: 12,
      alignItems: "center",
    }}
  >
    <Text
      style={{
        color: "#087E80",
        fontSize: 16,
        fontWeight: "800",
      }}
    >
      🥗 Beslenme Günlüğüm →
    </Text>
  </Pressable>
)}
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
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 14,
  },
  intro: {
    fontSize: 16,
    color: "#65758B",
    lineHeight: 25,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5ECF4",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 20,
  },
  listRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  number: {
    color: "#147D83",
    fontWeight: "800",
    fontSize: 15,
  },
  itemText: {
    flex: 1,
    color: "#45556C",
    fontSize: 15,
    lineHeight: 23,
  },
  notice: {
    marginTop: 24,
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
