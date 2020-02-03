import React, { FC } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text, Image, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  initialProps?: any;
}

const BoxBookingRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.boxPrice}>
      <View
        style={{
          width: wp('50%'),
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <Text style={styles.txtPrice}>
          ${listing.price_display}
          <Text style={{ lineHeight: 37, fontSize: 10 }}> /month</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => Alert.alert('book room')}>
        <Text style={styles.titleStyle}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxPrice: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  txtPrice: {
    lineHeight: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: wp('30%'),
    height: wp('10%'),
    borderRadius: 25,
    backgroundColor: 'rgb(84, 211, 194)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyle: {
    color: 'white',
    fontWeight: '500',
    marginRight: 3,
  },
});
BoxBookingRoom.defaultProps = {};
export default BoxBookingRoom;
