import { COLOR_BUTTON_DEFAULT } from 'components/Utils/responsive.style';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_TITLE, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE } from 'styles/global.style';
import { hp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxDescriptionRoom: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const { t } = useTranslation();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{t('details:description')}</Text>
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
          {isOpen ? t('shared:readLess') : t('shared:readMore')}
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
    fontSize: SIZE_TEXT_TITLE,
    marginBottom: hp('2%'),
    fontWeight: '600',
    color: COLOR_TEXT_TITLE,
  },
  txtDescription: {
    color: COLOR_TEXT_TITLE,
    fontSize: SIZE_TEXT_CONTENT,
    fontWeight: '400',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  actionReadLess: {
    alignItems: 'flex-end',
  },
  readMoreText: {
    fontWeight: '400',
    color: COLOR_BUTTON_DEFAULT,
  },
});
BoxDescriptionRoom.defaultProps = {};
export default BoxDescriptionRoom;
