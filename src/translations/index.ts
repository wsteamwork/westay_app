import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import storage from '../utils/storage';

const STORAGE_KEY = '@APP:languageCode';

// creating a language detection plugin using expo
// http://i18n.com/docs/ownplugin/#languagedetector
const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async (callback: any) => {
    const savedDataJSON = await storage
      .load({
        autoSync: true,
        key: 'initLanguage',
      })
      .catch((err: any) => console.log(err));
    const lng = savedDataJSON ? savedDataJSON : null;
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
      en: {},
      vi: {},
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
