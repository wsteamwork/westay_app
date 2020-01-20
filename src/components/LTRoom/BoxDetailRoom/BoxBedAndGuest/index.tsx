import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import _ from 'lodash';
interface IProps {
  initialProps?: any;
}

const BoxBedAndGuest: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: 'row', marginBottom: hp('3%'), justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="building" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.accommodation_type_txt}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon5 name="door-open" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.bedrooms.number_bedroom} bedrooms</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="bed" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.total_area} m2</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="bath" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.bathrooms.number_bathroom} bathrooms</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="wifi" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.total_comforts} amenities</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon5 name="users" size={24} color="#666666" />
          <Text style={styles.txtNameHost}>{listing.guests.recommendation} guests</Text>
          <Text style={styles.txtMaxGuest}>(Max {listing.guests.max_additional_guest + listing.guests.recommendation} guests)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtNameUser: {
    fontSize: 14,
  },
  txtNameHost: {
    fontSize: 14,
    marginTop: hp('1%'),
    fontWeight: '600',
  },
  txtMaxGuest: {
    fontSize: 14,
    fontWeight: '600',
  },
});
BoxBedAndGuest.defaultProps = {};
export default BoxBedAndGuest;
