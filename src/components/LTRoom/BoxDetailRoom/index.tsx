import React, { FC } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
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

interface IProps {
  initialProps?: any;
}

const BoxDetailRoom: FC<IProps> = (props) => {
  return (
    <ScrollView>
      <View>
        <BoxImageRoom />
      </View>
      <View style={styles.container}>
        <BoxInfoRoom />
        <Divider style={{ backgroundColor: '#dddddd', marginVertical: hp('2%') }} />
        <BoxInfoHost />
        <Divider style={{ backgroundColor: '#dddddd', marginVertical: hp('2%') }} />
        <BoxBedAndGuest />
        <Divider style={{ backgroundColor: '#dddddd', marginVertical: hp('2%') }} />
        <BoxDescriptionRoom />
        <Divider style={{ backgroundColor: '#dddddd', marginVertical: hp('2%') }} />
        <BoxAmenitiesRoom />
      </View>
      <View>
        <BoxCircleMapRoom />
      </View>
      <View>
        <BoxPriceLTRoom title={'Giá phòng dài hạn'} />
        <Divider style={{ backgroundColor: '#dddddd' }} />
        <BoxPriceLTRoom title={'Phí dịch vụ'} />
        <Divider style={{ backgroundColor: '#dddddd' }} />
        <BoxPriceLTRoom title={'Phí dịch vụ'} />
        <Divider style={{ backgroundColor: '#dddddd' }} />
      </View>
    </ScrollView>
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
export default BoxDetailRoom;
