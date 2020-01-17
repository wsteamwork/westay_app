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
        <Divider style={{ backgroundColor: '#484848', marginVertical: hp('2%') }} />
        <BoxInfoHost />
        <Divider style={{ backgroundColor: '#484848', marginVertical: hp('2%') }} />
        <BoxBedAndGuest />
        <Divider style={{ backgroundColor: '#484848', marginVertical: hp('2%') }} />
        <BoxDescriptionRoom />
        <Divider style={{ backgroundColor: '#484848', marginVertical: hp('2%') }} />
        <BoxAmenitiesRoom />
        <Divider style={{ backgroundColor: '#484848', marginVertical: hp('2%') }} />
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
