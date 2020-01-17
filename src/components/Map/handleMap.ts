import {RoomIndexRes} from 'types/Rooms/RoomResponses';

export const changeDataMap = (data:RoomIndexRes[]) =>
  data.map((item:RoomIndexRes) => ({
    image: item.avatar_image,
    name: item.room_name,
    room_type: item.room_type_txt,
    city_name: item.city.data.name,
    district_name: item.district.data.name,
    coordinate: {
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
    },
    price_day: item.price_day,
    price_hour: item.price_hour,
    number_room: item.number_room,
    id: item.id,
    is_discount: item.is_discount,
    price_day_discount: item.price_day_discount,
    price_hour_discount: item.price_hour_discount,
    instant_book: item.instant_book,
  }));
