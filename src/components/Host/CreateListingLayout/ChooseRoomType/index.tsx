import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const ChooseRoomType: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const items = [
    { label: 'Full House', value: 1, key: 1 },
    { label: 'Apartment', value: 2, key: 2 },
    { label: 'Villa', value: 3, key: 3 },
    { label: 'Private Room', value: 4, key: 4 },
    { label: 'Hotel', value: 5, key: 5 },
    { label: 'Studio', value: 6, key: 6 },
  ];
  return (
    <View>
      <PickerSelect
        onValueChange={(value) => setValue(value)}
        placeholder={{ label: 'Chọn loại căn hộ', value: 0, key: 0, color: '#aaa' }}
        value={value}
        items={items}>
        <View>
          {value === 0 ? (
            <Text style={styles.placeholderChooseType}>Chọn loại căn hộ</Text>
          ) : (
            <Text style={styles.chooseTypeValue}>{items[value - 1].label}</Text>
          )}
        </View>
      </PickerSelect>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderChooseType: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    color: '#aaa',
    fontSize: wp('4%'),
  },
  chooseTypeValue: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    color: '#484848',
    fontSize: wp('4%'),
  },
});

export default ChooseRoomType;
