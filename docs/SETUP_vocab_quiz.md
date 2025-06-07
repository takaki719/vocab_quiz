# ⚙️ Vocab Quiz App - セットアップ手順

このアプリは、Next.js（App Router）、TypeScript、Tailwind CSS を使用して構築されており、Vercel にデプロイ可能なミニマル構成です。

---

## ✅ 技術スタック

| 区分           | 技術                          | 理由／備考 |
|----------------|-------------------------------|------------|
| フレームワーク | **Next.js** (App Router)      | Vercel公式推奨。静的・動的どちらも対応可能。 |
| 言語           | **TypeScript**                | バグ抑止と保守性向上。Next.jsが標準対応。 |
| ホスティング   | **Vercel**                    | Next.jsとの親和性が高く、デプロイが簡単。CI/CD自動対応。 |
| スタイリング   | **Tailwind CSS**              | クラスベースで軽量なUI設計。 |
| 状態管理       | **React Hooks (useState)**    | 小規模アプリではこれだけで十分。 |
| データ保存     | **localStorage**              | 間違いデータの保存に利用。 |

---

## 🛠️ セットアップ手順

### 1. プロジェクト作成

```bash
npx create-next-app@latest vocab-quiz-app --typescript --app
cd vocab-quiz-app
```

### 2. Tailwind CSS を導入

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Tailwind 設定（`tailwind.config.js`）

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. グローバルCSSにTailwindを追加（`src/app/globals.css`）

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

※ 必要に応じて `src/app/layout.tsx` でこのCSSを import してください。

---

## 🚀 デプロイ（Vercel）

1. GitHub にリポジトリを作成し、コードを push。
2. [Vercel](https://vercel.com) にログイン。
3. 「Add New Project」→ GitHub リポジトリを選択。
4. デフォルト設定で「Deploy」。
5. 数十秒でアプリが公開されます 🎉

---

## 🔰 開発時コマンド

```bash
npm run dev      # ローカル開発
npm run build    # 本番ビルド
npm run start    # 本番モードで起動（build後）
```

---

## 📁 推奨構成

```
src/
├── app/
│   ├── page.tsx        # ホーム画面
│   ├── quiz/page.tsx   # クイズ画面
│   ├── result/page.tsx # 結果画面
│   └── layout.tsx      # レイアウト
├── components/         # UI部品
├── data/vocab.json     # 出題データ
├── hooks/useQuiz.ts    # 出題・状態管理
├── utils/              # シャッフル・空欄生成など
├── styles/globals.css  # Tailwind グローバルCSS
└── types/vocab.ts      # 型定義
```

これでミニマルなクイズアプリが完成します ✅