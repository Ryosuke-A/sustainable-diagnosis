import { Box, Typography, useMediaQuery } from '@mui/material';
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
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {text}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 4 : 8,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {choices.map((choice, index) => {
          const length = choice.label.length;
          let fontSize = '1rem';
          if (length > 30) fontSize = '0.6rem';
          else if (length > 20) fontSize = '0.75rem';
          else if (length > 12) fontSize = '0.85rem';

          return (
            <Box
              key={index}
              onClick={() => onAnswer(choice.score)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 140,
                height: 160,
                justifyContent: 'center',
              }}
            >
              <Circle color={['#FF6F61', '#6A5ACD', '#20B2AA'][index % 3]} />
              <Box
                sx={{
                  mt: 1,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {choice.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
