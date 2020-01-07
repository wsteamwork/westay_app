import React, { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import { SIZE_TEXT_CONTENT } from 'styles/global.style';

interface IProps {
  item: TypeApartment
}

const RoomTypeCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('click', 'ban da click')
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleClick}
    >
      <Avatar
        size={60}
        source={{ uri: item.image }}
        rounded
        renderPlaceholderContent={<ActivityIndicator />}
        containerStyle={{ marginBottom: 8 }}
      />
      <Text style={{ textAlign: 'center', fontSize: SIZE_TEXT_CONTENT }} numberOfLines={1}>
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
    width: wp('21%')
  },
});

export default RoomTypeCard;
