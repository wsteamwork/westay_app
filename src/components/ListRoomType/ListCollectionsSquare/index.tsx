// import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import React, {FC, Fragment, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_INFO, SIZE_TEXT_SUBTITLE} from 'styles/global.style';
import {hp, stylesGlobal, wp} from 'utils/responsive';
import CollectionsSquareCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsSquareCard';
import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import {IDataCollections} from 'types/Rooms/RoomRequests';

interface IProps {
  typeData: string,
  title: string
}

const ListCollectionsSquare: FC<IProps> = (props) => {
  const { typeData, title } = props;
  const [dataRooms, setDataRooms] = useState<IDataCollections>({data: [], meta: 0});
  const { t } = useTranslation();

  useEffect(() => {
    getHomePageCollection(typeData).then((res) => setDataRooms({data: res.data.data, meta: res.data.data.length}));
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

      <Text style={styles.txtAll}>
        Show all {`(${dataRooms.meta}+)`} &#10095;
      </Text>
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
    marginTop: hp('-2%'),
    fontSize: SIZE_TEXT_SUBTITLE,
    color: COLOR_INFO
  },
});

export default ListCollectionsSquare;
