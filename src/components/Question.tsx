import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {text}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isSmallScreen ? 4 : 8,
        }}
      >
        {choices.map((choice, index) => (
          <Box
            key={index}
            onClick={() => onAnswer(choice.score)}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
              minWidth: 100,
              flex: '1 1 120px', // 幅に余裕があれば横に並び、狭いときは折り返す
            }}
          >
            <Circle color={['#FF6F61', '#6A5ACD', '#20B2AA'][index % 3]} />
            <Typography sx={{ mt: 1 }}>{choice.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}