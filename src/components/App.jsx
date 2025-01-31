import React, { Component } from 'react';
import SearchBar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import { fetchImages } from 'services/imagesApi';
import styles from './App.module.css';
import Loader from './loader/Loader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      error: null,
      query: '',
      page: 1,
      isLoading: false,
      hasMoreImages: true,
    };
  }

  onSubmit = query => {
    this.setState({ query, page: 1, images: [], isLoading: true }, () => {
      this.loadImages(query, 1);
    });
  };

  loadImages = async (query, page) => {
    try {
      const data = await fetchImages(query, page); 

      this.setState(prevState => {
        const newImages = [...prevState.images, ...data.hits];
        const totalImages = data.totalHits;
        const hasMore = newImages.length < totalImages && data.hits.length > 0;

        return {
          images: newImages,
          isLoading: false,
          hasMoreImages: hasMore,
        };
      });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      console.error('Fetch error:', error);
    }
  };

  
  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, isLoading: true }),
      () => {
        this.loadImages(this.state.query, this.state.page);
      }
    );
  };

  render() {
    const { query, images, isLoading, hasMoreImages } = this.state;
    return (
      <div className={styles.app}>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} />
        {query && images.length > 0 && hasMoreImages && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {query && isLoading && <Loader visible={isLoading} />}
      </div>
    );
  }
}
