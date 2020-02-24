import React, { FC } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text, Image, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxInfoHost: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}>
          <Text style={styles.txtNameUser}>Host</Text>
          <Text style={styles.txtNameHost}>{listing.merchant.data.name}</Text>
        </View>
        <Avatar
          rounded
          source={{
            uri: listing.merchant.data.avatar_url,
          }}
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
    fontWeight: '700',
    color: '#484848',
  },
});
BoxInfoHost.defaultProps = {};
export default BoxInfoHost;
