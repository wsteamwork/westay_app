import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { hp } from 'utils/responsive';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import {useTranslation} from 'react-i18next';
/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  move_in_new: string;
  uuid: string;
}

const BoxRenewalBooking: FC<IProps> = (props) => {
  const { navigation, move_in_new, uuid } = props;
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.boxRenewal}>
        <Text style={styles.title}>
          {t('booking:extendTheDate')}
        </Text>
      </View>
      <View>
        <Button
          title={t('booking:extensionOfContract')}
          buttonStyle={styles.buttonRenewStyle}
          onPress={() => navigation.navigate('ReNewalBooking', { move_in_new: move_in_new, uuid: uuid })}
          titleStyle={styles.titleStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#484848',
    fontWeight: '700',
    marginBottom: hp('0.8%'),
  },
  boxRenewal: {
    width: '70%',
  },
  titleStyle: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonRenewStyle: {
    width: hp('11%'),
    height: hp('4.5%'),
    marginTop: hp('0.5%'),
    backgroundColor: '#ff6600',
  },
});
export default withNavigation(BoxRenewalBooking);
