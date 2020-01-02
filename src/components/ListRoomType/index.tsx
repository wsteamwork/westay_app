import React, { FC } from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { wp, hp } from 'utils/responsive';
import RoomTypeCard from 'components/GlobalComponents/Cards/RoomTypeCard';

interface IProps {
  // roomsType: TypeApartment[]
}

const ListRoomType: FC<IProps> = (props) => {
  const {  } = props;

  const arrayData = [
    { id: 1, value: "Full House", image: 'https://m.westay.vn/static/images/property/house.jpg' },
    { id: 2, value: "Apartment", image: "https://m.westay.vn/static/images/property/apartment.jpg" },
    { id: 3, value: "Villa", image: "https://m.westay.vn/static/images/property/villa.jpg" },
    { id: 4, value: "Private Room", image: "https://m.westay.vn/static/images/property/room.jpg" },
    { id: 5, value: "Hotel", image: "https://m.westay.vn/static/images/property/hotels.jpg" },
    { id: 6, value: "Studio", image: "https://m.westay.vn/static/images/property/studio.jpg" }
  ];

  // @ts-ignore
  const _renderItem = ({item, index}) => {
    return (
      <View style={{ paddingHorizontal: wp('2%') }} key={index}>
        <RoomTypeCard item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        // style={{ marginLeft: wp('2%') }}
        showsHorizontalScrollIndicator={false}
        data={arrayData}
        horizontal
        renderItem={_renderItem}
        extraData={arrayData}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'yellow'

  },
});

export default ListRoomType;
