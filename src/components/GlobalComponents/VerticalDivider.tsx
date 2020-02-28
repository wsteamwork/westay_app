import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  width?: number;
  height?: number;
  color?: string;
};

const VerticalDivider: FC<IProps> = (props) => {
  const { width, height, color } = props;

  const styles = StyleSheet.create({

  });

  return (
    <View style={{ backgroundColor: color, width: width, height: height, justifyContent: 'center', alignSelf: 'center' }}></View>
  );
};


VerticalDivider.defaultProps = {
  width: 1,
  height: 30,
  color: '#7676765d'
}
export default VerticalDivider;
