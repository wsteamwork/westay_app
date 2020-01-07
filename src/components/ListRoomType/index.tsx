import React, { FC } from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { wp, hp } from 'utils/responsive';
import RoomTypeCard from 'components/GlobalComponents/Cards/RoomTypeCard';
import {TypeApartment} from 'types/Rooms/RoomResponses';

interface IProps {
  data: any[]
}

const ListRoomType: FC<IProps> = (props) => {
  const { data } = props;

  const _renderItem = (item: TypeApartment, index: number) => {
    return (
      <View style={{ paddingRight: wp('2%') }} key={index}>
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
        renderItem={({item, index}) => _renderItem(item, index)}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ListRoomType;
