import React, { FC, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface IProps {
  _onPress?: (item?: any) => any;
  _onLongPress?: (item?: any) => any;
  children: any;
  scaleIn?: number;
  friction?: number;
  tension?: number;
};

const TouchableWithScaleAnimation: FC<IProps> = (props) => {
  const { _onPress, children, _onLongPress, scaleIn, friction, tension } = props;
  const [animatedValue] = useState(new Animated.Value(1));

  const handleScalePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: scaleIn || 0.96
    }).start();
  }

  const handleScalePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: friction,
      tension: tension
    }).start();
  }
  const animatedStyle = {
    transform: [{ scale: animatedValue }, { perspective: 1000 }]
  }
  return (
    <TouchableWithoutFeedback
      onPress={_onPress}
      onLongPress={_onLongPress}
      onPressIn={handleScalePressIn}
      onPressOut={handleScalePressOut}
    >
      <Animated.View style={[animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

});
TouchableWithScaleAnimation.defaultProps = {
  scaleIn: 0.96,
  friction: 4,
  tension: 40,
}
export default TouchableWithScaleAnimation;
