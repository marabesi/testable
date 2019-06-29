import React from 'react';
import Base64Image from '../base64image/Base64Image';

const Logo = props => (
  <a href="https://github.com/marabesi/testable" target="_blank" rel="noopener noreferrer">
    <Base64Image
      image="testable.logo.png"
      alt="logo"
      title="Testable - Ferramenta gamificada" {...props}
    />
  </a>
);
export default Logo;
