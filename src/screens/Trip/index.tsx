import React, { FC, useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AuthContext } from 'store/context/auth';
import { getLongTermBookingList, LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { CURRENT, FINISHED, UPCOMING } from 'utils/mixins';
import { wp } from 'utils/responsive';
import BookingListLT from './BookingListLT';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

const LazyPlaceholder = () => (
  <View style={styles.scene}>
    <Text>Loading…</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

interface IProps {
  initialProps?: any;
}

const Trip: FC<IProps> = (props) => {
  const [index, setIndex] = useState(0);
  const _renderLazyPlaceholder = () => <LazyPlaceholder />;
  const FirstRoute = () => (
    <View style={[styles.scene]}>
      {index === 0 ? (
        <BookingListLT bookingType={UPCOMING} />
      ) : (
          <View style={styles.scene}>
            <Text>Loading…</Text>
          </View>
        )}
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene]}>
      {index === 1 ? (
        <BookingListLT bookingType={CURRENT} />
      ) : (
          <View style={styles.scene}>
            <Text>Loading…</Text>
          </View>
        )}
    </View>
  );

  const ThirdRoute = () => (
    <View style={[styles.scene]}>
      {index === 2 ? (
        <BookingListLT bookingType={FINISHED} />
      ) : (
          <View style={styles.scene}>
            <Text>Loading…</Text>
          </View>
        )}
    </View>
  );
  const renderTabBar = (props: any) => <TabBar pressColor={'red'} activeColor={'#2a7886'} inactiveColor={'#7676764d'} indicatorStyle={{ backgroundColor: '#8AA989' }} tabStyle={{ backgroundColor: 'white' }} {...props} />;

  const [routes] = useState([
    { key: 'first', title: 'Sắp đến' },
    { key: 'second', title: 'Hiện tại' },
    { key: 'three', title: 'Kết thúc' },
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    three: ThirdRoute,
  });

  const { state } = useContext(AuthContext);
  const { token, languageStatus } = state;
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  useEffect(() => {
    if (index === 0) {
      getLongTermBookingList(token, dispatch, languageStatus, ['1', '2']);
    } else if (index === 1) {
      getLongTermBookingList(token, dispatch, languageStatus, ['3']);
    } else {
      getLongTermBookingList(token, dispatch, languageStatus, ['4', '5']);
    }
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.titleText}>Đặt phòng của tôi</Text> */}
      <TabView
        lazy={true}
        renderLazyPlaceholder={_renderLazyPlaceholder}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scene: {
    flex: 1,
  },
  titleText: {
    // backgroundColor: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: wp('6%'),
    width: wp('100%'),
    textAlign: 'center',
    color: COLOR_TEXT_DEFAULT,
  },
});
Trip.defaultProps = {};
export default Trip;
