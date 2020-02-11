import React, { FC } from 'react';
import {StyleSheet, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NUMBER_HOTLINE, LINK_Messenger} from 'types/globalTypes';
import ActionButton from 'react-native-action-button';
import {wp, hp, COLOR_BUTTON_DEFAULT} from 'utils/responsive';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactButton: FC = () => {
  const { t } = useTranslation();

  const handleCall = () => {
    Linking.openURL(`tel:${NUMBER_HOTLINE}`);
  };

  const handleOpenMessager = () => {
    Linking.openURL(LINK_Messenger);
  };

  return (
    <ActionButton
      buttonColor="transparent"
      size={wp('12%')}
      spacing={hp('2%')}
      fixNativeFeedbackRadius
      hideShadow={false}
      renderIcon={() => (
        <IconAntDesign
          name="customerservice"
          size={wp('8%')}
          color="white"
          style={styles.iconContainer}
        />
      )}
      degrees={360}
    >
      <ActionButton.Item
        size={wp('10%')}
        spaceBetween={1}
        buttonColor="#33CC00"
        title={t('home:actionButton:call')}
        onPress={handleCall}
        fixNativeFeedbackRadius
        // hideLabelShadow
        textContainerStyle={{ backgroundColor: '#20232A' }}
        textStyle={{ color: 'white' }}
      >
        <IconEntypo name="phone" size={wp('7%')} color="white" />
      </ActionButton.Item>

      <ActionButton.Item
        size={wp('10%')}
        spaceBetween={1}
        buttonColor="#448AFF"
        title={t('home:actionButton:message')}
        onPress={handleOpenMessager}
        fixNativeFeedbackRadius
        // hideLabelShadow
        textContainerStyle={{ backgroundColor: '#20232A' }}
        textStyle={{ color: 'white' }}
      >
        <IconMaterialCommunityIcons
          name="facebook-messenger"
          size={wp('7%')}
          color="white"
        />
      </ActionButton.Item>
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: wp('14%'),
    width: wp('14%'),
    textAlign: 'center',
    lineHeight: wp('14%'),
    backgroundColor: COLOR_BUTTON_DEFAULT,
    borderRadius: wp('14%') / 2,
  },
});

export default ContactButton;
