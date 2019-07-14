import { spring } from 'react-router-transition';

/**
 * @param {object} styles
 */
export function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

/**
 * @param {Number} val
 */
function bounce(val) {
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