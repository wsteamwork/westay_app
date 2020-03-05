import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  booking: any;
}

const BoxInspector: FC<IProps> = (props) => {
  const { navigation, booking } = props;
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.title}>
          {t('booking:inspectorBooking:updateTheStatusOfTheApartment')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title={t('shared:start')}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {
            navigation.navigate('BoxChooseInspectorType', { bookingInfo: booking });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxText: {
    justifyContent: 'center',
    flex: 3,
  },
  title: {
    color: '#484848',
    fontWeight: '500',
  },
  titleStyle: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonStyle: {
    height: 34,
    backgroundColor: '#008489',
  },
});
export default withNavigation(BoxInspector);
