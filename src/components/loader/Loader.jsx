import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <ColorRing
          visible={this.props.visible}
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
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Loader;
