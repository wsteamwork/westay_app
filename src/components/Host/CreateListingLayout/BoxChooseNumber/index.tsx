import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';
import { wp, hp } from 'utils/responsive';
import { COLOR_TEXT_DEFAULT, SIZE_TEXT_TITLE, COLOR_MERCHANT_DEFAULT } from 'styles/global.style';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}
const BoxChooseNumber: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { value, setValue, min, max, label } = props;
  const clickPlusValue = () => {
    if (value === max) return;
    setValue(value + 1);
  };

  const clickMinusValue = () => {
    if (value === min) return;
    setValue(value - 1);
  };
  return (
    <View style={styles.choose}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.chooseActions}>
        <IconEvilIcons
          name="minus"
          size={wp('12%')}
          color={value === min ? '#ddd' : COLOR_MERCHANT_DEFAULT}
          onPress={clickMinusValue}
        />
        <Text style={styles.chooseText}>{value}</Text>
        <IconEvilIcons
          name="plus"
          size={wp('12%')}
          color={value === max ? '#ddd' : COLOR_MERCHANT_DEFAULT}
          onPress={clickPlusValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  choose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
  },
  chooseActions: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    right: -5,
  },
  chooseText: {
    fontSize: SIZE_TEXT_TITLE,
    width: wp('10%'),
    textAlign: 'center',
    color: COLOR_TEXT_DEFAULT,
  },
  text: {
    flex: 3,
    color: COLOR_TEXT_DEFAULT,
    fontSize: SIZE_TEXT_TITLE,
    fontWeight: '500',
    marginRight: wp('5%'),
  },
});

BoxChooseNumber.defaultProps = {
  min: 1,
};

export default BoxChooseNumber;
