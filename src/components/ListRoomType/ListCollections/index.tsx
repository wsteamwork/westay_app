import React, { FC, ReactElement } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { wp, hp, stylesGlobal } from 'utils/responsive';
import { COLOR_INFO, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import LeftSpacePaddingHorizontalScroll from 'components/GlobalComponents/LeftSpacePaddingHorizontalScroll'
interface IProps {
  title: string,
  data: any[],
  _renderItem: (item?: any, index?: any) => ReactElement;
}

const ListCollections: FC<IProps> = (props) => {
  const { title, data, _renderItem } = props;

  return (
    <View>
      <Text style={[stylesGlobal.titleGlobal, {
        marginLeft: wp('5%')
      }]}>
        {title}
      </Text>
      <FlatList
        style={{}}
        showsHorizontalScrollIndicator={false}
        data={data}
        ListHeaderComponent={
          <LeftSpacePaddingHorizontalScroll width={wp('5%')} /> //use this instead of marginLeft/paddingLeft to allow scroll over the devices' width (Only for Horizontal)
        }
        horizontal
        renderItem={({ item, index }) => _renderItem(item, index)}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={[styles.txtAll]}>
        Show all (99+) &#10095;
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txtAll: {
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
    fontSize: SIZE_TEXT_SUBTITLE,
    color: COLOR_INFO
  }
});

export default ListCollections;
