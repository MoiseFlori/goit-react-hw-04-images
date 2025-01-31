import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, alt } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <li className={styles.imageGalleryItem} onClick={this.toggleModal}>
          <img
            className={styles.imageGalleryItemImage}
            src={webformatURL}
            alt={alt}
            data-source={largeImageURL}
          />
        </li>

        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={this.toggleModal}
            
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageGalleryItem;
