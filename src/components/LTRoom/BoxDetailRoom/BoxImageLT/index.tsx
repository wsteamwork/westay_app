import React, { FC } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { wp } from 'utils/responsive';
import BoxIntroRoom from './BoxIntroRoom';

interface IProps {
  initialProps?: any;
}

const BoxImageLT: FC<IProps> = (props) => {
  return (
    <View style={styles.container} collapsable={false}>
      <ImageBackground
        source={require('../../../../static/images/property/room-test.png')}
        style={{ width: '100%', height: '100%' }}>
        <BoxIntroRoom />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
});
BoxImageLT.defaultProps = {};
export default BoxImageLT;
