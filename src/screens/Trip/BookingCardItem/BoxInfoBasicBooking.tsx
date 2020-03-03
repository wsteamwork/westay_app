import { hp } from 'components/Utils/responsive.style';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  avatar?: string;
  code?: string;
  checkin?: string;
  checkout?: string;
  roomName?: string;
}

const BoxInfoBasicBooking: FC<IProps> = (props) => {
  const { avatar, code, checkin, checkout, roomName } = props;
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.boxImageRoom}>
        <Avatar
          // avatarStyle={{ width: 90, height: 90 }}
          containerStyle={{ width: 90, height: 90 }}
          // height={90}
          // width={90}
          rounded
          size="large"
          source={{
            uri: avatar,
          }}
        />
      </View>
      <View style={styles.boxInfoBooking}>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>{t('booking:bookingDetail:bookingCode')}: </Text>
          <Text style={styles.title}>#{code} </Text>
          <IconAntDesign name="checkcircle" size={wp('3.3%')} color={COLOR_BUTTON_DEFAULT} />
        </Text>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>{t('booking:bookingDetail:checkin')}: </Text>
          <Text style={styles.title}>{checkin}</Text>
        </Text>
        <Text style={styles.rowTitle}>
          <Text style={styles.label}>{t('booking:bookingDetail:checkout')}: </Text>
          <Text style={styles.title}>{checkout}</Text>
        </Text>
        <Text style={styles.rowTitle} numberOfLines={1}>
          <Text style={styles.label}>{t('booking:bookingDetail:accommodation')}: </Text>
          <Text style={styles.title}>{roomName}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  boxImageRoom: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // width: wp('25%'),
    // flex: 2,
    // marginTop: 8,
  },
  boxInfoBooking: {
    flex: 5,
    paddingLeft: 12,
    // width: wp('65%),
  },
  rowTitle: {
    marginBottom: hp('0.8%'),
  },
  label: {
    color: '#adadad',
    fontWeight: '500',
  },
  title: {
    color: '#484848',
    fontWeight: '500',
  },
});
BoxInfoBasicBooking.defaultProps = {};
export default BoxInfoBasicBooking;
