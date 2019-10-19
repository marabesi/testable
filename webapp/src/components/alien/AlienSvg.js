import React from 'react';
import Base64Image from '../base64image/Base64Image';

const AlienSvg = props => (
  <Base64Image image="testable.alien.png" alt="alien" {...props}/>
);

export const AlienRocket = props => (
  <Base64Image image="testable.alien-rocket.png" alt="alien rocket" {...props}/>
);

export default AlienSvg;
