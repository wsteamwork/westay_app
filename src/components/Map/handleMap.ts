import {LTRoomIndexRes} from 'types/LTR/LTRoom/LTRoom';
import {IMAGE_STORAGE_SM, IMAGE_NOT_FOUND} from 'types/globalTypes';

export const changeDataMap = (data:[]) =>
  data.map((item:LTRoomIndexRes) => ({
    image: item.avatar.images && item.avatar.images.length ? `${IMAGE_STORAGE_SM + item.avatar.images[0].name}` : IMAGE_NOT_FOUND,
    name: item.about_room.name,
    room_type: item.accommodation_type_txt,
    city_name: item.city.data.name,
    district_name: item.district.data.name,
    coordinate: {
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
    },
      price_display: item.price_display,
    // price_hour: item.price_hour,
    number_room: item.bedrooms.number_bedroom,
    id: item.id,
    is_discount: item.is_discount,
    // price_day_discount: item.price_day_discount,
    // price_hour_discount: item.price_hour_discount,
    instant_book: item.instant_book,
  }));
