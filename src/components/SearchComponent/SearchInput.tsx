import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_BACKGROUND_INPUT, NORMAL, SIZE_TEXT_SUBTITLE } from '../../styles/global.style';
import { hp } from '../../utils/responsive';
interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string
};

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, navigation } = props;
  const [input, setInput] = useState<string>('');

  const _onChangeText = (value: any) => {
    setInput(value);
  }
  const _onKeyPress = () => {
    Alert.alert(input)
  }

  const styles = StyleSheet.create({

    searchIcon: {
    },
    container: {
      // flex: 1,
      // // backgroundColor: 'red',
      // flexDirection: 'row',
      // justifyContent: 'center',
      // alignItems: 'center',
      // padding: 12
    },
    textInput: {
      // backgroundColor: 'red',
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: 'transparent',
      padding: 0,
      margin: 0,
      borderRadius: 4,
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: height || hp('4.2%'),
    }
  });
  return (
    <View style={styles.container}>
      <SearchBar
        value={input}
        onChangeText={_onChangeText}
        autoFocus
        onSubmitEditing={() => _onKeyPress()}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#7676769d'}
        placeholder={'Search anything'}
        clearButtonMode={'always'}
        keyboardType={'default'}
        containerStyle={styles.textInput}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        autoCorrect={false}
        inputContainerStyle={{
          height: height || hp('4.2%'),
          backgroundColor: COLOR_BACKGROUND_INPUT,
          borderRadius: 4
        }}
        inputStyle={{
          color: '#424242',
          fontSize: SIZE_TEXT_SUBTITLE,
          fontWeight: NORMAL,
        }}
      />
    </View>
  );
};

GlobalSearchInput.defaultProps = {
  returnKeyType: 'search',
  returnKeyLabel: 'Search'
}
export default withNavigation(GlobalSearchInput);
