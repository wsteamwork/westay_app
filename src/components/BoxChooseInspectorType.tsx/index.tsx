import React, { FC, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import ShowInfoBasicRoom from 'components/BoxConfirmBooking/ShowInfoBasicRoom';
import InspectorItem from './InspectorItem';
import { ReducersList } from 'store/redux/reducers';
import { getDataLTRoom, LTRoomReducerAction } from 'store/redux/reducers/LTRoom/RoomDetails';
import { LTRoomIndexRes } from 'types/LTR/LTRoom/LTRoom';
import { Dispatch } from 'redux';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithBackTitle handlePress={() => navigation.goBack()} title="Đánh giá phòng" />
        <ShowInfoBasicRoom
          roomName={booking.longTermRoom.data.about_room.name}
          district={booking.district.data.name}
          city={booking.city.data.name}
          image_url={`${IMAGE_STORAGE_LG + booking.longTermRoom.data.avatar.images[0].name}`}
        />
        <Divider style={styles.divider} />
        <InspectorItem title={'Phòng khách'} isCompleted={true} />
        <Divider style={styles.divider} />
        <InspectorItem title={'Phòng ngủ'} isCompleted={completedInspector} />
        <Divider style={styles.divider} />
        <InspectorItem title={'Phòng tắm'} />
        <Divider style={styles.divider} />
        <InspectorItem title={'Phòng bếp'} />
        <Divider style={styles.divider} />
      </ScrollView>
    </View>
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
