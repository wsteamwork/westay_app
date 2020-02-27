import React, {Suspense, useReducer, FC, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {Platform, StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import i18n from './src/translations';
import {COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {useNetInfo} from '@react-native-community/netinfo';
import {AuthContext, authReducer, authInit, SET_TOKEN, SET_LANGUAGE_STATUS} from 'store/context/auth';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store';
import 'react-native-gesture-handler';
import RootNavigation from 'navigation/RootNavigation';
import AppView from 'modules/AppViewContainer';
import RemotePushController from 'modules/services/RemotePushController';
import {TOKEN} from 'utils/api';
import storage from 'utils/storage';

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

const App: FC = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInit);
  const { isConnected } = useNetInfo();

  const getStorage = async () => {
    storage
      .load({ autoSync: true, key: TOKEN })
      .then(data => authDispatch({ type: SET_TOKEN, payload: `Bearer ${data}` }))
      .catch(err => authDispatch({ type: SET_TOKEN, payload: null }));

    // storage
    //   .load({ autoSync: true, key: 'initLanguage' })
    //   .then(data => dispatch({ type: SET_LANGUAGE_STATUS, payload: data }))
    //   .catch(err => dispatch({ type: SET_LANGUAGE_STATUS, payload: 'vi' }));
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <Suspense
      fallback={
        <View style={styles.container}>
          <StatusBar
            translucent={false}
            barStyle={'dark-content'}
            backgroundColor="#fff"
            animated={true}
          />
          <ActivityIndicator color={COLOR_BUTTON_DEFAULT} />
        </View>
      }>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate
            loading={
              <View style={styles.container}>
                <ActivityIndicator color={COLOR_BUTTON_DEFAULT} />
              </View>
            }
            persistor={persistor}>
            <AuthContext.Provider value={{ state: authState, dispatch: authDispatch, isConnected }}>
              <I18nextProvider i18n={i18n}>
                <AppView />
              </I18nextProvider>
            </AuthContext.Provider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
      <RemotePushController/>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
