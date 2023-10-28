import axios from 'axios';
import { useState , useEffect} from 'react';
import {
  Container,
  Grid,
  TextField,
  Modal,
  Button,
  Typography,
  Box,
} from '@mui/material';
import PhotoCard from './components/PhotoCard';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          'https://api.unsplash.com/photos',
          {
            headers: {
              Authorization: 'Client-ID rTmcG6ErgCenVywJfJOarKPpYpQ-XuFBx3y43jDb238',
            },
          }
        );
        setPhotos(response.data);
      } catch (error) {
        setError('Error fetching initial photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPhotos();
  }, []);

  const fetchUserDetails = async (username) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${username}`,
        {
          headers: {
            Authorization: 'Client-ID rTmcG6ErgCenVywJfJOarKPpYpQ-XuFBx3y43jDb238',
          },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQuery}`,
        {
          headers: {
            Authorization: 'Client-ID rTmcG6ErgCenVywJfJOarKPpYpQ-XuFBx3y43jDb238',
          },
        }
      );
      setPhotos(response.data.results);
    } catch (error) {
      setError('Error fetching photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    const trimmedQuery = event.target.value;
    setSearchQuery(trimmedQuery);
    handleSearch();
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    fetchUserDetails(photo.user.username);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalOpen(false);
    setUserInfo(null);
  };

  return (
    <Container>
      <TextField
        label="Search Photos"
        value={searchQuery}
        onChange={handleSearchInputChange}
        fullWidth
        sx={{ mt: 4, mb: 2, mx: 'auto', display: 'block' }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <PhotoCard photo={photo} onCardClick={openModal} />
          </Grid>
        ))}
      </Grid>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <img src={selectedPhoto?.urls.regular} alt={selectedPhoto?.alt_description} />
          <Typography variant="h6">{selectedPhoto?.user.name}</Typography>
          <Typography variant="body2">Likes: {selectedPhoto?.likes}</Typography>
          {selectedPhoto && (
            <a
              href={selectedPhoto.urls.full}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" color="primary">
                Download High-Quality Image
              </Button>
            </a>
          )}
          {userInfo && (
            <>
              <Typography variant="h6">User Information</Typography>
              <Typography variant="body2">Username: {userInfo.username}</Typography>
              <Typography variant="body2">Bio: {userInfo.bio}</Typography>
            </>
          )}
          <Button onClick={closeModal} color="primary" variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
