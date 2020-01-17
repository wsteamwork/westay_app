import React, { FC } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

interface IProps {
  initialProps?: any;
}

const BoxBedAndGuest: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: hp('3%'), justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon name="building" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>Nhà riêng</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon name="bath" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>2 phòng tắm</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon5 name="door-open" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>3 phòng ngủ</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon name="bed" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>1 giường</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon name="wifi" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>23 tiện ích</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%')
          }}>
          <FontAwesomeIcon5 name="users" size={24} color='#666666'/>
          <Text style={styles.txtNameHost}>2 khách</Text>
          <Text style={styles.txtMaxGuest}>(Tối đa 2 khách)</Text>
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
