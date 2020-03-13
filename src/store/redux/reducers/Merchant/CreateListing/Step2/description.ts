import { Dispatch, Reducer } from 'redux';
import axios from 'axios';
import {updateObject} from 'utils/mixins';
import {AxiosRes} from 'types/ResponseTemplate';
import {axios_merchant} from 'utils/api';

export type DescriptionReducerState = {
  room_id: number | null;
  name: string;
  description: string;
  space: string;
  rules: string;
  lang: string;
  name_en: string;
  description_en: string;
  space_en: string;
  rules_en: string;
  lang_en: string;
  error: boolean;
};

export const init: DescriptionReducerState = {
  room_id: null,
  name: '',
  description: '',
  space: '',
  rules: '',
  lang: 'vi',
  name_en: '',
  description_en: '',
  space_en: '',
  rules_en: '',
  lang_en: 'en',
  error: false
};

export type DescriptionReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setName'; payload: string }
  | { type: 'setDescription'; payload: string }
  | { type: 'setSpace'; payload: string }
  | { type: 'setRules'; payload: string }
  | { type: 'setLang'; payload: string }
  | { type: 'setNameEN'; payload: string }
  | { type: 'setDescriptionEN'; payload: string }
  | { type: 'setSpaceEN'; payload: string }
  | { type: 'setRulesEN'; payload: string }
  | { type: 'setLangEN'; payload: string }
  | { type: 'setError'; payload: boolean };

export const descriptionReducer: Reducer<DescriptionReducerState, DescriptionReducerAction> = (
  state: DescriptionReducerState = init,
  action: DescriptionReducerAction
): DescriptionReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { room_id: action.payload });
    case 'setName':
      return updateObject(state, { name: action.payload });
    case 'setDescription':
      return updateObject(state, { description: action.payload });
    case 'setSpace':
      return updateObject(state, { space: action.payload });
    case 'setRules':
      return updateObject(state, { rules: action.payload });
    case 'setLang':
      return updateObject(state, { lang: action.payload });
    case 'setNameEN':
      return updateObject(state, { name_en: action.payload });
    case 'setDescriptionEN':
      return updateObject(state, { description_en: action.payload });
    case 'setSpaceEN':
      return updateObject(state, { space_en: action.payload });
    case 'setRulesEN':
      return updateObject(state, { rules_en: action.payload });
    case 'setLangEN':
      return updateObject(state, { lang_en: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataDescription = async (
  id: any,
  dispatch: Dispatch<DescriptionReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const about_room_vi = res.data.data.about_room.vi;

    dispatch({ type: 'setRoomId', payload: room_id });
    dispatch({
      type: 'setName',
      payload: about_room_vi && about_room_vi.name ? about_room_vi.name : ''
    });
    dispatch({
      type: 'setDescription',
      payload: about_room_vi && about_room_vi.description ? about_room_vi.description : ''
    });
    dispatch({
      type: 'setSpace',
      payload: about_room_vi && about_room_vi.space ? about_room_vi.space : ''
    });
    dispatch({
      type: 'setRules',
      payload: about_room_vi && about_room_vi.note ? about_room_vi.note : ''
    });
    return about_room_vi;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
export const getDataDescriptionEN = async (
  id: any,
  dispatch: Dispatch<DescriptionReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const about_room_en = res.data.data.about_room.en;

    dispatch({ type: 'setRoomId', payload: room_id });

    //EN
    dispatch({
      type: 'setNameEN',
      payload: about_room_en && about_room_en.name ? about_room_en.name : ''
    });
    dispatch({
      type: 'setDescriptionEN',
      payload: about_room_en && about_room_en.description ? about_room_en.description : ''
    });
    dispatch({
      type: 'setSpaceEN',
      payload: about_room_en && about_room_en.space ? about_room_en.space : ''
    });
    dispatch({
      type: 'setRulesEN',
      payload: about_room_en && about_room_en.note ? about_room_en.note : ''
    });
    return about_room_en;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
export const getDetailDescription = async (
  id: any,
  dispatch: Dispatch<DescriptionReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const detail_room_vi = res.data.data.detail_room.vi;
    dispatch({ type: 'setRoomId', payload: room_id });
    dispatch({
      type: 'setName',
      payload: detail_room_vi && detail_room_vi.name ? detail_room_vi.name : ''
    });
    dispatch({
      type: 'setDescription',
      payload: detail_room_vi && detail_room_vi.description ? detail_room_vi.description : ''
    });
    dispatch({
      type: 'setSpace',
      payload: detail_room_vi && detail_room_vi.space ? detail_room_vi.space : ''
    });
    dispatch({
      type: 'setRules',
      payload: detail_room_vi && detail_room_vi.note ? detail_room_vi.note : ''
    });
    dispatch({
      type: 'setLang',
      payload: detail_room_vi && detail_room_vi.lang ? detail_room_vi.lang : ''
    });
    return detail_room_vi;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
export const getDetailDescriptionEN = async (
  id: any,
  dispatch: Dispatch<DescriptionReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const room_id = res.data.data.room_id;
    const detail_room_en = res.data.data.detail_room.en;
    dispatch({ type: 'setRoomId', payload: room_id });

    //EN
    dispatch({
      type: 'setNameEN',
      payload: detail_room_en && detail_room_en.name ? detail_room_en.name : ''
    });
    dispatch({
      type: 'setDescriptionEN',
      payload: detail_room_en && detail_room_en.description ? detail_room_en.description : ''
    });
    dispatch({
      type: 'setSpaceEN',
      payload: detail_room_en && detail_room_en.space ? detail_room_en.space : ''
    });
    dispatch({
      type: 'setRulesEN',
      payload: detail_room_en && detail_room_en.note ? detail_room_en.note : ''
    });
    dispatch({
      type: 'setLangEN',
      payload: detail_room_en && detail_room_en.lang ? detail_room_en.lang : ''
    });
    return detail_room_en;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const handleTranslateToEnglish = async (text: string) => {
  let fromLang = 'vi';
  let toLang = 'en';
  let API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
  let url = 'https://translation.googleapis.com/language/translate/v2';
  try {
    const res = await axios
      .get(url, {
        params: {
          key: API_KEY,
          q: text,
          source: fromLang,
          target: toLang,
        }
      })
    return res.data.data.translations[0].translatedText;
  } catch (error) {
    console.log('There was an error with the translation request: ', error);
  }
};
