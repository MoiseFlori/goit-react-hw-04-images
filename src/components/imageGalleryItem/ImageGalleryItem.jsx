import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
  

 const [isModalOpen, setIsModalOpen] = useState(false);

const toggleModal = () => {
  setIsModalOpen(prevState => !prevState);
};


    return (
      <>
        <li className={styles.imageGalleryItem} onClick={toggleModal}>
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
            onClose={toggleModal}
            
          />
        )}
      </>
    );
  }


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageGalleryItem;
