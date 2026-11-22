
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Merhaba 👋
            </Text>

            <Text style={styles.subtitle}>
              Hasta Eğitimi Asistanı'na Hoş Geldiniz
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            Bugün ne yapmak istersiniz?
          </Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              Alert.alert(
                'Sağlık Eğitimleri',
                'Bu bölüm yakında hazırlanacak.'
              )
            }
          >
            <Text style={styles.cardIcon}>📚</Text>

            <Text style={styles.cardTitle}>
              Sağlık Eğitimleri
            </Text>

            <Text style={styles.cardDescription}>
              Sağlık konularında güvenilir bilgiler edinin.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              Alert.alert(
                'İlaç Hatırlatıcı',
                'Bu bölüm yakında hazırlanacak.'
              )
            }
          >
            <Text style={styles.cardIcon}>💊</Text>

            <Text style={styles.cardTitle}>
              İlaç Hatırlatıcı
            </Text>

            <Text style={styles.cardDescription}>
              İlaçlarınızı ve kullanım saatlerinizi takip edin.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              Alert.alert(
                'Yapay Zekâ Asistanı',
                'Bu bölüm yakında hazırlanacak.'
              )
            }
          >
            <Text style={styles.cardIcon}>🤖</Text>

            <Text style={styles.cardTitle}>
              Yapay Zekâ Asistanı
            </Text>

            <Text style={styles.cardDescription}>
              Sağlık konularındaki sorularınızı sorun.
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Sağlığınız bizim için önemli 💙
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FC',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 35,
  },

  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#17365D',
  },

  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    lineHeight: 24,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#17365D',
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5EDF5',
  },

  cardIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#17365D',
  },

  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 21,
  },

  footer: {
    marginTop: 25,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#94A3B8',
  },
});
