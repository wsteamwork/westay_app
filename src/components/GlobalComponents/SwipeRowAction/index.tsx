import React, { FC, ReactNode, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Interactable from 'react-native-interactable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_DANGER, COLOR_INFO } from 'styles/global.style';
import { wp } from 'utils/responsive';
interface IProps {
  damping: number;
  tension: number;
  children: ReactNode;
  pinPressed: (item: any) => any;
  notificationPressed: (item: any) => any;
  deletePressed: (item: any) => any;
};
const Screen = Dimensions.get('window');

const RowComponent: FC<IProps> = (props) => {
  const { damping, tension, children, pinPressed, notificationPressed, deletePressed } = props;

  const [_deltaX] = useState(new Animated.Value(0));
  return (
    <View style={{ backgroundColor: '#ceced2' }}>

      <View style={{
        position: 'absolute', left: 0, right: 0, height: wp('12%'),
      }} pointerEvents='box-none'>
        <Animated.View style={
          [styles.trashHolder, {
            transform: [{
              translateX: _deltaX.interpolate({
                inputRange: [-131, 0],
                outputRange: [0, 131]
              })
            }]
          }
          ]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={deletePressed}
            style={styles.button}
          >
            <Ionicons name='ios-trash' size={24} color="white" style={{ alignSelf: 'center', justifyContent: 'center' }} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={
          [styles.snoozeHolder, {
            transform: [{
              translateX: _deltaX.interpolate({
                inputRange: [-131, 0],
                outputRange: [0, 66]
              })
            }]
          }
          ]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={notificationPressed}
            style={styles.button}
          >
            <Ionicons name='ios-notifications' size={24} color="white" style={{ alignSelf: 'center', justifyContent: 'center' }} />
          </TouchableOpacity>

        </Animated.View>
      </View>

      <View style={{
        position: 'absolute', left: 0, right: 0, height: wp('12%'),
      }} pointerEvents='box-none'>

        <Animated.View style={
          [styles.doneHolder, {
            transform: [{
              translateX: _deltaX.interpolate({
                inputRange: [0, 62],
                outputRange: [-62, 0]
              })
            }]
          }
          ]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={pinPressed}
            style={styles.button}
          >
            <AntDesign name='pushpin' size={24} color="white" style={{ alignSelf: 'center', justifyContent: 'center' }} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Interactable.View
        horizontalOnly={true}
        snapPoints={[
          { x: 66, damping: 1 - damping, tension: tension },
          { x: 0, damping: 1 - damping, tension: tension },
          { x: -131, damping: 1 - damping, tension: tension }
        ]}
        animatedValueX={_deltaX}>
        <View style={{
          left: 0, right: 0, height: wp('12%'), backgroundColor: 'white'
        }}>
          {children}
        </View>
      </Interactable.View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    // borderColor: '#red'
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  trashHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 131,
    width: Screen.width,
    height: wp('12%'),
    paddingLeft: 18,
    backgroundColor: COLOR_DANGER,
    justifyContent: 'center'
  },
  snoozeHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 62,
    width: Screen.width,
    height: wp('12%'),
    paddingLeft: 18,
    backgroundColor: COLOR_INFO,
    justifyContent: 'center'
  },
  doneHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 62,
    width: Screen.width,
    height: wp('12%'),
    paddingRight: 18,
    backgroundColor: '#FECB2E',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  playground: {
    marginTop: Screen.height <= 500 ? 0 : 80,
    padding: 20,
    width: Screen.width - 30,
    backgroundColor: '#FECB2E',
    alignItems: 'stretch',
    alignSelf: 'center'
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15
  },
  slider: {
    height: 40
  }
});
export default RowComponent;
