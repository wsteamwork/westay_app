import React, {FC, ReactElement} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DefaultSwiper from 'components/GlobalComponents/SnapCarouselRenderer/DefaultSwiper';
import {wp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';

interface IProps {
  data: any[],
  title:string,
  _renderItem: (item?: any, index?:any) => ReactElement;
}

const ListDestinations: FC<IProps> = (props) => {
  const { data, title, _renderItem } = props;

  return (
    <View>
      <Text style={styles.title}>
        {title}
      </Text>
      <DefaultSwiper
        customStylesContainer={styles.boxSlider}
        isParallax
        infinite={false}
        firstItemIndex={0}
        itemWidth={wp('90%')}
        _renderItem={(item, index) => _renderItem(item, index)}
        dataSwiper={data}/>
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
    paddingHorizontal:wp('5%'),
    fontSize: wp('6%'),
    fontWeight: '700',
    color: COLOR_TEXT_DEFAULT
  },
  boxSlider:{} // important , dont remove this class
});

export default ListDestinations;
