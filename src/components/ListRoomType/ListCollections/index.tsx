import React, {FC, ReactElement} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {wp, hp, stylesGlobal} from 'utils/responsive';
import {COLOR_INFO} from 'styles/global.style';

interface IProps {
  title: string,
  data: any[],
  _renderItem: (item?: any, index?:any) => ReactElement;
}

const ListCollections: FC<IProps> = (props) => {
  const { title, data, _renderItem } = props;

  return (
    <View>
      <Text style={stylesGlobal.titleGlobal}>
        {title}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        renderItem={({item, index}) => _renderItem(item, index)}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.txtAll}>
        Show all (99+) &#10095;
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txtAll:{
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: COLOR_INFO
  }
});

export default ListCollections;
