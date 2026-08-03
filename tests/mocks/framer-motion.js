import React from "react";

// Create a factory for motion components
const createMotionComponent = (tag) => {
  return React.forwardRef((props, ref) => {
    // Strip out framer-motion specific props
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      whileInView,
      whileDrag,
      viewport,
      layout,
      layoutId,
      onAnimationStart,
      onAnimationComplete,
      onHoverStart,
      onHoverEnd,
      onTap,
      onDragStart,
      onDragEnd,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      dragTransition,
      style,
      children,
      ...cleanProps
    } = props;

    return React.createElement(tag, { ...cleanProps, ref, style }, children);
  });
};

// Motion object that supports any HTML tag
export const motion = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (typeof prop === "string") {
        return createMotionComponent(prop);
      }
      return undefined;
    },
  },
);

// AnimatePresence just renders children
export const AnimatePresence = ({ children }) => {
  return children;
};

// Mock other framer-motion exports
export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
  set: () => {},
});

export const useMotionValue = (initial) => ({
  get: () => initial,
  set: () => {},
  on: () => () => {},
});

export const useTransform = (value, input, output) => {
  return output?.[0] ?? 0;
};

export const useScroll = () => ({
  scrollY: { get: () => 0, set: () => {}, on: () => () => {} },
  scrollYProgress: { get: () => 0, set: () => {}, on: () => () => {} },
  scrollX: { get: () => 0, set: () => {}, on: () => () => {} },
  scrollXProgress: { get: () => 0, set: () => {}, on: () => () => {} },
});

export const useSpring = (value) => value;

export const useInView = () => true;

export const useReducedMotion = () => false;

export const LayoutGroup = ({ children }) => children;

export const MotionConfig = ({ children }) => children;

export default {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
  LayoutGroup,
  MotionConfig,
};
