import React, { FC, ReactNode } from 'react';
import { Platform, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles/index.style';
import { itemWidth, sliderWidth } from './styles/SliderEntry.style';
import { animatedStyles1, animatedStyles2, animatedStyles3, animatedStyles4, scrollInterpolator1, scrollInterpolator2, scrollInterpolator3, scrollInterpolator4 } from './utils/animations';
interface IProps {
  dataSwiper: Array<any>;
  _renderItem: (item?: any) => ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  customStylesContent?: any;
  customStylesContainer?: any;
  itemWidth?: number;
  sliderWidth?: number;
  inactiveScale?: number;
  inactiveOpacity?: number;
  infinite?: boolean;
  isParallax?: boolean;
  inactiveShift?: number;
  refNumber: 1 | 2 | 3 | 4;
};

const IOSCustomSwiper: FC<IProps> = (props) => {
  const { dataSwiper, _renderItem, autoplay, autoplayDelay,
    inactiveScale, inactiveOpacity, infinite, customStylesContent, customStylesContainer, itemWidth, sliderWidth, refNumber } = props;
  const scrollInterpolators = [
    scrollInterpolator1, scrollInterpolator2, scrollInterpolator3, scrollInterpolator4
  ];
  const animatedStyles = [
    animatedStyles1, animatedStyles2, animatedStyles3, animatedStyles4
  ]
  const IS_ANDROID = Platform.OS === 'android';

  return (
    !IS_ANDROID ? (
      <Carousel
        data={dataSwiper}
        renderItem={({ item }) => _renderItem(item)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={customStylesContainer}
        contentContainerCustomStyle={customStylesContent}
        autoplay={autoplay}
        inactiveScale={inactiveScale}
        inactiveOpacity={inactiveOpacity}
        autoplayDelay={autoplayDelay}
        loop={infinite}
        scrollInterpolator={scrollInterpolators[refNumber]}
        // @ts-ignore
        slideInterpolatedStyle={animatedStyles[refNumber]}
        useScrollView={true}
      />) : <View></View>
  );
};
IOSCustomSwiper.defaultProps = {
  customStylesContent: styles.sliderContentContainer,
  customStylesContainer: styles.slider,
  itemWidth: itemWidth,
  sliderWidth: sliderWidth,
  inactiveScale: 1,
  inactiveOpacity: 1,
  autoplay: false,
  autoplayDelay: 500,
  infinite: true,
  isParallax: true
}

export default IOSCustomSwiper;
