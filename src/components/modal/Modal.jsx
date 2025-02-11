import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, alt, onClose }) => {
  //folosim useCallback pentru a evita re-renderizarea inutila a componentei la fiecare apasare
  //a butonului "Escape"
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  //folosim useEffect pentru a adauga si elimina event listener-ul pentru apasarea butonului "Escape"
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      //similiar cu componentWillUnmount
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <img className={styles.largeImage} src={largeImageURL} alt={alt} />
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
