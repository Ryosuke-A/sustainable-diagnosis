import { Box } from '@mui/material';
import { useState } from 'react';
import Question from '../components/Question';
import Result from '../components/Result';

type ScoreVector7 = number[];

// 7カテゴリの名称（環境、貧困・飢餓、健康・福祉、教育、ジェンダー、経済・仕事、平和）
const categories = [
  '環境',
  '貧困・飢餓',
  '健康・福祉',
  '教育',
  'ジェンダー平等',
  '経済成長・仕事',
  '平和・公正',
];

// SDGs 17目標ごとの7次元重み（代表例）
const rawWeights: { [key: number]: number[] } = {
  1:  [0.1, 1.0, 0.2, 0.1, 0.2, 0.3, 0.1],
  2:  [0.3, 1.0, 0.3, 0.1, 0, 0.1, 0],
  3:  [0.3, 0.4, 1.0, 0.1, 0.2, 0.3, 0],
  4:  [0.1, 0.2, 0.2, 1.0, 0.3, 0.2, 0],
  5:  [0.1, 0.1, 0.2, 0.4, 1.0, 0.3, 0.1],
  6:  [0.9, 0.3, 0.5, 0, 0, 0, 0],
  7:  [1.0, 0, 0, 0, 0, 0.1, 0],
  8:  [0, 0.3, 0.2, 0.2, 0.2, 1.0, 0.1],
  9:  [0.7, 0, 0.1, 0.3, 0.1, 1.0, 0],
  10: [0, 0, 0, 0.2, 1.0, 0, 0.6],
  11: [0.5, 0, 0.1, 0, 0, 0.5, 0.2],
  12: [1.0, 0, 0, 0, 0, 0, 0],
  13: [1.0, 0, 0, 0, 0, 0, 0],
  14: [1.0, 0, 0, 0, 0, 0, 0],
  15: [1.0, 0, 0, 0, 0, 0, 0],
  16: [0, 0, 0, 0, 0, 0, 1.0],
  17: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
};

const normalizeEachGoal = (weights: { [key: number]: number[] }) => {
  const normalized: { [key: number]: number[] } = {};
  for (const key in weights) {
    const sum = weights[key].reduce((acc, val) => acc + val, 0);
    normalized[Number(key)] = weights[key].map(val => (sum === 0 ? 0 : val / sum));
  }
  return normalized;
};

const sdgsWeightsNormalized = normalizeEachGoal(rawWeights);

// 目標名は元のままセット
const sdgsNames: { [key: number]: string } = {
  1: '1. 貧困をなくそう',
  2: '2. 飢餓をゼロに',
  3: '3. すべての人に健康と福祉を',
  4: '4. 質の高い教育をみんなに',
  5: '5. ジェンダー平等を実現しよう',
  6: '6. 安全な水とトイレを世界中に',
  7: '7. エネルギーをみんなに',
  8: '8. 働きがいも経済成長も',
  9: '9. 産業と技術革新の基盤をつくろう',
  10: '10. 人や国の不平等をなくそう',
  11: '11. 住み続けられるまちづくりを',
  12: '12. つくる責任つかう責任',
  13: '13. 気候変動に具体的な対策を',
  14: '14. 海の豊かさを守ろう',
  15: '15. 陸の豊かさも守ろう',
  16: '16. 平和と公正をすべての人に',
  17: '17. パートナーシップで目標を達成しよう',
};

// 最終オブジェクト例（名前と正規化重みをセット）
const finalSdgsWeights: { [key: number]: { name: string; weight: number[] } } = {};
for (const key in sdgsWeightsNormalized) {
  finalSdgsWeights[Number(key)] = {
    name: sdgsNames[Number(key)],
    weight: sdgsWeightsNormalized[Number(key)],
  };
}

console.log(finalSdgsWeights);

// 質問（10問）と7次元スコア付き選択肢
const questions = [
  {
    // 7カテゴリの名称（環境、貧困・飢餓、健康・福祉、教育、ジェンダー、経済・仕事、平和）
    // 質問（環境）ネガ
    text: '仕事からの帰り道，エレベーターにゴミが落ちていた。',
    choices: [
      { label: '迷わず捨てる', score: [3,0,1,0.5,0,0,0.5] },
      { label: '捨てるか迷う', score: [2,0,0.5,0,0,0,0.5] },
      { label: '見なかったことにする',   score: [0.5,0,0.5,0,0,0,0] },
    ],
  },
  {
   //  質問（貧困・飢餓）ネガ
    text: 'ご飯を食べきれずに捨てちゃったことがある？',
    choices: [
      { label: '実はよくある…', score: [-1,-2,0,0,0,0,0] },
      { label: 'たまに…', score: [-1,-1,0,0,0,0,0] },
      { label: '全部食べてます！',     score: [1,1,0,0,0,0,0] },
    ],
  },
    {
    //  質問（平和・公平）ネガ
    text: '平和のためなら他者の平和は侵してもよい？',
    choices: [
      { label: 'もちろん', score: [0,-0.5,0,-0.5,0,0,-2] },
      { label: '必要があれば', score: [0,-0.5,0,-0.5,0,0,-1] },
      { label: '絶対にダメだ', score: [0,0.5,0,0,0.5,0,0,1] },
    ],
  },
  {
    //  質問（健康・福祉）ポジ
    text: '今日，健康管理を意識しましたか？',
    choices: [
      { label: 'しっかりしている', score: [0,0,3,1,0,1,0] },
      { label: 'ちょっと気にしてる',   score: [0,0,2,0,0,1,0] },
      { label: 'ほとんど意識しない', score: [0,0,1,0,0,0,0] },
    ],
  },
  {
    //  質問（教育）ポジ
    text: '世界中で教育の機会は平等であるべき？',
    choices: [
      { label: 'その通り', score: [0,0,0,3,1,0,1] },
      { label: '日本国内なら', score: [0,0,0,2,0.5,0,0.5] },
      { label: '格差はあってしかるべき', score: [0,0,0,0.5,0,0,0.5] },
    ],
  },
  {
    //  質問（ジェンダー平等）ネガ
    text: '「私の親は看護師です。」親の性別は？',
    choices: [
      { label: '男性だと思う', score: [0,0,0,0,1,0,0] },
      { label: '女性だと思う', score: [0,0,0,-1,-2,0,0] },
      { label: 'どちらだとも感じる', score: [0,0,0,0,2,0,0] },
    ],
  },
  {
    //  質問（経済・仕事）ポジ
    text: '働けといわれたらいくらでも働ける',
    choices: [
      { label: 'そう思う', score: [0,0,0,0,0,1,0] },
      { label: '時と場合による', score: [0,0,1,0,0,2,0] },
      { label: '絶対無理', score: [0,0,2,0,0,3,0] },
    ],
  },
  {
    //  質問（平和・公平）ポジ
    text: '平和や公正な社会は重要ですか？',
    choices: [
      { label: '絶対必要', score: [0,0,1,1,0,0,3] },
      { label: '重要だとは思う', score: [0,0,0,1,0,0,2] },
      { label: 'あまり考えない', score: [0,0,0.5,0,0,0,0.1] },
    ],
  },
  {
    //  質問（健康・福祉）ネガ
    text: 'もっともっと高齢者に優しい社会になる必要が',
    choices: [
      { label: 'ある！', score: [0,0,2,0,0,0,0] },
      { label: 'う～～ん', score: [0,0,-1,0,0,0,-1] },
      { label: 'なし。十分優遇されてる。', score: [0,0,-2,0,0,0,0] },
    ],
  },
    {
    // 質問（環境）ポジ
    text: '豊かな自然を愛している？',
    choices: [
      { label: '愛している！', score: [3,0,2,0,0,0,0] },
      { label: 'ちょっと好き', score: [2,0,1,0,0,0,0] },
      { label: '（ぶっちゃけどうでもいい）',   score: [0.1,0,0,0,0,0,0] },
    ],
  },
  {
    //  質問（教育）ネガ
    text: '教育支援のボランティアをしている？',
    choices: [
      { label: '頻繁にしている', score: [0,0,0,3,0,0,0] },
      { label: 'してみたさはある', score: [0,0,0,2,0,0,0] },
      { label: '興味なし！', score: [0,0,0,0.1,0,0,0] },
    ],
  },
    {
   //  質問（貧困・飢餓）ポジ
    text: 'お腹を空かせている子がいたら助けてあげる？',
    choices: [
      { label: 'もちろん！', score: [0,3,0,1,0,0,0] },
      { label: 'できる範囲で', score: [0,2,0,0.5,0.5,0,0] },
      { label: '正直見ないふりする',     score: [0,0.1,0,0,0,0,0] },
    ],
  },
  {
    //  質問（ジェンダー平等）ポジ
    text: 'ジェンダーや人権について考えることはある？',
    choices: [
      { label: '常に考えてる', score: [0,0,0,1,3,1,0] },
      { label: '時々考える', score: [0,0,0,1,2,0,0] },
      { label: 'まったく考えない', score: [0,0,0,0.5,0.5,0,0] },
    ],
  },
];

const addScores = (a: ScoreVector7, b: ScoreVector7): ScoreVector7 =>
  a.map((val, i) => val + b[i]);

const dotProduct = (a: ScoreVector7, b: ScoreVector7): number =>
  a.reduce((sum, val, i) => sum + val * b[i], 0);

const getBestSDGGoal = (score: ScoreVector7): string => {
  let maxScore = -Infinity;
  let bestGoal = '';
  for (const key in finalSdgsWeights) {
    const { name, weight } = finalSdgsWeights[Number(key)];
    const val = dotProduct(score, weight);
    if (val > maxScore) {
      maxScore = val;
      bestGoal = name;
    }
  }
  return bestGoal;
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState<ScoreVector7>([0,0,0,0,0,0,0]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (scoreToAdd: ScoreVector7) => {
    setTotalScore(prev => addScores(prev, scoreToAdd));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setTotalScore([0,0,0,0,0,0,0]);
    setIsFinished(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        padding: 4,
        textAlign: 'center',
      }}
    >
      {!isFinished ? (
        <Question
          text={questions[currentIndex].text}
          choices={questions[currentIndex].choices}
          onAnswer={handleAnswer}
        />
      ) : (
        <Result
          resultText={getBestSDGGoal(totalScore)}
          scores={totalScore}
          onReset={reset}
          categories={categories}
        />
      )}
    </Box>
  );
}