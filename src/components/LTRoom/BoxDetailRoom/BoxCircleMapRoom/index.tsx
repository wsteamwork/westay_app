import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import MapView, { Circle } from 'react-native-maps';
import { ReducersList } from 'store/redux/reducers';
import { useSelector } from 'react-redux';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxCircleMapRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
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
            latitude: parseFloat(listing.latitude),
            longitude: parseFloat(listing.longitude),
            latitudeDelta: 0.019,
            longitudeDelta: 0.019,
          }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          moveOnMarkerPress={false}>
          <Circle
            center={{
              latitude: parseFloat(listing.latitude),
              longitude: parseFloat(listing.longitude),
            }}
            radius={300}
            zIndex={9}
            strokeColor="#ff6633"
            fillColor="rgba(255, 0, 0, 0.2)"
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
