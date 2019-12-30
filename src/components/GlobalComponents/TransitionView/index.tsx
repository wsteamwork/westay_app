import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface IProps {
  children?: ReactNode;
  index?: number;
  duration?: number;
  animation?: string;
  transitionViewStyle?: Object
};

const TransitionView: FC<IProps> = (props) => {
  const { children, index, duration, animation, transitionViewStyle } = props;

  return (
    <Animatable.View
      style={[transitionViewStyle]}
      animation={animation}
      duration={duration}
      delay={index ? (index * 100) / 2 : 0}
    >
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({

});
TransitionView.defaultProps = {
  duration: 200,
  animation: 'fadeIn'
}
export default TransitionView;
