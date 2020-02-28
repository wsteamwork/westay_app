import RoomTypeCard from 'components/GlobalComponents/Cards/RoomTypeCard';
import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { wp } from 'utils/responsive';

interface IProps {
  data: any[]
}

const ListRoomType: FC<IProps> = (props) => {
  const { data } = props;

  const _renderItem = (item: TypeApartment, index: number) => {
    return (
      <View style={{ paddingHorizontal: wp('1%'), flex: 1 }} key={index}>
        <RoomTypeCard item={item} />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        renderItem={({ item, index }) => _renderItem(item, index)}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: wp('1%') }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ListRoomType;
