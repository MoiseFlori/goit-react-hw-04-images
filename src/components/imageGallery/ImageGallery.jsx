import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import {nanoid} from 'nanoid';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ul className={styles.imageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={nanoid()}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            alt={tags}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
};

export default ImageGallery;
