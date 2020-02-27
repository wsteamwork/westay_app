import React, { FC, ReactNode } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './styles/index.style';
import { itemWidth, sliderWidth } from './styles/SliderEntry.style';
interface IProps {
  dataSwiper: Array<any>;
  _renderItem: (item?: any, index?: number) => ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  customStylesContent?: any;
  customStylesContainer?: any;
  itemWidth?: number;
  sliderWidth?: number;
  firstItemIndex?: number;
  inactiveScale?: number;
  inactiveOpacity?: number;
  infinite?: boolean;
  isParallax?: boolean;
  inactiveShift?: number;
};

const DefaultSwiper: FC<IProps> = (props) => {
  const { dataSwiper, _renderItem, autoplay, autoplayDelay, customStylesContent, customStylesContainer, itemWidth, sliderWidth, firstItemIndex, inactiveScale, inactiveOpacity, infinite, isParallax, inactiveShift } = props;
  return (
    <Carousel
      data={dataSwiper}
      renderItem={({ item, index }) => _renderItem(item, index)}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={isParallax}
      firstItem={firstItemIndex}
      inactiveSlideScale={inactiveScale}
      inactiveSlideOpacity={inactiveOpacity}
      inactiveSlideShift={inactiveShift}
      containerCustomStyle={customStylesContainer}
      contentContainerCustomStyle={customStylesContent}
      loop={infinite}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      autoplayInterval={3000}
    />
  );
};
DefaultSwiper.defaultProps = {
  customStylesContent: styles.sliderContentContainer,
  customStylesContainer: styles.slider,
  itemWidth: itemWidth,
  sliderWidth: sliderWidth,
  inactiveScale: 0.97,
  inactiveOpacity: 0.7,
  firstItemIndex: 1,
  autoplay: false,
  autoplayDelay: 500,
  infinite: true,
  isParallax: true
}

export default DefaultSwiper;
