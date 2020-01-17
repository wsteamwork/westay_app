import React, {FC, Dispatch} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Marker} from "react-native-maps";
import {formatMoney} from 'utils/mixins';
import {wp, hp, COLOR_BUTTON_DEFAULT} from 'utils/responsive';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';

interface IProps {
  setIsIndex: Dispatch<number>,
  isIndex:number,
  item: any,
  index: number
}

const MapMarkerFilter: FC<IProps> = (props) => {
  const { setIsIndex, isIndex, item, index } = props;

  return (
    <Marker
      key={index}
      coordinate={item.coordinate}
      onPress={() => setIsIndex(index)}
      style={{ zIndex: isIndex === index ? 9999 : 0 }}
    >
      <View style={{ alignItems: 'center' }}>
        <Text
          style={[
            styles.content,
            {
              backgroundColor:
                isIndex === index ? COLOR_BUTTON_DEFAULT : 'white',
              color: isIndex === index ? 'white' : COLOR_TEXT_DEFAULT,
            },
          ]}
        >
          {formatMoney(item.price_day)}₫
        </Text>
        {isIndex === index && (
          <IconMaterialIcons
            name="arrow-drop-down"
            size={wp('4%')}
            style={{
              lineHeight: wp('3%'),
            }}
            color={COLOR_BUTTON_DEFAULT}
          />
        )}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    fontSize: wp('4%'),
    fontWeight: '700',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default MapMarkerFilter;
