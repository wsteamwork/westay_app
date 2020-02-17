import React, { FC } from 'react';
import { View, Text } from 'react-native';
import LottieView from "lottie-react-native";
import {useTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import Swiper from 'react-native-swiper';
import {wp, hp} from 'utils/responsive';
import ValuableCard from 'components/GlobalComponents/Cards/ValuableCard';
import {IMAGE_STORAGE_SM, IMAGE_NOT_FOUND} from 'types/globalTypes';

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
    <View style={{ flex: 1, height: 120 }}>
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
          // loop
          style={{ alignItems:'center', flexWrap: 'wrap' }}
          loadMinimal={true}
          showsPagination={false}
          index={isIndex}
        >
          {data.map((room:any, index:number) => {
            return (
              <ValuableCard key = {index}
                            city = {room.city_name}
                            district = {room.district_name}
                            priceDisplay = {room.price_display}
                            roomID = {room.id}
                            roomName = {room.name}
                            roomType = {room.room_type}
                            roomImage = {room.image}
                            numberRoom={room.number_room}
                            // avg_rating = {room.avg_rating}
              />
            )
          })}
        </Swiper>
      )}
    </View>
  );
};

export default SwiperMap;
