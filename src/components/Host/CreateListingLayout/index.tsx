import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { wp, hp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  titleHeader?: string;
  titleMain?: string;
  rightComponentHeader?: any;
  children?: ReactNode;
  showBtnBack?: boolean;
  showBtnNext?: boolean;
  handlePressBack?: any;
  handlePressNext?: any;
}

const CreateListingLayout: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const {
    titleHeader,
    titleMain,
    rightComponentHeader,
    children,
    showBtnBack,
    showBtnNext,
    handlePressBack,
    handlePressNext,
    navigation,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackTitle
        handlePress={() => navigation.goBack()}
        title={titleHeader}
        rightComponent={rightComponentHeader}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: hp('10%') }} style={styles.boxWrapper}>
        {titleMain && <Text style={styles.mainText}>{titleMain}</Text>}
        {children}
      </ScrollView>
      <View style={showBtnBack ? styles.boxAction1 : styles.boxAction2}>
        {showBtnBack && (
          <Button
            title={'Quay lại'}
            titleStyle={styles.titleStyle}
            type={'outline'}
            buttonStyle={styles.buttonStyle}
            onPress={handlePressBack}
          />
        )}
        {showBtnNext && (
          <Button
            containerStyle={styles.containerStyleRight}
            title={'Tiếp tục'}
            buttonStyle={styles.buttonStyleRight}
            titleStyle={styles.titleStyleRight}
            iconRight
            onPress={handlePressNext}
            icon={<Icon name="chevron-thin-right" size={16} color="white" />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  boxWrapper: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('20%'),
  },
  mainText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: wp('8%'),
    color: COLOR_TEXT_DEFAULT,
  },
  boxAction1: {
    zIndex: 10,
    width: wp('100%'),
    paddingHorizontal: wp('6%'),
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxAction2: {
    zIndex: 10,
    width: wp('100%'),
    paddingHorizontal: wp('6%'),
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    marginBottom: 3,
  },
  titleStyleRight: {
    marginBottom: 3,
    marginRight: 6,
  },
  buttonStyle: {
    width: wp('30%'),
    borderWidth: 2,
    backgroundColor: '#fff'
  },
  containerStyleRight: {
    flexDirection: 'row',
  },
  buttonStyleRight: {
    width: wp('30%'),
    borderWidth: 2,
    justifyContent: 'flex-end',
  },
});
CreateListingLayout.defaultProps = {
  showBtnBack: true,
  showBtnNext: true,
};
export default withNavigation(CreateListingLayout);
