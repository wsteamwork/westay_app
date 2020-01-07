import React, { FC } from 'react';
import {StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert} from 'react-native';
import {Image} from 'react-native-elements';
import {hp, wp} from 'utils/responsive';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import {COLOR_TEXT_SUBTITLE} from 'styles/global.style';

interface IProps {
  item: TypeApartment,
  showNumberRoom?: boolean
}

const CollectionsSquareCard: FC<IProps> = (props) => {
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
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.txtAddress}>
        Hoang Mai district
        <Text style={{fontWeight: '700' }}> &#8231; </Text>
        Ha noi
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomName}>
        ten phong kha la dai o day ahihi ahihi hihi haha
      </Text>

      <Text style={styles.txtAreaAndPrice}>
        30 m2
        <Text style={{fontWeight: '700' }}> &#8231; </Text>
        2 room(s)
      </Text>

      <Text numberOfLines={1} style={styles.txtAreaAndPrice}>
        $900 /month
      </Text>

      <Text numberOfLines={1} style={styles.txtRoomType}>
        APARTMENT
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('45%') - 4,
    marginBottom: hp('4%')
  },
  image:{
    height: wp('50%')
  },
  txtAddress:{
    fontSize: wp('3%'),
    fontWeight: '700',
    paddingTop: hp('0.5%')
  },
  txtRoomName:{
    fontWeight:'600',
    fontSize: wp('4.5%'),
    paddingTop:hp('0.5%')
  },
  txtAreaAndPrice:{
    fontWeight:'700',
    color:COLOR_TEXT_SUBTITLE,
    fontSize: wp('4%'),
    paddingTop:hp('0.5%')
  },
  txtRoomType:{
    fontWeight:'bold',
    paddingTop:hp('1%'),
    textTransform: 'uppercase',
  }
});

export default CollectionsSquareCard;
