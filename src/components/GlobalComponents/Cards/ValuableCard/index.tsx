import React, { FC } from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, Text} from 'react-native';
import {wp, hp} from 'utils/responsive';
import {Image} from 'react-native-elements';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import { Rating } from 'react-native-elements';
import {COLOR_TITLE_HEADER} from 'styles/global.style';

interface IProps {
  item: TypeApartment
}

const ValuableCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('click','ban da click')
  };

  return (
    <TouchableWithScale
      style={styles.container}
      _onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.boxInfo}>
        <View>
          <Text numberOfLines={1} style={styles.txtRoomName}>
            Ten cua ngoi nha co the rat la dai
          </Text>
          <Text numberOfLines={1} style={styles.txtAddress}>
            Hoang Mai district
            <Text style={{fontWeight: '700' }}> &#8231; </Text>
            Ha noi
          </Text>
        </View>
        <View style={styles.boxPrice}>
          <View style={{justifyContent:'flex-end'}}>
            <Rating
              ratingCount={5}
              startingValue={4}
              imageSize={wp('3.5%')}
              readonly
              ratingColor='#41C9BC'
              ratingBackgroundColor={COLOR_TITLE_HEADER}
            />
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign:'right'}}>$392</Text>
            <Text style={{textAlign:'right'}}>/month</Text>
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
    height: hp('15%'),
    marginBottom: hp('4%'),
    flexDirection:'row',
    borderRadius: 8,
    overflow: 'hidden'
  },
  image:{
    width: wp('35%'),
    height: hp('20%')
  },
  boxInfo:{
    width: wp('55%'),
    padding: wp('3%'),
    backgroundColor: '#fff',
    justifyContent:'space-between'
  },
  txtRoomName:{
    fontWeight:'700',
    fontSize: wp('4.5%')
  },
  txtAddress:{
    fontSize: wp('3%'),
    paddingTop: hp('0.5%')
  },
  boxPrice:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default ValuableCard;
