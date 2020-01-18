import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import { wp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { hp } from 'components/Utils/responsive.style';
interface IProps {
  initialProps?: any;
  title?: string;
  onPress?: () => void;
}

const BoxPriceLTRoom: FC<IProps> = (props) => {
  const { title, onPress } = props;
  return (
    <TouchableNativeFeedback style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Entypo name="chevron-right" size={25} color="#adadad" />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  touchable: {
    width: wp('100%'),
    height: hp('100%')
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
BoxPriceLTRoom.defaultProps = {};
export default BoxPriceLTRoom;
