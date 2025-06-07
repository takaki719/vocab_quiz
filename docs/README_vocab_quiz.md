# 📘 Vocab Quiz App

A web-based English vocabulary quiz application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Users complete sentences by filling in the blanks, and can review incorrect answers in a dedicated review mode.

---

## 📁 Directory Structure

```
vocab-quiz-app/
├── public/                       # Static files (favicon, images, etc.)
│
├── src/
│   ├── app/                      # App Router pages
│   │   ├── layout.tsx           # Global layout
│   │   ├── page.tsx             # Home page `/`
│   │   ├── quiz/                # Quiz page `/quiz`
│   │   │   └── page.tsx
│   │   ├── result/              # Result page `/result`
│   │   │   └── page.tsx
│
│   ├── components/              # Reusable UI components
│   │   ├── QuizCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ResultStats.tsx
│   │   └── Button.tsx
│
│   ├── data/
│   │   └── vocab.json           # Vocabulary questions
│
│   ├── hooks/
│   │   └── useQuiz.ts           # Quiz logic and state management
│
│   ├── utils/
│   │   ├── shuffle.ts
│   │   └── placeholder.ts       # Blank generation logic
│
│   ├── styles/
│   │   └── globals.css          # Tailwind and global styles
│
│   └── types/
│       └── vocab.ts             # Type definitions
│
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🚀 Features

- Sentence-based blank-fill questions
- Auto-generated underscores based on answer length
- Immediate feedback after each question
- Review mode for previously incorrect answers
- Responsive and mobile-friendly UI

---

## 🛠️ Technologies

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- LocalStorage (for review mode data)

---

## 🔜 Future Improvements

- Audio (TTS) for reading questions
- User login and score tracking
- Difficulty levels or categories