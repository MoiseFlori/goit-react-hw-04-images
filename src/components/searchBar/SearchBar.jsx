import React, { useState} from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css'; 

const  SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

 const  handleInputChange = event => {
    setQuery(event.target.value);
  };

 const  handleSubmit = event => {
    event.preventDefault();
      onSubmit(query);
      setQuery('');
    
  };

   

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.searchFormButton}>
          </button>
          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
