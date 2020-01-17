import React from 'react';
import { View, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';

const TermsAndConditions = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://westay.vn/terms-and-conditions' }}
        renderLoading={() => <ActivityIndicator />}
        style={{ backgroundColor: 'white' }}
        startInLoadingState
      />
    </View>
  );
};

export default TermsAndConditions;