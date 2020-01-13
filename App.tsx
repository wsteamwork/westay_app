import React, {Suspense, useReducer, FC} from 'react';
import {I18nextProvider} from 'react-i18next';
import {Platform, StyleSheet, View, StatusBar, ActivityIndicator} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import AppView from './src/modules/AppView';
import i18n from './src/translations';
import {COLOR_TITLE_HEADER, COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {isConnected} from '@react-native-community/netinfo';
import {AuthContext, authReducer, authInit} from 'store/context/auth';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from 'store';

const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Montserrat-Regular',
  },
};
const theme           = {
  Text: {
    style: {
      ...customTextProps.style,
    },
  },
};

const App: FC = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInit);

  return (
    <Suspense
      fallback = {
        <View style = {styles.container}>
          <ActivityIndicator color = {COLOR_TITLE_HEADER} />
        </View>
      }
    >
      <ThemeProvider theme = {theme}>
        <Provider store={store}>
          <PersistGate
            loading={
              <View style={styles.container}>
                <ActivityIndicator color={COLOR_BUTTON_DEFAULT} />
              </View>
            }
            persistor={persistor}
          >
          <AuthContext.Provider value = {{state: authState, dispatch: authDispatch, isConnected}}>
            <I18nextProvider i18n = {i18n}>
              <AppView />
            </I18nextProvider>
          </AuthContext.Provider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor:'red'
  },
});

export default App;
