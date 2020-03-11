import React, { FC } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { wp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import Tab1_Description from 'components/Host/CreateListing/Step2/Tab1_Description';
import Tab1_Comfort from 'components/Host/CreateListing/Step2/Tab1_Comfort';

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
      <Tab1_Comfort/> {/*cai nay cua Duy*/}
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
