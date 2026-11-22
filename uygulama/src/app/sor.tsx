
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SoruEkrani() {
  const [soru, setSoru] = useState("");

  function soruGonder() {
    if (!soru.trim()) {
      Alert.alert("Uyarı", "Lütfen bir soru yazın.");
      return;
    }

    Alert.alert(
      "Bilgilendirme",
      "Yapay zekâ bağlantısı henüz kurulmadı. Bu ekran şu anda taslak olarak çalışıyor."
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Geri</Text>
        </Pressable>

        <Text style={styles.icon}>🤖</Text>

        <Text style={styles.title}>Yapay Zekâya Sor</Text>

        <Text style={styles.description}>
          Hasta eğitimi içerikleri hakkında
          merak ettiklerinizi yazabilirsiniz.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Sorunuzu buraya yazın..."
          placeholderTextColor="#8A97A8"
          multiline
          value={soru}
          onChangeText={setSoru}
          textAlignVertical="top"
        />

        <Pressable style={styles.button} onPress={soruGonder}>
          <Text style={styles.buttonText}>Soruyu Gönder</Text>
        </Pressable>

        <Text style={styles.notice}>
          Bu uygulama tanı veya tedavi önermez.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },
  content: {
    flex: 1,
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
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5EE",
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    fontSize: 15,
    color: "#172B4D",
  },
  button: {
    backgroundColor: "#147D83",
    borderRadius: 14,
    padding: 17,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  notice: {
    marginTop: 25,
    color: "#176B70",
    fontSize: 13,
    lineHeight: 20,
  },
});
