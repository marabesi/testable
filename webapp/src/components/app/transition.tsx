import { spring } from 'react-router-transition';

export function mapStyles(styles: { opacity: any; scale: any; }) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val: number) {
  return spring(val, {
    stiffness: 180,
    damping: 12,
  });
}

export const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: 1
  }
};