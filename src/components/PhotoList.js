import React from 'react';

const PhotoList = ({ photos, onPhotoSelect }) => {
  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} onClick={() => onPhotoSelect(photo)}>
          <img src={photo.urls.small} alt={photo.alt_description} />
          <p>User: {photo.user.username}</p>
          <p>Likes: {photo.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
