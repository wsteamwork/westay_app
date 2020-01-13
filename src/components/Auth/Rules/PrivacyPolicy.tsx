import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://westay.vn/privacy-policy' }}
        renderLoading={() => <ActivityIndicator />}
        style={{ backgroundColor: 'white' }}
        startInLoadingState
      />
    </View>
  );
};

export default PrivacyPolicy;
