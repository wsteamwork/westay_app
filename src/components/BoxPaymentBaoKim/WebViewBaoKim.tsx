/* eslint-disable linebreak-style */
import React, { FC } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
const WebViewBaoKim: FC<IProps> = (props) => {
  const { navigation } = props;
  const urlToBaoKim = navigation.getParam('urlToBaoKim', '');

  return <WebView source={{ uri: urlToBaoKim }} style={{ marginTop: 20 }} />;
};

export default withNavigation(WebViewBaoKim);
