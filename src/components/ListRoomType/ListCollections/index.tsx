import LeftSpacePaddingHorizontalScroll from 'components/GlobalComponents/LeftSpacePaddingHorizontalScroll';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import React, { FC, memo, ReactElement } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
import { COLOR_INFO, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { hp, stylesGlobal, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

interface IProps extends NavigationInjectedProps {
  title: string,
  typeData: string,
  data: any[],
  total: number,
  _renderItem: (item?: any, index?: any) => ReactElement;
}

const ListCollections: FC<IProps> = (props) => {
  const { title, data, _renderItem, total, typeData, navigation } = props;
  const { t } = useTranslation();
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

      <TouchableWithScale _onPress={() => navigation.navigate('CollectionScreen', { typeDataCollection: typeData, titleCollection: title })}>
        <Text style={[styles.txtAll]}>
          {t('shared:showAll')} {`(${total}+)`} &#10095;
        </Text>
      </TouchableWithScale>
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

export default compose(
  memo,
  withNavigation,
)(ListCollections);
