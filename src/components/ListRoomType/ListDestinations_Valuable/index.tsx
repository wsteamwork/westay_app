import DefaultSwiper from 'components/GlobalComponents/SnapCarouselRenderer/DefaultSwiper';
import React, { FC, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BOLD, COLOR_TEXT_DEFAULT, SIZE_TEXT_TITLE, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import {wp, stylesGlobal} from 'utils/responsive';

interface IProps {
  data: any[],
  title: string,
  _renderItem: (item?: any, index?: any) => ReactElement;
}

const ListDestinations: FC<IProps> = (props) => {
  const { data, title, _renderItem } = props;

  return (
    <View>
      <Text style={[stylesGlobal.titleGlobal, styles.title]}>
        {title}
      </Text>
      <DefaultSwiper
        inactiveOpacity={0.5}
        inactiveScale={0.95}
        customStylesContainer={styles.boxSlider}
        isParallax
        infinite={true}
        firstItemIndex={0}
        itemWidth={wp('87%')}
        _renderItem={(item, index) => _renderItem(item, index)}
        dataSwiper={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: wp('5%'),
  },
  boxSlider: {} // important , dont remove this class
});

export default ListDestinations;
