import React from 'react';
import PropTypes from 'prop-types';
import { track } from '../../emitter/Tracking';

const Base64Image = (props: {image: string, alt: string}) => (
  <img
    onClick={() => track({
      section: props.image,
      action: 'image_click'
    })}
    src={window.localStorage.getItem(props.image) || ''}
    {...props}
    alt={props.alt}
  />
);

export default Base64Image;

Base64Image.propTypes = {
  image: PropTypes.string
};