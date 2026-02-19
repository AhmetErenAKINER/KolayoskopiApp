# 🏥 KOLAYOSKOPİ — Bağırsak Hazırlığı Eğitimi Mobil Uygulaması

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-Expo-blue?style=for-the-badge&logo=expo" alt="Expo" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

## 📋 Proje Hakkında

**Kolayoskopi**, kolonoskopi öncesi bağırsak temizliği sürecinde hastaları adım adım yönlendiren bir mobil sağlık (mHealth) uygulamasıdır. İÜ-C Florence Nightingale Hemşirelik Fakültesi, Cerrahi Hastalıkları Hemşireliği Anabilim Dalı bünyesinde geliştirilen bu uygulama, hasta uyumunu artırmak ve hazırlık sürecini kolaylaştırmak amacıyla tasarlanmıştır.

### 🎯 Amaç

Kolonoskopi işlemi öncesinde bağırsak temizliği kritik bir süreçtir. Bu uygulama:

- Hastaya işlemden **3 gün önce**, **1 gün önce** ve **işlem günü** yapması gerekenleri hatırlatır
- Yasaklı besinleri ve tüketilebilecek besinleri listeler
- İlaç kullanım bilgilerini sunar
- Kişisel veri koruma (KVKK) bilgilendirmesi sağlar

## 🎨 Tasarım İlhamı

Uygulama arayüzü, **Pinterest medikal UI** panosundan ilham alınarak tasarlanmıştır:

- **Temiz ve minimal** medikal arayüz yaklaşımı
- **Petrol yeşili (#0B666A)** ana renk paleti — güven ve sağlık hissiyatı
- **Büyük, okunabilir fontlar** — özellikle yaşlı hasta grubu için erişilebilirlik
- **Geniş dokunmatik alanlar** — kolay kullanım
- **Kart tabanlı bilgi mimarisi** — bilgiyi gruplandırarak sunma
- **Micro-animasyonlar** — akıcı ve modern kullanıcı deneyimi

## 🏗️ Teknik Mimari

```
KolayoskopiApp/
├── App.js                         # Uygulama giriş noktası
├── src/
│   ├── constants/
│   │   ├── colors.js              # Renk paleti
│   │   └── data.js                # Talimatlar, yasaklı besinler, ilaç bilgileri
│   ├── navigation/
│   │   └── AppNavigator.js        # Stack Navigator yapılandırması
│   └── screens/
│       ├── OnboardingScreen.js    # KVKK onay ekranı
│       ├── SplashScreen.js        # Karşılama ekranı
│       ├── CalendarScreen.js      # Tarih seçimi
│       └── InstructionsScreen.js  # Talimat kartları
└── README.md
```

## 📱 Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Onboarding** | KVKK aydınlatma metni, onay checkbox'ı ve devam butonu |
| **Splash** | Yeşil karşılama ekranı, uygulama logosu ve animasyonlar |
| **Takvim** | Türkçe takvim ile kolonoskopi tarih seçimi |
| **Talimatlar** | Gruplandırılmış medikal kartlar (3 gün önce, 1 gün önce, işlem günü) |

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v18+)
- npm veya yarn
- Expo CLI
- iOS Simulator / Android Emulator veya Expo Go uygulaması

### Kurulum

```bash
# Projeye geç
cd KolayoskopiApp

# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start
```

### Çalıştırma Seçenekleri

```bash
npx expo start --android    # Android emülatörde
npx expo start --ios        # iOS simülatörde
npx expo start --web        # Web tarayıcıda
```

### 📲 Expo Go ile Hızlı Erişim

Uygulamayı fiziksel cihazınızda denemek için **Expo Go** uygulamasını indirin ve aşağıdaki QR kodu tarayın:

<p align="center">
  <img src="./assets/expo-go-qr.png" alt="Expo Go QR Code" width="250" />
</p>

> **Not:** QR kodu taramak için telefonunuzda [Expo Go](https://expo.dev/client) uygulamasının yüklü olması gerekmektedir.

## 🎬 Uygulama Demo Videosu

Uygulamanın ekran kayıt videosunu aşağıdan izleyebilirsiniz:

https://github.com/AhmetErenAKINER/KolayoskopiApp/blob/main/KoolayoskopiApp_EkranG%C3%B6r%C3%BCnt%C3%BCs%C3%BC.mp4

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| **React Native (Expo)** | Cross-platform mobil uygulama |
| **React Navigation** | Ekranlar arası geçiş yönetimi |
| **react-native-calendars** | Türkçe takvim bileşeni |
| **@expo/vector-icons** | MaterialIcons ikon seti |
| **Animated API** | Micro-animasyonlar ve geçiş efektleri |

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

<p align="center">
  <strong>İÜ-C Florence Nightingale Hemşirelik Fakültesi</strong><br/>
  Cerrahi Hastalıkları Hemşireliği Anabilim Dalı<br/>
  <em>Arş. Gör. Kübra ŞENGÖR</em>
</p>
