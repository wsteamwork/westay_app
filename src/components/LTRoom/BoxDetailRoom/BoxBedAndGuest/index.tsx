import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE } from 'styles/global.style';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxBedAndGuest: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: 'row', marginBottom: 6, justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="building" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.accommodation_type_txt}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon5 name="door-open" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.bedrooms.number_bedroom} {t('details:bedRoom')}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <Foundation name="annotate" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.total_area} m2</Text>
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
          <FontAwesomeIcon name="bath" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.bathrooms.number_bathroom} {t('details:bathroom')}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon name="wifi" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.total_comforts} {t('details:amenities')}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: wp('30%'),
          }}>
          <FontAwesomeIcon5 name="users" size={22} color="#666666" />
          <Text style={styles.txtTitle}>{listing.guests.recommendation} {t('details:guests')}</Text>
          <Text style={styles.txtMaxGuest}>({t('shared:max')} {listing.guests.max_additional_guest + listing.guests.recommendation} {t('details:guests')})</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtTitle: {
    fontSize: 13,
    color: COLOR_TEXT_TITLE,
    marginTop: 6,
    fontWeight: '400',
  },
  txtMaxGuest: {
    fontSize: 11,
    color: COLOR_TEXT_SUBTITLE,
    fontWeight: '400',
  },
});
BoxBedAndGuest.defaultProps = {};
export default BoxBedAndGuest;
