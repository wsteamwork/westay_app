import React from 'react';
import { View, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

const TermsAndConditions = () => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBackTitle />
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
