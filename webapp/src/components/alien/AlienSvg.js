import React from 'react';
import Base64Image from '../base64image/Base64Image';

/**
 * @param {object} props 
 */
const AlienSvg = props => (
  <Base64Image image="testable.alien.png" alt="alien" {...props}/>
);
export default AlienSvg;