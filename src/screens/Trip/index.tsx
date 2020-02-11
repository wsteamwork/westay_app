import React, {FC} from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface IProps {
  initialProps?: any;
};

const Trip: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View style={{ flex: 1, justifyContent:"center", alignItems: 'center' }}>
      <Text>Trip Trip</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});
Trip.defaultProps = {

}
export default Trip;
