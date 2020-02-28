import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxDescriptionRoom: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Description</Text>
      <Text style={styles.txtDescription}>{listing.about_room.description}</Text>
      {isOpen ? (
        <Text>
          {listing.about_room.space.length ? (
            <Text style={styles.txtDescription}>{listing.about_room.space}</Text>
          ) : (
            ''
          )}
          {listing.about_room.note.length ? (
            <Text style={styles.txtDescription}>{listing.about_room.note}</Text>
          ) : (
            ''
          )}
        </Text>
      ) : (
        <Text></Text>
      )}

      <View style={styles.actionReadLess}>
        <Text style={styles.readMoreText} onPress={toggle}>
          {' '}
          {isOpen ? 'Read less' : 'Read more'}
        </Text>
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
    color: '#484848',
  },
  txtDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#484848',
    letterSpacing: 0.6,
    marginBottom: hp('2%'),
  },
  actionReadLess: {
    alignItems: 'flex-end',
  },
  readMoreText: {
    fontWeight: '700',
    color: 'rgb(84, 211, 194)',
  },
});
BoxDescriptionRoom.defaultProps = {};
export default BoxDescriptionRoom;
