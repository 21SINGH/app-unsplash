import { Height } from '@mui/icons-material';
import { width } from '@mui/system';
import React from 'react';

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="modal">
      <div
       className="modal-content"
       >
        <img style={
        {Height : "auto",
        width : "auto"}
      }  src={photo.urls.regular} alt={photo.alt_description} />
        <p>User: {photo.user.username}</p>
        <p>Likes: {photo.likes}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PhotoModal;
