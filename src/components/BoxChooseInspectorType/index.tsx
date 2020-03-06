import ShowInfoBasicRoom from 'components/BoxConfirmBooking/ShowInfoBasicRoom';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
import { hp } from 'utils/responsive';
import InspectorItem from './InspectorItem';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxChooseInspectorType: FC<IProps> = (props) => {
  const { navigation } = props;
  const { completedInspector } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const booking = navigation.getParam('bookingInfo', 0);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderWithBackTitle handlePress={() => navigation.goBack()} title={t('booking:inspectorBooking:review')} />
        <ShowInfoBasicRoom
          roomName={booking.longTermRoom.data.about_room.name}
          district={booking.district.data.name}
          city={booking.city.data.name}
          image_url={`${IMAGE_STORAGE_LG + booking.longTermRoom.data.avatar.images[0].name}`}
        />
        <Divider style={styles.divider} />
        <InspectorItem title={t('details:livingRoom')} isCompleted={true} />
        <Divider style={styles.divider} />
        <InspectorItem title={t('details:bedroom')} isCompleted={completedInspector} />
        <Divider style={styles.divider} />
        <InspectorItem title={t('details:bathroom')} />
        <Divider style={styles.divider} />
        <InspectorItem title={t('details:kitchen')} />
        <Divider style={styles.divider} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  divider: {
    height: 1.5,
    marginHorizontal: hp('2.5%'),
    backgroundColor: '#efefef',
  },
});

export default withNavigation(BoxChooseInspectorType);
