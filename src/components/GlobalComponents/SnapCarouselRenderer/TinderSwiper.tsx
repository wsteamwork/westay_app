import React, { FC, ReactNode } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './styles/index.style';
import { itemWidth, sliderWidth } from './styles/SliderEntry.style';
interface IProps {
  dataSwiper: Array<any>;
  _renderItem: (item: any) => ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  customStyles?: any;
  itemWidth?: number;
  sliderWidth?: number;
};

const TinderSwiper: FC<IProps> = (props) => {
  const { dataSwiper, _renderItem, autoplay, autoplayDelay, customStyles, itemWidth, sliderWidth } = props;
  return (
    <Carousel
      data={dataSwiper}
      renderItem={({ item }) => _renderItem(item)}
      sliderWidth={sliderWidth}
      layoutCardOffset={-10}
      itemWidth={itemWidth}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={customStyles}
      layout={'tinder'}
      loop={true}
    />
  );
};
TinderSwiper.defaultProps = {
  customStyles: styles.sliderContentContainer,
  itemWidth: itemWidth,
  sliderWidth: sliderWidth
}

export default TinderSwiper;
