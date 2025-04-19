import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const ArticleCard = ({ title, description, path }) => {
  return (
    <StyledCard>
      <CardActionArea component={Link} to={path} sx={{ height: '100%' }}>
        <StyledCardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="primary">
              Read More →
            </Typography>
          </Box>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ArticleCard; 