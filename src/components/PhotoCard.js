import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const PhotoCard = ({ photo, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(photo);
  };

  return (
    <Card
      className='gallery'
      onClick={handleCardClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="auto"
        image={photo.urls.small}
        alt={photo.alt_description}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {photo.user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Likes: {photo.likes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
