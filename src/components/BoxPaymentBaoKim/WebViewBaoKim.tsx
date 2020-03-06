/* eslint-disable linebreak-style */
import React, { FC } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import {View} from 'react-native';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
const WebViewBaoKim: FC<IProps> = (props) => {
  const { navigation } = props;
  const urlToBaoKim = navigation.getParam('urlToBaoKim', '');

  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBackTitle />
      <WebView source={{ uri: urlToBaoKim }} style={{ marginTop: 20 }} />
    </View>
  );
};

export default withNavigation(WebViewBaoKim);
