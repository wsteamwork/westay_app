import React, { FC, ReactNode } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './styles/index.style';
import { itemWidth, sliderWidth } from './styles/SliderEntry.style';
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
  frctionOption?: number;
  tensionOption?: number;
};

const MomentumSwiper: FC<IProps> = (props) => {
  const { dataSwiper, _renderItem, autoplay, autoplayDelay, customStylesContent, customStylesContainer, itemWidth, sliderWidth, inactiveScale, inactiveOpacity, frctionOption, tensionOption } = props;
  return (
    <Carousel
      data={dataSwiper}
      renderItem={({ item }) => _renderItem(item)}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideScale={inactiveScale}
      inactiveSlideOpacity={inactiveOpacity}
      enableMomentum={true}
      activeSlideAlignment={'start'}
      containerCustomStyle={customStylesContainer}
      contentContainerCustomStyle={customStylesContent}
      activeAnimationType={'spring'}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      //@ts-ignore
      activeAnimationOptions={{
        friction: frctionOption,
        tension: tensionOption
      }}
    />
  );
};
MomentumSwiper.defaultProps = {
  customStylesContent: styles.sliderContentContainer,
  customStylesContainer: styles.slider,
  itemWidth: itemWidth,
  sliderWidth: sliderWidth,
  inactiveScale: 0.95,
  frctionOption: 4,
  tensionOption: 40,
  inactiveOpacity: 0.4,
  autoplay: false,
  autoplayDelay: 500
}

export default MomentumSwiper;
