import React, { FC, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { wp, hp } from 'utils/responsive';
import BoxInfoRoom from './BoxInfoRoom';
import { Divider } from 'react-native-elements';
import BoxInfoHost from './BoxInfoHost';
import BoxBedAndGuest from './BoxBedAndGuest';
import BoxDescriptionRoom from './BoxDescriptionRoom';
import BoxAmenitiesRoom from './BoxAmenitiesRoom';
import BoxImageRoom from './BoxImageRoom';
import BoxCircleMapRoom from './BoxCircleMapRoom';
import BoxPriceLTRoom from './BoxPriceLTRoom';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { LTRoomReducerAction, getDataLTRoom } from 'store/redux/reducers/LTRoom/RoomDetails';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import BoxImageDetail from './BoxImageDetail';
import BoxIncludedFee from './BoxIncludedFee';
import BoxBookingRoom from './BoxBookingRoom';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxDetailRoom: FC<IProps> = (props) => {
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  useEffect(() => {
    getDataLTRoom(3457, dispatch);
  }, []);
  return (
    <View>
      <ScrollView style={{ marginBottom: hp('10%') }}>
        <View>
          <BoxImageRoom />
        </View>
        <View style={styles.container}>
          <BoxInfoRoom />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxInfoHost />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxBedAndGuest />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxDescriptionRoom />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxImageDetail />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxAmenitiesRoom />
        </View>
        <View>
          <BoxCircleMapRoom />
        </View>
        <View>
          <BoxPriceLTRoom />
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
          <BoxIncludedFee />
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
        </View>
      </ScrollView>
      <BoxBookingRoom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: wp('4%'),
    width: wp('100%'),
  },
});
BoxDetailRoom.defaultProps = {};
export default withNavigation(BoxDetailRoom);
