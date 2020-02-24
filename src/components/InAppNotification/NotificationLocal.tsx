import React, {FC, useState, ReactDOM, ReactNode} from 'react';
import {StyleSheet, Animated, Platform, Dimensions, NativeModules, Image} from 'react-native';
import PropTypes, {any} from 'prop-types';
import DefaultNoti from 'components/InAppNotification/DefaultNoti';

const { StatusBarManager } = NativeModules;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT  === 812 || SCREEN_HEIGHT  === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;

interface IProps {
  height: number,
  topOffset: number,
  backgroundColour: string,
  iconApp: Image,
  notificationBodyComponent: ReactNode,
  closeInterval: number,
  openCloseDuration: number
}

const NotificationLocal: FC<IProps> = (props) => {
  const { height: baseHeight,
          topOffset,
          backgroundColour,
          iconApp,
          notificationBodyComponent: NotificationBody,
          openCloseDuration
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [animatedValue, setAnimatedValue] = useState<any>(new Animated.Value(0));

  const height = baseHeight + STATUS_BAR_HEIGHT;

  const showNotification=(done:any)=> {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: openCloseDuration,
      useNativeDriver: true,
    }).start(done);
  };

  const closeNotification=(done:any)=> {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: openCloseDuration,
      useNativeDriver: true,
    }).start(done);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height, backgroundColor: backgroundColour },
        {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-height + topOffset, 0],
              }),
            },
          ],
        },
      ]}
    >
      {/*<NotificationBody*/}
      {/*  title={ title }*/}
      {/*  message={message}*/}
      {/*  onPress={onPress}*/}
      {/*  isOpen={isOpen}*/}
      {/*  iconApp={iconApp}*/}
      {/*  icon={icon}*/}
      {/*  vibrate={vibrate}*/}
      {/*  avatar={avatar}*/}
      {/*  onClose={() =>{*/}
      {/*    setIsOpen(false);*/}
      {/*    setAnimatedValue(closeNotification);*/}
      {/*  }}*/}
      {/*/>*/}
    </Animated.View>
  );
};

NotificationLocal.defaultProps = {
  closeInterval: 4000,
  openCloseDuration: 200,
  height: 80,
  topOffset: 0,
  backgroundColour: 'white',
  notificationBodyComponent: DefaultNoti,
  iconApp: undefined,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
});

export default NotificationLocal;
