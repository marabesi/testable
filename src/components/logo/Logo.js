import React from 'react';
import Base64Image from '../base64image/Base64Image';

const Logo = props => (
  <Base64Image
    image="testable.logo.png"
    alt="logo"
    title="Testable - Ferramenta gamificada" {...props}
  />
);
export default Logo;
