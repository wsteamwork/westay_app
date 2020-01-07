import React, { FC } from 'react';
import {StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert} from 'react-native';
import {Image} from 'react-native-elements';
import {hp, wp} from 'utils/responsive';
import {TypeApartment} from 'types/Rooms/RoomResponses';

interface IProps {
  item: TypeApartment,
  showNumberRoom?: boolean
}

const CollectionsRectangleCard: FC<IProps> = (props) => {
  const { item, showNumberRoom } = props;

  const handleClick = () => {
    Alert.alert('click','ban da click')
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={{fontWeight:'bold',paddingTop:hp('0.5%')}}>
        ten phong kha la dai o day ahihi ahihi hihi haha
      </Text>
      <Text numberOfLines={1} style={{ paddingTop:hp('0.5%')}}>
        Apartment
        <Text style={{fontWeight: '700' }}> &#8231; </Text>
        Ha noi
      </Text>

      {showNumberRoom && (
        <Text style={{ paddingTop:hp('0.5%')}}>
          30 m2
          <Text style={{fontWeight: '700' }}> &#8231; </Text>
          1 bathroom(s)
          <Text style={{fontWeight: '700' }}> &#8231; </Text>
          2 room(s)
        </Text>
      )}

      <Text numberOfLines={1} style={{fontWeight:'bold', paddingTop:hp('0.5%')}}>
        $900 /month
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('42%'),
    marginRight: 4
  },
  image:{
    height: wp('60%')
  }
});

export default CollectionsRectangleCard;
