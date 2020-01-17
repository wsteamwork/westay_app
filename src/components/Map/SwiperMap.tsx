import React, { FC } from 'react';
import { View, Text } from 'react-native';
import LottieView from "lottie-react-native";
import {useTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import Swiper from 'react-native-swiper';
import {wp, hp} from 'utils/responsive';
import ValuableCard from 'components/GlobalComponents/Cards/ValuableCard';

interface IProps {
  data: [],
  handleChangeSwiper:(index:any)=>void,
  open:boolean,
  isIndex:number,
  openLottie:boolean
}

const SwiperMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { data, handleChangeSwiper, open, isIndex, openLottie } = props;

  return openLottie ? (
    <View style={{ flex: 1, height: hp('20%') }}>
      <LottieView
        source={require('../../assets/lottie/loading1.json')}
        autoPlay
      />
    </View>
  ) : (
    <Collapsible style={{ flex: 1, height: 150 }} collapsed={open}>
      {!data.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: wp('4%'), fontWeight: '500' }}>
            {t('map:noResult')}
          </Text>
        </View>
      ) : (
        <Swiper
          onMomentumScrollEnd={(e, state, context) =>
            handleChangeSwiper(state.index)
          }
          loop
          style={{ flex: 1 }}
          loadMinimal={true}
          showsPagination={false}
          index={isIndex}
        >
          {data.map((item, index) => (
            <ValuableCard key={index} item={item} />
          ))}
        </Swiper>
      )}
    </Collapsible>
  );
};

export default SwiperMap;
