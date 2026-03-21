# 🍣 SushiCount

**SushiCount** is a cross-platform application for tracking sushi sessions, generating AI-powered images, and exporting session summaries.  
It is built with **React Native** and designed to run on **Android, iOS, and web** (as a PWA).

---

## 🚀 Features

- 📱 Cross-platform: Android, iOS, and Web (PWA)
- 🔗 Connects to SushiCount backend for:
  - Anonymous authentication
  - AI image generation
  - Session export as images
- 🎨 User-friendly interface with dynamic counters and image previews
- ☁️ Automatic deployment of web version on Vercel from `main` branch
- 🔧 Configured with Expo, React Navigation, and modern React Native tooling
- 🧪 Includes testing setup with Jest and React Native Testing Library

---

## 🛠️ Tech Stack

- **Frameworks & Libraries**: React Native, Expo, React Navigation, Async Storage
- **Web**: React Native Web, PWA support
- **Testing**: Jest, @testing-library/react-native
- **Code Quality**: ESLint, Prettier, TypeScript
- **Backend**: Integrates with [SushiCount Server](https://github.com/jairo-cereceda/sushi-count-server) for AI features
- **Deployment**: Vercel (web) and standard React Native APK builds (Android)

---

## 📂 Project Structure (high-level)

```
.
├── app/ # React Native pages and routes
├── assets/ # Images, fonts, icons
├── components/ # Reusable UI components
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Expo CLI
- Android Studio or Xcode if building native apps
- Access to the SushiCount backend

### Install dependencies

```bash
npm install
```

---

## Run the project

Expo web (PWA)

```bash
npm run web
```

Android

```bash
npm run android
```

iOS

```bash
npm run ios
```

---

## 🔑 Backend Integration

SushiCount frontend connects to the backend for:

Anonymous JWT authentication
AI image generation (via Pixazo)
Session export (PNG images)

> Note: The backend was generated using AI (Codex), with my role focused on orchestrating, reviewing, and validating the code and integration. The frontend consumes these endpoints seamlessly for a full-stack experience.

## 🧪 Testing

Run unit and integration tests:

```bash
npm test
```

Lint and format code:

```bash
npm run lint
npm run format
```

---

## 📦 Deployment

- Web (PWA): Automatically deployed on Vercel from the main branch.
- Mobile: Build APKs or run via Expo for Android/iOS.

---

## 💡 Role & Contribution

**Role:** Orchestrator & code reviewer

- Guided AI (Codex) in generating the frontend functionality
- Reviewed and validated UI components, navigation, state management, and integration with the backend
- Ensured cross-platform functionality (Android, iOS, Web/PWA)
- Orchestrated end-to-end integration with the backend API for authentication, AI image generation, and session export

> Even though both backend and frontend code were generated using AI, this project demonstrates full-stack orchestration, integration, and deployment skills.
