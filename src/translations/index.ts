import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import storage from '../utils/storage';

import auth_vi from './Auth/auth-vi.json';
import auth_en from './Auth/auth-en.json';
import account_vi from './Account/account-vi.json';
import account_en from './Account/account-en.json';
import booking_vi from './Booking/booking-vi.json';
import booking_en from './Booking/booking-en.json';
import shared_vi from './Shared/shared-vi.json';
import shared_en from './Shared/shared-en.json';
import filter_vi from './Filter/filter-vi.json';
import filter_en from './Filter/filter-en.json';
import home_vi from './Home/home-vi.json';
import home_en from './Home/home-en.json';
import listRooms_en from './ListRooms/listRooms-en.json';
import listRooms_vi from './ListRooms/listRooms-vi.json';
import map_vi from './Map/map-vi.json';
import map_en from './Map/map-en.json';
import saved_vi from './Saved/saved-vi.json';
import saved_en from './Saved/saved-en.json';
import details_en from './Detail/details-en.json';
import details_vi from './Detail/details-vi.json';
import host_vi from './Merchant/host/host-vi.json';
import host_en from './Merchant/host/host-en.json';
import create_basic_en from './Merchant/listing/basic/basic-en.json';
import create_basic_vi from './Merchant/listing/basic/basic-vi.json';
import create_details_en from './Merchant/listing/details/details-en.json';
import create_details_vi from './Merchant/listing/details/details-vi.json';
import create_price_en from './Merchant/listing/price/price-en.json';
import create_price_vi from './Merchant/listing/price/price-vi.json';
import roomList_en from './Merchant/listing/roomlist/roomlist-en.json';
import roomList_vi from './Merchant/listing/roomlist/roomlist-vi.json';

const STORAGE_KEY = '@APP:languageCode';

// creating a language detection plugin using expo
// http://i18n.com/docs/ownplugin/#languagedetector
const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async (callback: any) => {
    // const savedDataJSON = await storage
    //   .load({
    //     autoSync: true,
    //     key: 'initLanguage',
    //   })
    //   .catch((err: any) => console.log(err));
    // const lng = savedDataJSON ? savedDataJSON : null;
    const lng = 'vi';
    const selectLanguage = lng || 'vi';
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  //@ts-ignore
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    resources: {
      en: {
        auth: auth_en,
        account: account_en,
        booking: booking_en,
        shared: shared_en,
        filter: filter_en,
        home: home_en,
        listRooms: listRooms_en,
        map: map_en,
        saved: saved_en,
        details:details_en,
        host:host_en,
        create_basic: create_basic_en,
        create_details: create_details_en,
        create_price: create_price_en,
        host_listing: roomList_en,
      },
      vi: {
        auth: auth_vi,
        account: account_vi,
        booking: booking_vi,
        shared: shared_vi,
        filter: filter_vi,
        home: home_vi,
        listRooms: listRooms_vi,
        map: map_vi,
        saved: saved_vi,
        details:details_vi,
        host:host_vi,
        create_basic: create_basic_vi,
        create_details: create_details_vi,
        create_price: create_price_vi,
        host_listing: roomList_vi,
      },
    },
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    //   cache: {
    //  enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
