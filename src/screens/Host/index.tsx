import React, {FC} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';
import {wp} from 'utils/responsive';
import {useTranslation} from 'react-i18next';
import Tab2_Comfort from 'components/Host/CreateListing/Step2/Tab2_Comfort';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const Host: FC<IProps> = (props) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Tab2_Comfort/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: wp('6%'),
    width: wp('100%'),
    textAlign: 'center',
    color: COLOR_TEXT_DEFAULT,
  },
});
Host.defaultProps = {};
export default Host;
