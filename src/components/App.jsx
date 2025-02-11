import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import { fetchImages } from 'services/imagesApi';
import styles from './App.module.css';
import Loader from './loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  // functie pentru a actualiza `query` si a reseta `page` si `images`
  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  // efect pentru a incarca imagini atunci cand `query` sau `page` se schimba
  useEffect(() => {
    
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.hits]);

        const totalImages = data.totalHits;
        setHasMoreImages(
          prevImages => prevImages.length + data.hits.length < totalImages
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  // functie pentru a incarca mai multe imagini
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={onSubmit} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ImageGallery images={images} />
      {query && images.length > 0 && hasMoreImages && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && <Loader visible={isLoading} />}
    </div>
  );
};

export default App;
