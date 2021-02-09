import Base64Image from '../../utilities/base64image/Base64Image';

const AlienSvg = (props: any) => (
  <Base64Image image="testable.alien.png" alt="alien" {...props}/>
);

export const AlienRocket = (props: any) => (
  <Base64Image image="testable.alien-rocket.png" alt="alien rocket" {...props}/>
);

export default AlienSvg;
