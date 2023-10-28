import React from 'react';

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={photo.urls.regular} alt={photo.alt_description} />
        <p>User: {photo.user.username}</p>
        <p>Likes: {photo.likes}</p>
        {/* Add other details here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PhotoModal;
