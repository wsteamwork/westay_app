import { getInputRangeFromIndexes } from 'react-native-snap-carousel';

// Photo album effect
export const scrollInterpolator1 = (index: any, carouselProps: any) => {
  const range = [3, 2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;
  return { inputRange, outputRange };
};
export const animatedStyles1 = (index: number, animatedValue: any, carouselProps: any) => {
  const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [2, 3],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2, 3],
          outputRange: ['-25deg', '0deg', '-3deg', '1.8deg', '0deg'],
          extrapolate: 'clamp',
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2, 3],
          outputRange: [
            -sizeRef * 0.5,
            0,
            -sizeRef, // centered
            -sizeRef * 2, // centered
            -sizeRef * 3, // centered
          ],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};

// Perspective effect
export const scrollInterpolator2 = (index: any, carouselProps: any) => {
  const range = [2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
};
export const animatedStyles2 = (index: any, animatedValue: any, carouselProps: any) => {
  const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1, 2],
      outputRange: [0.75, 1, 0.6, 0.4],
    }),
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: ['0deg', '0deg', '5deg', '8deg'],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0.96, 1, 0.85, 0.7],
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0, 0, -sizeRef + 30, -sizeRef * 2 + 45],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};

// Left/right translate effect
export const scrollInterpolator3 = (index: any, carouselProps: any) => {
  const range = [2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
};
export const animatedStyles3 = (index: any, animatedValue: any, carouselProps: any) => {
  const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1, 2],
      outputRange: [1, 1, 0.75, 0.5],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0, 0, -sizeRef * 2, -sizeRef],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};

// From https://codeburst.io/horizontal-scroll-animations-in-react-native-18dac6e9c720
export const scrollInterpolator4 = (index: any, carouselProps: any) => {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
};
export const animatedStyles4 = (index: any, animatedValue: any, carouselProps: any) => {
  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.75, 1, 0.75],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        perspective: 1000,
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.65, 1, 0.65],
          extrapolate: 'clamp',
        }),
      },
      {
        rotateX: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['30deg', '0deg', '30deg'],
          extrapolate: 'clamp',
        }),
      },
      {
        rotateY: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['-30deg', '0deg', '30deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};
