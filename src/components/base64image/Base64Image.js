import React from 'react';
import PropTypes from 'prop-types';

const Base64Image = props => (
  <img src={window.localStorage.getItem(props.image)} {...props} />
);

export default Base64Image;

Base64Image.propTypes = {
  image: PropTypes.string
};