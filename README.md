<div align="center">

# 📦 BK Eng – Stock & Order Management App

**A Full-Stack, Mobile-First E-commerce & Inventory Management Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-13.205.77.25-00C7B7?style=for-the-badge&logo=vercel)](http://13.205.77.25/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/piyushh-ai/BK-ENG)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

</div>

<br/>

## 📖 Overview

**BK Eng** is a comprehensive, production-ready stock and order management web application wrapped in a native Android shell. Designed with a **premium glassmorphic UI**, it caters to both **Admin** and **Sales** roles, enabling real-time inventory tracking, order processing, and dynamic product management. 

By utilizing a **React Native WebView (Expo)** wrapper, BK Eng delivers a seamless, native app-like experience (APK) combined with the agility of a React web frontend.

---

## ✨ Key Features

- 🔐 **Role-Based Access Control:** Distinct workflows for Admins (inventory/user management) and Sales (order creation, profile tracking).
- 📱 **Mobile-First App Experience:** A fully responsive web app bundled within an **Expo React Native** shell, complete with pull-to-refresh and native safe-area handling.
- 🔔 **Real-Time Push Notifications:** Integrated with **Firebase Cloud Messaging (FCM)** to deliver background push notifications and dynamic deep-linking.
- ⚡ **High Performance & Caching:** Utilizes server-side caching and optimized Mongoose lean queries, alongside client-side request caching for rapid loading.
- 🎨 **Premium UI/UX:** Features a custom Light/Dark mode, glassmorphic design elements, and smooth GSAP animations.
- 🖼️ **Advanced Media Handling:** Seamless image uploads powered by **Cloudinary** and Multer.

---

## 🛠️ Technology Stack

### **Frontend (Web)**
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Custom Glassmorphic CSS
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`)
- **Routing:** React Router v7
- **Animations:** GSAP (`@gsap/react`)
- **API Fetching:** Axios (with `axios-cache-interceptor`)

### **Backend (API)**
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **File Uploads:** Multer & Cloudinary
- **Push Notifications:** Firebase Admin SDK

### **Mobile App (Android/iOS APK wrapper)**
- **Framework:** Expo & React Native
- **Core Wrapper:** `react-native-webview`
- **Native Modules:** Expo Notifications, Expo Router, Expo Haptics

---

## 📁 Project Structure

The repository is divided into three main modules:

```text
BK-ENG/
├── Backend/          # Express API, MongoDB models, FCM logic
├── frontend/         # React Web Application (Vite + Tailwind)
└── StockWebApp/      # React Native (Expo) WebView wrapper
```

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/piyushh-ai/BK-ENG.git
cd BK-ENG
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
# Create a .env file with your MongoDB URI, JWT Secret, Cloudinary credentials, and Firebase Admin config.
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
# Create a .env file with your VITE_API_URL and Firebase public config.
npm run dev
```

### 4️⃣ Mobile App Setup (Expo)
```bash
cd ../StockWebApp
npm install
npm start
# Press 'a' to run on Android emulator or scan the QR code via Expo Go
```

---

## 🌐 Live Application
* **Web Demo:** [http://13.205.77.25/](http://13.205.77.25/)
* **App Download:** [APK](https://drive.google.com/file/d/1N3EsWqg7M-VYK1u2mvSiFaiVWU4NBH-_/view?usp=drive_link)

<br/>

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/piyushh-ai">Piyush</a></p>
</div>
