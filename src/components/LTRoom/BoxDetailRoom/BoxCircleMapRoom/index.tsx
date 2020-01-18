import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import MapView, { Circle } from 'react-native-maps';
interface IProps {
  initialProps?: any;
}

const BoxCircleMapRoom: FC<IProps> = (props) => {
  return (
    <View style={styles.boxMap}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <MapView
          pitchEnabled={false}
          showsPointsOfInterest={true}
          scrollEnabled={false}
          initialRegion={{
            latitude: 21.028935,
            longitude: 105.85215,
            latitudeDelta: 0.019,
            longitudeDelta: 0.019,
          }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          moveOnMarkerPress={false}>
          <Circle
            center={{
              latitude: 21.028935,
              longitude: 105.85215,
            }}
            radius={300}
            zIndex={9}
            strokeColor="#ff6633"
            fillColor="rgba(8, 194, 153,0.1)"
            lineJoin="round"
            strokeWidth={3}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  boxMap: {
    width: wp('100%'),
    height: 250,
    marginTop: 16,
    overflow: 'hidden',
    position: 'relative',
  },
});
BoxCircleMapRoom.defaultProps = {};
export default BoxCircleMapRoom;
