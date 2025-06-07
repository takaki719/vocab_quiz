# 📘 Vocab Quiz App

英語の語彙力向上のためのWebアプリケーションです。文中の空欄を埋める形式で英単語を学習できます。

## 🚀 特徴

- **即座にフィードバック**: 回答後すぐに正誤判定
- **復習モード**: 間違えた問題を再挑戦可能
- **わからない機能**: 不明な問題をスキップして答えを確認
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **プログレス表示**: 進捗状況を視覚的に表示

## 🛠️ 技術スタック

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **localStorage** (復習機能用)

## 📦 セットアップ

### 前提条件
- Node.js 18以上
- npm

### インストール手順

1. 依存関係をインストール
```bash
npm install
```

2. 開発サーバーを起動
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 を開く

## 🔧 開発コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLint実行
```

## 📁 プロジェクト構造

```
src/
├── app/                     # Next.js App Router ページ
│   ├── layout.tsx          # グローバルレイアウト
│   ├── page.tsx            # ホームページ
│   ├── quiz/page.tsx       # クイズページ
│   └── result/page.tsx     # 結果ページ
├── components/             # 再利用可能なUIコンポーネント
│   ├── Button.tsx
│   ├── ProgressBar.tsx
│   ├── QuizCard.tsx
│   └── ResultStats.tsx
├── hooks/
│   └── useQuiz.ts          # クイズロジック・状態管理
├── utils/                  # ユーティリティ関数
│   ├── shuffle.ts         # 配列シャッフル
│   └── placeholder.ts     # 空欄生成
├── types/
│   └── vocab.ts           # TypeScript型定義
├── data/
│   └── vocab.json         # 語彙問題データ
└── styles/
    └── globals.css        # グローバルスタイル
```

## 🎮 使い方

### 通常モード
1. ホーム画面で「通常モードで始める」をクリック
2. 英文の空欄に適切な単語を入力
3. 「答える」ボタンで回答送信、または「わからない」で答えを確認
4. 結果を確認して次の問題へ進行
5. 全問題終了後に結果画面で成績確認

### 復習モード
1. 通常モードで間違えた問題がある場合に利用可能
2. ホーム画面で「間違い復習モード」をクリック
3. 以前間違えた問題のみが出題される

## 📊 データ形式

`src/data/vocab.json`は以下の形式で問題を定義：

```json
{
  "答え": "問題文（_で空欄を表示）",
  "launch": "The company decided to _ a new marketing campaign."
}
```

## 🔄 機能詳細

### 空欄生成
- 答えの文字数に応じて自動的にアンダースコア（_）を生成
- 複数単語の場合は単語ごとに区切って表示

### 復習システム
- 間違えた問題は自動的にlocalStorageに保存
- 復習モードで間違えた問題のみを再出題
- 正答率改善まで継続的な学習が可能

### レスポンシブデザイン
- Tailwind CSSによるモバイルファーストデザイン
- スマートフォン・タブレット・デスクトップ対応

## 🎨 デザインシステム

- **プライマリカラー**: Blue (青系)
- **セカンダリカラー**: Gray (グレー系)
- **成功色**: Green (緑系)
- **エラー色**: Red (赤系)
- **警告色**: Yellow (黄系)

## 📝 今後の改善案

- 音声読み上げ機能（TTS）
- ユーザー登録・ログイン機能
- スコア履歴追跡
- 難易度別カテゴリ分け
- 問題のお気に入り機能
- ソーシャル共有機能

## 🚀 デプロイ

### Vercel（推奨）
1. GitHubにリポジトリをプッシュ
2. Vercelアカウントでプロジェクトをインポート
3. 自動デプロイが開始

### その他プラットフォーム
- Netlify
- AWS Amplify
- GitHub Pages（静的エクスポート）

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📜 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👥 作成者

Vocab Quiz App Development Team

---

**Happy Learning! 📚✨**