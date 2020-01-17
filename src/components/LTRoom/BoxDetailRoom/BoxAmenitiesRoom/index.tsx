import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import { hp } from 'utils/responsive';
import SvgUri from 'react-native-svg-uri';
interface IProps {
  initialProps?: any;
}

const BoxAmenitiesRoom: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Tiện ích</Text>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}
        >
          {[1,2,3,4,5 ].map(i => (
            <Tooltip
              withOverlay={false}
              popover={
                <Text style={{ color: '#fff' }}>
                  Máy giặt
                </Text>
              }
            >
              <SvgUri
                width="24"
                height="24"
                source={{ uri: 'https:dev.westay.vn/images/comforts/garden.svg' }}
              />
            </Tooltip>
          ))}
          {/* <TouchableOpacity onPress={() => setCollapsedComfort(true)}> */}
            <Text style={{ fontSize: 25, color: '#0F73EE' }}>
              +15
            </Text>
          {/* </TouchableOpacity> */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtTitle: {
    fontSize: 24,
    marginBottom: hp('2%'),
    fontWeight: '700',
  },
  txtDescription: {
    fontSize: 16,
    fontWeight: '500',
  }
});
BoxAmenitiesRoom.defaultProps = {};
export default BoxAmenitiesRoom;
