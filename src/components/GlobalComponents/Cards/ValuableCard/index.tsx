import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import React, {FC, useContext} from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Image, Rating } from 'react-native-elements';
import { COLOR_TITLE_HEADER, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import {TypeApartment, RoomIndexRes} from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import {IMAGE_STORAGE_XS} from 'types/globalTypes';
import {cleanAccents} from 'utils/mixins';
import {AuthContext} from 'store/context/auth';

interface IProps {
  city: string;
  district: string;
  roomID: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  avg_rating?: number;
  priceDisplay?: number;
}

const ValuableCard: FC<IProps> = (props) => {
  const { roomID, roomName, city, district, roomImage, roomType, avg_rating, priceDisplay } = props;
  const { state : {languageStatus}} = useContext(AuthContext);

  const handleClick = () => {
    Alert.alert('click', 'ban da click')
  };

  return (
    <TouchableWithScale
      style={styles.container}
      _onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: roomImage }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.boxInfo}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.txtRoomName}>
            {roomName}
          </Text>
          <Text numberOfLines={1} style={styles.txtAddress}>
            {languageStatus === 'en' ? cleanAccents(district) : district}
            <Text style={{ fontWeight: '700' }}> &#8231; </Text>
            {languageStatus === 'en' ? cleanAccents(city) : city}
          </Text>
        </View>
        <View style={styles.boxPrice}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "flex-start" }}>
            <Rating
              ratingCount={5}
              startingValue={avg_rating}
              imageSize={wp('3.5%')}
              readonly
              ratingColor='#41C9BC'
              ratingBackgroundColor={COLOR_TITLE_HEADER}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ textAlign: 'right', fontSize: SIZE_TEXT_CONTENT }}>{priceDisplay}</Text>
            <Text style={{ textAlign: 'right', fontSize: SIZE_TEXT_CONTENT }}>/month</Text>
          </View>
        </View>
      </View>
    </TouchableWithScale>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    backgroundColor: '#fff',
    width: wp('89%'),
    height: 110,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: hp('1%')
  },
  image: {
    width: wp('35%'),
    // height: 'auto'
  },
  boxInfo: {
    flex: 1,
    width: wp('55%'),
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('2%'),
    // paddingHorizontal: wp('1%'),
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  txtRoomName: {
    fontWeight: SEMI_BOLD,
    fontSize: SIZE_TEXT_TITLE_MEDIUM
  },
  txtAddress: {
    // fontSize: wp('3%'),
    fontSize: 12,
    paddingTop: hp('0.5%')
  },
  boxPrice: {
    // paddingTop: hp('0.5%'),
    // marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ValuableCard;
