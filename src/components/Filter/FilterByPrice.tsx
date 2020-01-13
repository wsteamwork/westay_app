import React, { FC }        from 'react';
import {useTranslation}     from 'react-i18next';
import { View, Text } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {hp, wp} from 'utils/responsive';
import {COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {formatMoney} from 'utils/mixins';
// @ts-ignore
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface IProps {
  value: any[],
  setValue: (value: any)=> void
}

const FilterByPrice: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { value, setValue } = props;

  return (
    <View style={{ marginVertical: hp('3%') }}>
      <Text
        style={{
          fontSize: wp('5%'),
          fontWeight: '700',
        }}
      >
        {t('filter:filterByPrice:priceRange')}
      </Text>

      <MultiSlider
        trackStyle={{ backgroundColor: '#bdc3c7' }}
        selectedStyle={{ backgroundColor: COLOR_BUTTON_DEFAULT }}
        containerStyle={{}}
        values={value}
        sliderLength={wp('91.5%')}
        onValuesChange={(value:any) => setValue(value)}
        min={200000}
        max={50000000}
        step={100000}
        allowOverlap={false}
        customMarker={() => (
          <IconFontAwesome
            name="circle"
            size={wp('5%')}
            color={COLOR_BUTTON_DEFAULT}
          />
        )}
        snapped={true}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: wp('4%'), color: '#bbb' }}>
          {formatMoney(value[0],0)}₫
        </Text>
        <Text style={{ fontSize: wp('4%'), color: '#bbb' }}>
          {formatMoney(value[1],0)}₫
        </Text>
      </View>
    </View>
  );
};

export default FilterByPrice;
