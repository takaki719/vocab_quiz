# 📘 Vocab Quiz App

英語の語彙力を楽しく・効率よく身につけるための Web アプリです。  
英文の空欄に適切な単語を入力して学習できる形式になっています。

[vocab-quiz-npok4suo5-ubi-m1s-projects.vercel.app](https://vocab-quiz-ten.vercel.app/)

---

## 🚀 主な特徴

- **すぐに正解がわかる**：回答後すぐにフィードバック
- **復習モード搭載**：間違えた問題だけを再挑戦できる
- **「わからない」ボタン**：パスして答えを確認可能
- **進捗バーで学習の見える化**
- **スマホでも快適に**：レスポンシブ対応

---

## 🛠️ 技術スタック

- Next.js 14（App Router 使用）
- React 18
- TypeScript
- Tailwind CSS
- localStorage（復習モード用）

---

## 📦 セットアップ方法

### 必要なもの

- Node.js（バージョン18以上推奨）
- npm

### 手順

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

起動後、ブラウザで http://localhost:3000 を開いてください。

---

## 🔧 よく使うコマンド

```bash
npm run dev      # 開発モード
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # コードチェック
```

---

## 📁 ディレクトリ構成（抜粋）

```
src/
├── app/             # ページ構成（App Router）
│   ├── quiz/        # クイズ画面
│   └── result/      # 結果表示
├── components/      # UI部品（ボタンなど）
├── hooks/           # 状態管理用フック
├── utils/           # ユーティリティ関数
├── types/           # 型定義
└── data/            # 問題データ（JSON）
```

---

## 🎮 使い方

### 通常モード

1. トップ画面で「通常モードで始める」を選択
2. 表示された文の空欄に正しい単語を入力
3. 「答える」で正誤判定、「わからない」でスキップ
4. 全問終了後に結果画面が表示されます

### 復習モード

- 通常モードで間違えた問題が自動的に保存されます
- トップ画面から「復習モード」で再挑戦可能です

---

## 📊 問題データの形式

`src/data/vocab.json` の例：

```json
{
  "launch": "The company decided to _ a new marketing campaign."
}
```

## 🔄 機能詳細

### 空欄生成
- 答えの文字数に応じて自動的にアンダースコア（_）を生成
- 複数単語の場合は単語ごとに区切って表示

### 復習システム
- 間違えた問題は**即座に**localStorageに保存（一周完了を待たない）
- 復習モードで間違えた問題のみを再出題
- 復習問題のクリア機能
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