import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { setAccommodationType, setArrayRentType } from 'store/actions/search/searchActions';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { wp } from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  item: TypeApartment
}

const RoomTypeCard: FC<IProps> = (props) => {
  const { item, navigation } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAccommodationType(item.id));
    dispatch(setArrayRentType([{ name: item.value, checked: true, id: item.id }]));
    navigation.navigate('ListRooms');
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleClick}
    >
      <Avatar
        size={wp('13%')}
        source={{ uri: item.image }}
        rounded
        renderPlaceholderContent={<ActivityIndicator />}
        containerStyle={{ marginBottom: 8 }}
      />
      <Text style={{ textAlign: 'center', fontSize: 12 }} numberOfLines={1}>
        {item.value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // height: hp('15%'),
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'flex-end',
    width: wp('20%')
  },
});

export default withNavigation(RoomTypeCard);
