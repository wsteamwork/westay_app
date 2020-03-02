import React, { FC, useRef } from 'react';
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, View, Platform } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
  placeholder?: string;
  description?: any;
  title?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
const ItemProfile: FC<IProps> = (props) => {
  const {
    value,
    placeholder,
    keyboardType,
    description,
    title,
    onChangeText,
    onBlur,
  } = props;

  const inputRef = useRef<any>(null);

  return (
    <View style={styles.item}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title}</Text>
        <IconAntDesign
          name="edit"
          size={wp('5%')}
          color={COLOR_BUTTON_DEFAULT}
          onPress={() => inputRef.current.focus()}
        />
      </View>

      <View style={styles.actions}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          ref={inputRef}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: hp('3%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 4,
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    height: hp('5%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  textTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: COLOR_TEXT_DEFAULT,
  },
  actions: {
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  input: {
    height: hp('10%'),
    fontSize: wp('4%'),
    fontWeight: '400',
    color: COLOR_TEXT_DEFAULT,
    paddingLeft: 0,
    // fontFamily: Platform.OS === 'android' ?? 'Montserrat-Regular',
  },
  description: { fontSize: wp('3%'), color: '#8A8A8A' },
});

ItemProfile.defaultProps = {
  keyboardType: 'default',
  placeholder: '',
  value: '',
};

export default ItemProfile;
