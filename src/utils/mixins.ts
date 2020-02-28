import { hp } from './responsive';
import {Platform, Animated} from 'react-native';
import {useState, useContext} from 'react';
import {axios} from './api';
import {SearchFilterState} from 'store/redux/reducers/search/searchField';
import {CityType} from 'types/Cities/CityResponse';
import qs from 'query-string';
import {AuthContext} from 'store/context/auth';
// @ts-ignore
import Share from 'react-native-share';

import moment from 'moment';
export const convertString = (query: object)  => {
  return {
    ...query,
    include: 'media,prices,details,city,district',
  };
};

export const updateObject = <T>(oldObject: T, newObject: Partial<T>): T => {
  return {
    ...oldObject,
    ...newObject
  };
};

export const cleanAccents = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

  return str;
};

export const getFirstLetterOfName = (name: string) => {
  let splitName = name.split(' ');
  let itemLast = splitName.slice(-1).pop();
  return itemLast!.substring(0, 1);
};

export const __currentPlatform = () => {
  return Platform.OS === 'android';
};

export const elevationShadowStyle = (elevation1to24: number) => {
  return {
    elevation: elevation1to24,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 0.5 * elevation1to24 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation1to24
  };
};


export const IMAGE_PLACEHOLDER =
  'https://cdn5.vectorstock.com/i/1000x1000/53/74/christmas-seamless-pattern-vector-27655374.jpg';

export const handleScalePressIn = (animatedValue: any) => {
  Animated.spring(animatedValue, {
    toValue: 0.95,
  }).start();
};

export const handleScalePressOut = (animatedValue: any) => {
  Animated.spring(animatedValue, {
    toValue: 1,
    friction: 10,
    tension: 40,
  }).start();
};
export const animatedStyle = (animatedValue: any) => {
  return {
    transform: [{ scale: animatedValue }],
  };
};

export const formatMoney = (
  amount: any,
  decimalCount: number = 0,
  decimal: string = '.',
  thousands: string = ','
): string | void => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j: number = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
      Math.abs(amount - i)
        .toFixed(decimalCount)
        .slice(2)
        : '')
    );
  } catch (e) {
    console.error(e);
  }
};

// @ts-ignore
export const formatPrice = (price: number): string | number => {
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;

  const lang = languageStatus;
  try {
    let format = '';
    if (price >= 1000000) {
      format = (price / 1000000).toFixed(1) + 'tr';
    }
    return lang && lang === 'vi' ? format : `$${price}`;
  } catch (e) {
    console.error(e);
  }
};

export const useCheckbox = () => {
  const [typeRoom, setTypeRoom] = useState<any>([]);
  const [typeAmenities, setTypeAmenities] = useState<any>([]);

  // @ts-ignore
  const addDataRoomType = ({ label, checked }, id) => {
    let list = [...typeRoom];

    // @ts-ignore
    if (list.some(i => i.name === label)) {
      // @ts-ignore
      list = list.filter(item => item.name !== label);
    } else {
      // @ts-ignore
      list = [...list, { name: label, checked, id }];
    }

    setTypeRoom(list);
  };

  // @ts-ignore
  const addDataAmenities = ({ label, checked }, id) => {
    let list = [...typeAmenities];

    // @ts-ignore
    if (list.some(i => i.name === label)) {
      // @ts-ignore
      list = list.filter(item => item.name !== label);
    } else {
      // @ts-ignore
      list = [...list, { name: label, checked, id }];
    }

    setTypeAmenities(list);
  };

  return [
    addDataRoomType,
    typeRoom,
    setTypeRoom,
    addDataAmenities,
    typeAmenities,
    setTypeAmenities,
  ];
};

export const getDataFilter = async (languageStatus: string) => {
  const data = await Promise.all([
    axios.get('rooms/type', { headers: { 'Accept-Language': languageStatus } }),
    axios.get('comforts?include=details', {
      headers: { 'Accept-Language': languageStatus },
    }),
  ]);

  const dataRoomType = data[0].data
    ? data[0].data.map((item:any) => ({
      id: item.id,
      name: item.value,
      type: 1,
    }))
    : [];

  const dataComfortsType = data[1].data
    ? data[1].data.data.map((item:any) => ({
      id: item.id,
      name: item.details.data[0].name,
      type: 2,
    }))
    : [];

  return [
    {title: 'Loại phòng', data: dataRoomType},
    {title: 'Tiện nghi', data: dataComfortsType},
  ];
};

export const getDataListRooms = async (
  searchField:SearchFilterState,
  currCity:CityType | null,
  uri = '',
  findAround:boolean,
  languageStatus:string,
) => {
  let query:SearchFilterState = {
    name: searchField.name,
    number_guest: searchField.number_guest,
    bedrooms: searchField.bedrooms,
    check_in: searchField.check_in,
    check_out: searchField.check_out,
  };

  if (currCity && currCity.type === 1) {
    query = { ...query, city_id: currCity.id };
  }

  if (currCity && currCity.type === 2) {
    query = { ...query, district_id: currCity.id };
  }

  if (searchField.check_in) {
    query = { ...query, check_in: searchField.check_in };
  }

  if (searchField.check_out) {
    query = { ...query, check_out: searchField.check_out };
  }

  if (searchField.comfort_lists) {
    query = { ...query, comfort_lists: searchField.comfort_lists };
  }

  if (searchField.accommodation_type) {
    query = { ...query, accommodation_type: searchField.accommodation_type };
  }

  if (searchField.instant_book) {
    query = { ...query, instant_book: searchField.instant_book };
  }

  if (searchField.min_price) {
    query = { ...query, min_price: searchField.min_price };
  }

  if (searchField.max_price) {
    query = { ...query, max_price: searchField.max_price };
  }

  let url = `long-term-rooms?${qs.stringify(convertString(query))}&${uri}`;

  if (findAround) {
    url = `long-term-rooms?${qs.stringify(convertString(query))}&${uri}`;
  }

  return axios
    .get(url, { headers: { 'Accept-Language': languageStatus } })
    .then(res => {
      return res
    })
    .catch(err => console.log(err));
};

export const handleShareSocial = (status:string, link:string, t:any) =>{

  Share.shareSingle({
    title: t('account:shared:titleShare'),
    url: link,
    failOnCancel: false,
    message: t('account:shared:messageShare'),
    social:
      status === 'fb'
        ? Share.Social.FACEBOOK
        : status === 'ins'
        ? Share.Social.INSTAGRAM
        : Share.Social.GOOGLEPLUS,
  });
};

export const inputContainerStyleGlobal =  {
    height: hp('7%'),
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    elevation: 10,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
};

export const formatDateBooking = (date: string, lang: string, showYear?: boolean) => {
  let dateVN = showYear ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM');
  return lang === 'vi' ? dateVN : moment(date).format('ll').split(",")[0];
}

export const UPCOMING = 1;
export const CURRENT = 2;
export const FINISHED = 3;
