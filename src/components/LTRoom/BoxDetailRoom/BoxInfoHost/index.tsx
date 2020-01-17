import React, { FC } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text, Image, Avatar } from 'react-native-elements';

interface IProps {
  initialProps?: any;
}

const BoxInfoHost: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}>
          <Text style={styles.txtNameUser}>Chủ nhà</Text>
          <Text style={styles.txtNameHost}>Phạm Đức Nhất</Text>
        </View>
        <Avatar
          rounded
          source={require('../../../../static/images/property/avatar.jpg')}
          size="medium"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtNameUser: {
    fontSize: 16,
  },
  txtNameHost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
BoxInfoHost.defaultProps = {};
export default BoxInfoHost;
