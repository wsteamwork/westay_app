import React, { FC } from 'react';
import {StyleSheet, View, TouchableOpacity, ImageBackground, Text, Alert} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {hp, wp} from 'utils/responsive';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';

interface IProps {
  item: TypeApartment,
}

const DestinationCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('OK','clicked')
  };
  // console.log(item);
  return (
    <TouchableWithScale
      scaleIn={0.2}
      _onPress={handleClick}
    >
      <ImageBackground
        style={styles.image}
        imageStyle={{ borderRadius: 5 }}
        resizeMode="cover"
        source={{ uri: 'https://m.westay.vn/static/images/property/house.jpg' }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
          style={styles.linear}
        >
          <Text style={styles.name}>ccâccc</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithScale>
  );
};

const styles = StyleSheet.create({
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  image: { height: hp('25%'), width: wp('75%') },
  name: {
    position: 'absolute',
    bottom: hp('1%'),
    left: wp('2.5%'),
    fontSize: wp('6%'),
    fontWeight: '700',
    color: 'white',
  },
});

export default DestinationCard;
