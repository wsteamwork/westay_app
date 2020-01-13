import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {NORMAL, SIZE_TEXT_SUBTITLE, COLOR_TEXT_DEFAULT} from 'styles/global.style';
import {wp} from 'utils/responsive';
import {elevationShadowStyle} from 'utils/mixins';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string;
  value: string;
  _onChangeText:(value:string)=>void;
  _onKeyPress:()=>void;
}

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, value, _onChangeText, _onKeyPress, navigation } = props;

  return (
    <View style = {[styles.viewInput, elevationShadowStyle(10)]}>
      <SearchBar
        value={value}
        onChangeText={(value)=>_onChangeText(value)}
        onSubmitEditing={() => _onKeyPress}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#7676769d'}
        placeholder={'Search anything'}
        clearButtonMode={'always'}
        showCancel
        clearIcon={<Icon name="keyboard-o" color={'#7676769d'} />}
        cancelButtonTitle={'Cancel'}
        keyboardType={'default'}
        containerStyle={styles.textInput}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        autoCorrect={false}
        inputContainerStyle={{
          // height: height || hp('4.2%'),
          backgroundColor: 'white',
          borderRadius: 50
        }}
        inputStyle={{
          color: '#424242',
          fontSize: SIZE_TEXT_SUBTITLE,
          fontWeight: NORMAL,
        }}
        searchIcon = {
          <Ionicons
            name = {'ios-search'}
            color = {COLOR_TEXT_DEFAULT}
            size = {wp('5%')}
            style = {{paddingLeft: wp('3%')}}
          />
        }
      />
    </View>
  );
};

GlobalSearchInput.defaultProps = {
  returnKeyType: 'search',
  returnKeyLabel: 'Search'
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },
  textInput: {
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
    padding: 0,
    margin: 0,
    borderRadius: 50,
  }
});

export default withNavigation(GlobalSearchInput);
