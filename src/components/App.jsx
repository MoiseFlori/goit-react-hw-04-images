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
  componentDidUpdate(prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, isLoading: true }, () => {
        this.loadImages(this.state.query, 1);
      });
    }

    if (
      prevState.page !== this.state.page &&
      prevState.query === this.state.query
    ) {
      this.loadImages(this.state.query, this.state.page);
    }
  }

  onSubmit = query => {
    this.setState({ query });
  };

  loadImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });

      const data = await fetchImages(query, page);

      if (!data.length) {
        this.setState({ hasMoreImages: false });
        return;
      }

      this.updateImageState(data);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateImageState = newImages => {
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
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
