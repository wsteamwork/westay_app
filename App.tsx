// import { useNetInfo } from "@react-native-community/netinfo";
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import AppView from './src/modules/AppView';
import i18n from './src/translations';

const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Montserrat-Regular',
  },
};
const theme = {
  Text: {
    style: {
      ...customTextProps.style,
    },
  },
}

export default class App extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <I18nextProvider i18n={i18n}>
            <AppView />
          </I18nextProvider>

        </View>
      </ThemeProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});

