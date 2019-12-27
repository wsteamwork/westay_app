import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  initialProps?: any;
};

const Trip: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});
Trip.defaultProps = {

}
export default Trip;
