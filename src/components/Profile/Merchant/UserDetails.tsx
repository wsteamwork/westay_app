import React, {FC, useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CollectionsSquareCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsSquareCard';
import {wp, hp} from 'utils/responsive';
import {RoomIndexRes} from 'types/Rooms/RoomResponses';
import {useSelector} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {RoomReviewIndexResponse} from 'types/Rooms/RoomReviewIndexResponse';
import {LTRoomIndexRes} from 'types/LTR/LTRoom/LTRoom';

interface IProps {

}

const UserDetails: FC<IProps> = (props) => {
  const { } = props;
  const userRooms = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.userProfile.userRooms
  );

  const _renderItem = (item: RoomIndexRes, index: number) => {
    return (

        <CollectionsSquareCard avatar = {item.avatar_image}
                               district = {item.district.data.name}
                               city = {item.city.data.name}
                               name = {item.room_name}
                               idRoom = {item.id}
                               number_bedroom = {item.number_bed}
                               total_area = {null} />

    );
  };

  const totalReview = useMemo<number>(() => {
    let total = 0;
    if (!!userRooms) {
      userRooms.forEach((item) => {
        total += item.total_review;
      });
    }
    return total;
  }, [userRooms]);

  const reviewArray = useMemo<RoomReviewIndexResponse[]>(() => {
    let array: RoomReviewIndexResponse[] = [];
    if (!!userRooms) {
      const reviews = userRooms.map((room) => room.reviews.data);
      reviews.forEach((review) => {
        array = array.concat(review);
      });
    }
    return array;
  }, [userRooms]);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={userRooms}
      renderItem={({ item, index }) => _renderItem(item, index)}
      extraData={userRooms}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.bodyContainer}
    />
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: hp('35%'),
    paddingTop: hp('5%'),
    justifyContent: 'space-between',
  },
});

export default UserDetails;
