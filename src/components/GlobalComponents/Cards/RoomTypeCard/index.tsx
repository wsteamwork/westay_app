import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Text, ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-elements';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import {wp, hp} from 'utils/responsive';

interface IProps {
  item: TypeApartment
}

const RoomTypeCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('click','ban da click')
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleClick}
    >
      <Avatar
        size={60}
        source={{uri: item.image}}
        rounded
        renderPlaceholderContent={<ActivityIndicator/>}
        containerStyle={{marginBottom: 8}}
      />
      <Text style={{textAlign:'center'}}>
        {item.value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('15%'),
    alignItems: 'center',
    width: wp('20%')
  },
});

export default RoomTypeCard;
