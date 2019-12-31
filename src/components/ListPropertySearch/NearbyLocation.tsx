import PinLocation from 'assets/icons/pin.svg';
import React, { FC } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// import { SvgXml } from 'react-native-svg';
import { COLOR_URL_TEXT, SEMI_BOLD } from 'styles/global.style';
import { wp } from 'utils/responsive';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
interface IProps {
  initialProps?: any;
};

const NearbyLocation: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View style={{ paddingTop: 10 }}>
      <CardWithSideText
        imagePosition={'Right'}
        titleTextStyle={{ color: COLOR_URL_TEXT, fontWeight: SEMI_BOLD }}
        hasImage={false}
        icon={
          <View style={styles.iconContainer}>
            <PinLocation width={24} height={24} />
            {/* <SvgXml width={wp('6%')} height={wp('6%')} xml={PinLocation} fill={COLOR_URL_TEXT} /> */}
          </View>
        }
        title={'My location'}
        onPress={() => Alert.alert('My Location')}
        rounded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: wp('9.8%'),
    height: wp('9.8%'),
    borderRadius: 360,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR_URL_TEXT
  }
});
NearbyLocation.defaultProps = {

}
export default NearbyLocation;
