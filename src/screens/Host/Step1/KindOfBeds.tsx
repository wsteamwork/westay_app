import React, { FC } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider } from 'react-native-elements';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import { hp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const KindOfBeds: FC<IProps> = (props) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <CreateListingLayout
        titleHeader={'Bước 1 - Thông tin cơ bản'}
        titleMain={'Chi tiết phòng ngủ'}
        showBtnBack={true}>
        <Divider style={styles.divider} />
      </CreateListingLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  divider: {
    height: 1.2,
    backgroundColor: '#ededed',
    marginVertical: hp('2%'),
  },
});
export default KindOfBeds;
