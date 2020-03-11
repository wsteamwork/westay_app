import React, { FC } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_TEXT_DEFAULT, COLOR_TEXT_TITLE, SIZE_TEXT_TITLE } from 'styles/global.style';
import {wp} from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  title?: string;
  showBack?: boolean;
  handlePress?: any;
  textHeaderStyle?: any;
  containerStyle?: any;
  rightComponent?: any;
}
const HeaderWithBackTitle: FC<IProps> = (props) => {
  const {
    title,
    showBack,
    handlePress,
    textHeaderStyle,
    containerStyle,
    rightComponent,
    navigation,
  } = props;

  const handleClick = () => {
    handlePress ? handlePress() : navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width:'15%' }}>
        {showBack && (
          <AntDesign
            name={'left'}
            size={wp('6%')}
            onPress={handleClick}
            color={COLOR_TEXT_DEFAULT}
          />
        )}
      </View>

      <Text style={[styles.textHeader, textHeaderStyle]}>{title}</Text>

      <View style={{ alignItems: 'flex-end' }}>
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

HeaderWithBackTitle.defaultProps = {
  showBack: true,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: StatusBar.currentHeight,
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 32,
    // marginBottom: 10,
    paddingHorizontal: wp('6%'),
    height: 40,
    backgroundColor: 'white'
  },
  textHeader: {
    flex: 1,
    fontWeight: '400',
    fontSize: SIZE_TEXT_TITLE,
    color: COLOR_TEXT_TITLE,
    // textAlign: 'center',
  },
});

export default withNavigation(HeaderWithBackTitle);
