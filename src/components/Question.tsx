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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        {choices.map((choice, index) => (
          <Box
            key={index}
            onClick={() => onAnswer(choice.score)}
            sx={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <Circle color={['#FF6F61', '#6A5ACD', '#20B2AA'][index % 3]} />
            <Typography sx={{ mt: 1 }}>{choice.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}