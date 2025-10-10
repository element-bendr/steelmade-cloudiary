// Framer Motion animation variants for homepage interactions
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const scaleOnHover = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const buttonHover = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.98
  }
};

// Reduced motion variants for accessibility
export const reduceMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

export const slideInFromLeft = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const slideInFromRight = {
  hidden: {
    opacity: 0,
    x: 30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};