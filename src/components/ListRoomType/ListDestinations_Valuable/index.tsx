import DefaultSwiper from 'components/GlobalComponents/SnapCarouselRenderer/DefaultSwiper';
import React, { FC, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { stylesGlobal, wp } from 'utils/responsive';
import { itemWidth } from 'components/GlobalComponents/SnapCarouselRenderer/styles/SliderEntry.style';

interface IProps {
  data: any[],
  title: string,
  _renderItem: (item?: any, index?: any) => ReactElement;
  itemWidth?: number;
}

const ListDestinations: FC<IProps> = (props) => {
  const { data, title, _renderItem, itemWidth } = props;

  return (
    <View>
      <Text style={[stylesGlobal.titleGlobal, styles.title]}>
        {title}
      </Text>
      <View>

        <DefaultSwiper
          inactiveOpacity={0.5}
          inactiveScale={0.95}
          customStylesContainer={styles.boxSlider}
          isParallax
          infinite={true}
          firstItemIndex={0}
          itemWidth={itemWidth}
          _renderItem={(item, index) => _renderItem(item, index)}
          dataSwiper={data} />
      </View>
    </View>
  );
};
ListDestinations.defaultProps = {
  itemWidth: wp('87%')
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: wp('5%'),
  },
  boxSlider: {
    // height: 240
  } // important , dont remove this class
});

export default ListDestinations;
