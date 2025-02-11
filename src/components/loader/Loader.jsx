import React from 'react';
import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = ({ visible }) => {

    return (
      <div className={styles.loaderContainer}>
        <ColorRing
          visible={visible}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass={styles.colorRingWrapper}
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }


Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Loader;
