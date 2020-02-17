import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {Button} from 'react-native-elements';
import {wp, hp} from 'utils/responsive';
import {COLOR_LINEAR_DEFAULT} from 'styles/global.style';
import * as Animatable from 'react-native-animatable';

interface IProps {
  loading:boolean;
  handleFindAround:()=>any;
}

const FindAroundHere: FC<IProps> = (props) => {
  const { loading, handleFindAround } = props;

  return (
    <Animatable.View
      style={styles.view}
      animation="zoomIn"
      duration={300}
      useNativeDriver={true}
    >
      <Button
        loading={loading}
        onPress={handleFindAround}
        title="Tìm kiếm quanh đây!"
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: COLOR_LINEAR_DEFAULT,
          start: { x: 0.5, y: 1 },
          end: { x: 1, y: 1 },
        }}
        buttonStyle={styles.buttonStyle}
        titleStyle={{ fontSize: wp('4.5%'), color: 'white' }}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    width: wp('100%'),
    top: hp('5%'),
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    height: hp('5%'),
    width: wp('70%'),
    alignItems: 'center',
  },
});

export default FindAroundHere;
