import React, { useState, useEffect } from 'react';
import './assignment2.css';

const Assign1=()=>  {
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  const photosPerPage = 100;

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    
      const response = await fetch(`${apiUrl}?_page=${page}&_limit=${photosPerPage}`);
      const newPhotos = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setPage(page + 1);
    
  };

  useEffect(() => {
    fetchPhotos();
  }, []); 

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      fetchPhotos();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <div className="photo-container">
        {photos.map((photo) => (
          <div className="photo" key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assign1;
