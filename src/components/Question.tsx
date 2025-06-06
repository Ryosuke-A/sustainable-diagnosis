import { Box, Typography } from '@mui/material';
import Circle from './Circle';

type ScoreVector7 = number[];

interface Choice {
  label: string;
  score: ScoreVector7;
}

interface QuestionProps {
  text: string;
  choices: Choice[];
  onAnswer: (score: ScoreVector7) => void;
}

export default function Question({ text, choices, onAnswer }: QuestionProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {text}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {choices.map((choice, index) => (
          <Box
            key={index}
            onClick={() => onAnswer(choice.score)}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 120, // 固定幅で中央揃えを安定
            }}
          >
            <Circle color={['#FF6F61', '#6A5ACD', '#20B2AA'][index % 3]} />
            <Typography
              sx={{
                mt: 1,
                wordBreak: 'break-word',
                fontSize:
                  choice.label.length > 20
                    ? '0.7rem'
                    : choice.label.length > 10
                    ? '0.8rem'
                    : '0.9rem',
              }}
            >
              {choice.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
