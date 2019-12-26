// import { useNetInfo } from "@react-native-community/netinfo";
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import AppView from './src/modules/AppView';

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
          <AppView />
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

