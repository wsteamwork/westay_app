// import { useNetInfo } from "@react-native-community/netinfo";
import React, { useReducer } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import AppView from './src/modules/AppView';
import i18n from './src/translations';
import { AuthReducer, AuthStateInit, AuthContext } from 'store/Context/Auth';

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
};

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, AuthStateInit);
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AuthContext.Provider value={{ state, dispatch }}>
        <I18nextProvider i18n={i18n}>
          <AppView />
        </I18nextProvider>
        </AuthContext.Provider>
      </View>
    </ThemeProvider>
  )
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});

export default App;
