import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
import BookingListLT from './BookingListLT';
import { UPCOMING, CURRENT, FINISHED } from 'utils/mixins';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

const FirstRoute = () => (
  <View style={[styles.scene]}>
    <BookingListLT status={['1', '2']} bookingType={UPCOMING} />
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene]}>
    <BookingListLT status={['3']} bookingType={CURRENT} />
  </View>
);

const ThreeRoute = () => (
  <View style={[styles.scene]}>
    <BookingListLT status={['4', '5']} bookingType={FINISHED} />
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

interface IProps {
  initialProps?: any;
}

const Trip: FC<IProps> = (props) => {
  const [index, setIndex] = useState(0);
  const renderTabBar = (props: any) => <TabBar {...props} />;
  const [routes] = useState([
    { key: 'first', title: 'Sắp đến' },
    { key: 'second', title: 'Hiện tại' },
    { key: 'three', title: 'Kết thúc' },
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    three: ThreeRoute,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Đặt phòng của tôi</Text>
      <TabView
        lazy={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      />
    </View>
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
    marginBottom: hp('5%'),
    fontWeight: 'bold',
    fontSize: wp('6%'),
    width: wp('100%'),
    textAlign: 'center',
    color: COLOR_TEXT_DEFAULT,
  },
});
Trip.defaultProps = {};
export default Trip;
