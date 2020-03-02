import React, { FC } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_TEXT_DEFAULT, NORMAL, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { elevationShadowStyle } from 'utils/mixins';
import { wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string;
  value: string | undefined;
  _onChangeText: (value: string) => void;
  _onClear?: () => void;
  _onKeyPress: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  autoFocus?: boolean;
}

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, value, _onChangeText, _onKeyPress, autoFocus, navigation, _onClear } = props;
  const { t } = useTranslation();
  return (
    <View style={[styles.viewInput, elevationShadowStyle(4)]}>
      <SearchBar
        value={value}
        onChangeText={(value) => _onChangeText(value)}
        // onClear={()=>_onClear}
        onSubmitEditing={(e) => _onKeyPress(e)}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#7676769d'}
        placeholder={t('filter:filterActions:searchAnything')}
        clearButtonMode={'always'}
        showCancel
        cancelButtonTitle={'Cancel'}
        keyboardType={'default'}
        containerStyle={styles.textInput}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        // autoCorrect={false}
        autoFocus
        inputContainerStyle={{
          // height: 40,
          // height: height || hp('4.2%'),
          backgroundColor: 'white',
          borderRadius: 50,
        }}
        inputStyle={{
          color: '#424242',
          fontSize: SIZE_TEXT_SUBTITLE,
          fontWeight: NORMAL,
        }}
        searchIcon={
          <Ionicons
            name={'ios-search'}
            color={COLOR_TEXT_DEFAULT}
            size={wp('5%')}
            style={{ paddingLeft: wp('3%') }}
          />
        }
        clearIcon={
          value ? <Icon
            onPress={_onClear}
            name="window-close"
            color={COLOR_TEXT_DEFAULT}
            size={wp('5%')}
            style={{ paddingRight: wp('3%') }}
          /> : false
        }
      />
    </View>
  );
};

GlobalSearchInput.defaultProps = {
  returnKeyType: 'search',
  returnKeyLabel: 'Search',
  autoFocus: true
};

const styles = StyleSheet.create({
  viewInput: {
    // height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50
  },
  textInput: {
    // height: 100,
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
    padding: 0,
    margin: 0,
    borderRadius: 50
  }
});

export default withNavigation(GlobalSearchInput);
