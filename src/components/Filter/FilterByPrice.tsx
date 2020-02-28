// @ts-ignore
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR_BUTTON_DEFAULT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { formatMoney } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';

interface IProps {
  value: any[],
  setValue: (value: any) => void
}

const FilterByPrice: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { value, setValue } = props;

  return (
    <View style={{ marginVertical: hp('3%') }}>
      <Text
        style={{
          fontSize: SIZE_TEXT_TITLE_MEDIUM,
          fontWeight: '500',
        }}
      >
        {t('filter:filterByPrice:priceRange')}
      </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <MultiSlider
          trackStyle={{ backgroundColor: '#bdc3c7' }}
          selectedStyle={{ backgroundColor: COLOR_BUTTON_DEFAULT }}
          containerStyle={{}}
          values={value}
          sliderLength={wp('85.5%')}
          onValuesChange={(value: any) => setValue(value)}
          min={200000}
          max={50000000}
          step={200000}
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
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: wp('4%'), color: '#bbb' }}>
          {formatMoney(value[0], 0)}₫
        </Text>
        <Text style={{ fontSize: wp('4%'), color: '#bbb' }}>
          {formatMoney(value[1], 0)}₫
        </Text>
      </View>
    </View>
  );
};

export default FilterByPrice;
