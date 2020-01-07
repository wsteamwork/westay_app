// import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import CollectionsSquareCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsSquareCard';
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_INFO, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { hp, stylesGlobal, wp } from 'utils/responsive';

interface IProps {
  typeData: string,
  title: string
}

const ListCollectionsSquare: FC<IProps> = (props) => {
  const { typeData, title } = props;
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();

  const fakeData = [
    { id: 1, value: "Full House", image: 'https://m.westay.vn/static/images/property/house.jpg' },
    { id: 2, value: "Apartment", image: "https://m.westay.vn/static/images/property/apartment.jpg" },
    { id: 3, value: "Villa", image: "https://m.westay.vn/static/images/property/villa.jpg" },
    { id: 4, value: "Private Room", image: "https://m.westay.vn/static/images/property/room.jpg" }
  ];

  // useEffect(() => {
  //   getHomePageCollection(typeData, 4).then((res) => setDataRooms(res));
  // }, []);

  return (
    <View>
      <Text style={stylesGlobal.titleGlobal}>
        {title}
      </Text>

      {/*{dataRooms.length ? (*/}
      <View style={styles.container}>
        {fakeData.map((room, i) => (
          <Fragment key={i} >
            <CollectionsSquareCard item={room} />
          </Fragment>
        ))}
      </View>
      {/*) : ''}*/}

      <Text style={styles.txtAll}>
        Show all (99+) &#10095;
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
