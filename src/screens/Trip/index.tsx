import React, {FC} from 'react';
import { StyleSheet, View } from 'react-native';
import Filter from 'components/Filter';
import MyMapView from 'modules/MapView';

interface IProps {
  initialProps?: any;
};

const Trip: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyMapView/>
    </View>
  );
};

const styles = StyleSheet.create({

});
Trip.defaultProps = {

}
export default Trip;
