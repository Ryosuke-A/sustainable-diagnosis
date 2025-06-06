import { Box, Typography, Button, LinearProgress, Stack } from '@mui/material';

interface ResultProps {
  resultText: string;
  scores: number[]; // 7カテゴリの最終スコア
  onReset: () => void;
  categories: string[]; // カテゴリ名配列
}

export default function Result({ resultText, scores, onReset, categories }: ResultProps) {
  const maxScore = Math.max(...scores);

  return (
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 480 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: '#000' }}>
        診断結果
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, color: '#000' }}>
        あなたは <strong>{resultText}</strong> に最も関心があります。
      </Typography>

      <Stack spacing={3} sx={{ mb: 4, color: '#000' }}>
        {categories.map((cat, i) => (
          <Box key={cat}>
            <Typography variant="subtitle1" gutterBottom>
              {cat}： {scores[i].toFixed(2)} 点
            </Typography>
            <LinearProgress
              variant="determinate"
              value={maxScore === 0 ? 0 : (scores[i] / maxScore) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        ))}
      </Stack>

      <Button variant="contained" onClick={onReset}>
        もう一度診断する
      </Button>
    </Box>
  );
}