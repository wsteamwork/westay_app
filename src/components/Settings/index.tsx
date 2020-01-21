import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
interface IProps {
  initialProps?: any;
}

const Settings: FC<IProps> = (props) => {

  return (
    <View style={styles.container}>
      <HeaderWithBackTitle
        title={'Settings'}
        textHeaderStyle={{ color: COLOR_TEXT_DEFAULT }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});
Settings.defaultProps = {};
export default Settings;
