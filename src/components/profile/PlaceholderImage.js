import React from 'react';
import Base64Image from '../base64image/Base64Image';

const PlaceholderImage = props => (
  <Base64Image image="testable.placeholder.svg" alt="buggy" {...props}/>
);
export default PlaceholderImage;
