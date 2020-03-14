import React, { FC, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import BoxChooseNumber from 'components/Host/CreateListingLayout/BoxChooseNumber';
import { Divider } from 'react-native-elements';
import { hp } from 'components/Utils/responsive.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BedRoom: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [guest, setGuest] = useState<number>(1);
  const [maxAddGuest, setMaxAddGuest] = useState<number>(1);
  const [bedroom, setBedroom] = useState<number>(1);
  const [bed, setBed] = useState<number>(1);
  return (
    <SafeAreaView style={styles.container}>
      <CreateListingLayout
        titleHeader={'Bước 1 - Thông tin cơ bản'}
        titleMain={'Phòng ngủ'}
        showBtnBack={true}>
        <BoxChooseNumber
          value={guest}
          setValue={setGuest}
          label={'Số khách tiêu chuẩn'}
          min={1}
          max={8}
        />
        <Divider style={styles.divider} />
        <BoxChooseNumber
          value={maxAddGuest}
          setValue={setMaxAddGuest}
          label={'Số khách tối đa có thể thêm'}
          min={1}
          max={8}
        />
        <Divider style={styles.divider} />
        <BoxChooseNumber
          value={bedroom}
          setValue={setBedroom}
          label={'Tổng số phòng ngủ'}
          min={1}
          max={8}
        />
        <Divider style={styles.divider} />
        <BoxChooseNumber value={bed} setValue={setBed} label={'Tổng số giường'} min={1} max={8} />
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
export default BedRoom;
