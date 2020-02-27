// import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import CollectionsSquareCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsSquareCard';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import React, { FC, Fragment, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
import { getHomePageCollection } from 'store/Hooks/CardRoomHooks';
import { COLOR_INFO, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { IDataCollections } from 'types/Rooms/RoomRequests';
import { stylesGlobal, wp } from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  typeData: string,
  title: string
}

const ListCollectionsSquare: FC<IProps> = (props) => {
  const { typeData, title, navigation } = props;
  const [dataRooms, setDataRooms] = useState<IDataCollections>({ data: [], meta: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    getHomePageCollection(typeData, 10).then((res) => setDataRooms({ data: res.data.data, meta: res.data.meta!.pagination.total }));
  }, []);

  return (
    <View>
      <Text style={stylesGlobal.titleGlobal}>
        {title}
      </Text>

      {/*{dataRooms.length ? (*/}
      <View style={styles.container}>
        {dataRooms.data.map((room, i) => (
          i < 4 ? (
            <Fragment key={i} >
              <CollectionsSquareCard room={room} />
            </Fragment>
          ) : null
        ))}
      </View>
      {/*) : ''}*/}

      <TouchableWithScale _onPress={() => navigation.navigate('CollectionScreen', { typeDataCollection: typeData, titleCollection: title })}>
        <Text style={styles.txtAll}>
          Show all {`(${dataRooms.meta}+)`} &#10095;
        </Text>
      </TouchableWithScale>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: wp('90%')
  },
  txtAll: {
    // marginTop: hp('0%'),
    fontSize: SIZE_TEXT_SUBTITLE,
    color: COLOR_INFO
  },
});

export default compose(
  memo,
  withNavigation,
)(ListCollectionsSquare);
