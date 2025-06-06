import { Box } from '@mui/material';

export default function Circle({ color = '#4CAF50', size = 120 }: { color?: string; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    />
  );
}