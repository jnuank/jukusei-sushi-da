# 熟成寿司打 (Jukusei Sushi-Da) - 開発プラン

## コンセプト

エンジニア向け英単語・記号タイピング練習Webアプリ。
寿司打のように流れてくる問題をタイピングしてスコアを競う形式。

## 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS Modules（外部ライブラリ不要でシンプル）
- **状態管理**: React hooks（useReducer / useState）
- **デプロイ**: 静的サイト（GitHub Pages or Vercel）
- **テスト**: Vitest + React Testing Library

## 画面構成

### 1. トップ画面
- アプリタイトル「熟成寿司打」
- コース選択（3段階）
  - **お手軽 (3,000円コース)**: 短い単語中心 / 60秒
  - **お勧め (5,000円コース)**: 単語+記号 / 90秒
  - **高級 (10,000円コース)**: コードスニペット / 120秒
- モード選択
  - プログラミングキーワード
  - 記号・演算子
  - コードスニペット
  - ミックス

### 2. ゲーム画面
- 画面上部: タイマー / スコア / 現在の獲得金額表示
- 画面中央: 問題文の表示エリア（寿司が流れるイメージ）
  - 正しくタイプした文字: 緑色
  - 間違えた文字: 赤色
  - 未入力文字: グレー
- 画面下部: 入力エリア
- 寿司打風の「お皿が流れてくる」アニメーション

### 3. リザルト画面
- 総合スコア
- 正しくタイプした数 / ミスタイプ数
- WPM (Words Per Minute)
- 正確率
- お得 / 損の表示（寿司打リスペクト）
- リトライ / トップに戻るボタン

## 問題データ

### カテゴリ1: プログラミングキーワード
```
function, return, const, let, var, class, interface,
import, export, default, async, await, Promise,
boolean, string, number, undefined, null, typeof,
extends, implements, abstract, static, public, private
```

### カテゴリ2: 記号・演算子
```
() => {}, [0, 1, 2], { key: value },
===, !==, &&, ||, ?., ??,
<div>, </div>, #{id}, .class,
@Override, #include, /* comment */,
arr[i], obj.key, fn(arg), str`template`
```

### カテゴリ3: コードスニペット
```
const result = await fetch(url);
if (err !== null) { throw err; }
const [state, setState] = useState(0);
export default function App() {}
for (let i = 0; i < arr.length; i++) {}
const { name, age } = user;
arr.filter((x) => x > 0).map((x) => x * 2);
```

## ディレクトリ構成

```
src/
├── main.tsx                  # エントリポイント
├── App.tsx                   # ルートコンポーネント
├── components/
│   ├── TopScreen.tsx         # トップ画面
│   ├── TopScreen.module.css
│   ├── GameScreen.tsx        # ゲーム画面
│   ├── GameScreen.module.css
│   ├── ResultScreen.tsx      # リザルト画面
│   ├── ResultScreen.module.css
│   ├── TypingDisplay.tsx     # タイピング表示部分
│   ├── TypingDisplay.module.css
│   ├── SushiPlate.tsx        # 寿司皿アニメーション
│   ├── SushiPlate.module.css
│   ├── Timer.tsx             # タイマー表示
│   └── Timer.module.css
├── hooks/
│   ├── useTypingGame.ts      # ゲームロジック（メインhook）
│   └── useTimer.ts           # タイマーロジック
├── data/
│   ├── keywords.ts           # プログラミングキーワード
│   ├── symbols.ts            # 記号・演算子
│   ├── snippets.ts           # コードスニペット
│   └── index.ts              # データ統合・エクスポート
├── types/
│   └── index.ts              # 型定義
└── styles/
    └── global.css            # グローバルスタイル（リセット・フォント）
```

## ゲームロジック

### フロー
1. ユーザーがコース & モードを選択
2. タイマー開始（3, 2, 1 カウントダウン後）
3. 問題がランダムに出題される
4. ユーザーが1文字ずつタイプ → リアルタイムで正誤判定
5. 正解時: 次の問題へ（スコア加算 + お皿が流れる演算）
6. ミスタイプ時: 赤く表示（そのまま次の文字へ進む or 正しい文字を打つまで進めない → 要検討）
7. 時間切れ → リザルト画面

### スコア計算
- 1問正解 = 問題の文字数 × 10点
- コースの「金額」分の元を取れたかで「お得/損」を表示
- WPM = (正しくタイプした文字数 / 5) / 経過時間(分)

## 実装フェーズ

### Phase 1: 基盤構築 & デプロイ
- [ ] Viteプロジェクト初期化
- [ ] デプロイ設定（GitHub Pages or Vercel）
- [ ] 空のプロジェクトをデプロイして動作確認
- [ ] ディレクトリ構成の作成
- [ ] 型定義
- [ ] 問題データの作成

### Phase 2: コアタイピング体験

- [ ] ユーザーとして、表示された問題文を1文字ずつタイプし、正しい文字は緑・間違いは赤でリアルタイムにフィードバックを受けたい
- [ ] ユーザーとして、制限時間のカウントダウンが表示され、時間切れでゲームが終了するようにしたい
- [ ] ユーザーとして、1問正解したら次の問題が自動的に表示されるようにしたい

### Phase 3: ゲームフロー

- [ ] ユーザーとして、トップ画面でコース（お手軽/お勧め/高級）とモード（キーワード/記号/スニペット/ミックス）を選んでゲームを開始したい
- [ ] ユーザーとして、ゲーム中にタイマー・スコア・現在の獲得金額を確認したい
- [ ] ユーザーとして、ゲーム終了後にWPM・正確率・お得/損などの結果を確認し、リトライやトップに戻れるようにしたい

### Phase 4: ビジュアル・演出

- [ ] ユーザーとして、寿司皿が流れてくるアニメーションでゲームの臨場感を味わいたい
- [ ] ユーザーとして、ゲーム開始前に3, 2, 1のカウントダウンで準備したい
- [ ] ユーザーとして、ダークテーマの見やすい画面でプレイしたい

### Phase 5: 仕上げ

- [ ] レスポンシブ対応
- [ ] テスト作成
- [ ] パフォーマンス最適化

### Phase 6: 問題データ拡充

- [ ] 問題データ生成スクリプトの作成（LLM API活用）
- [ ] 言語別の問題セット追加（Python, Rust, Go など）
- [ ] 難易度バリエーションの自動生成
