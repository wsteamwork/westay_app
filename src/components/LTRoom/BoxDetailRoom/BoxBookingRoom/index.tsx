import React, { FC } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text, Image, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import ButtonOriginal from 'components/Utils/ButtonOriginal';

interface IProps {
  initialProps?: any;
}

const BoxBookingRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.boxPrice}>
      <View
        style={{
          width: wp('40%'),
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <Text style={styles.txtPrice}>
          ${listing.price_display}
          <Text style={{ lineHeight: 37, fontSize: 10 }}> /month</Text>
        </Text>
      </View>
      <ButtonOriginal title="Book Now" width={wp('40%')} handlePress={() => Alert.alert('book room')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  boxPrice: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('10%'),
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
    elevation: 13,
  },
  txtPrice: {
    lineHeight: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
BoxBookingRoom.defaultProps = {};
export default BoxBookingRoom;
