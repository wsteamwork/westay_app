import { Reducer, Dispatch } from 'redux';
import _ from 'lodash';
import {ImagesRes} from 'types/LTR/Images/ImageResponses';
import {updateObject} from 'utils/mixins';
import {AxiosRes} from 'types/ResponseTemplate';
import {axios_merchant} from 'utils/api';

export type ImageReducerState = {
  room_id: number | null;
  number_bedroom: number;
  number_bathroom: number;
  avatar_image: ImagesRes;
  cover_photo: ImagesRes;
  livingrooms: ImagesRes;
  bedrooms: any;
  kitchens: ImagesRes;
  bathrooms: any;
  outdoors: ImagesRes;
  furnitures: ImagesRes;
  error: boolean;
};

export const init: ImageReducerState = {
  room_id: null,
  number_bedroom: 0,
  number_bathroom: 0,
  avatar_image: { images: [] },
  cover_photo: { images: [] },
  livingrooms: { images: [] },
  bedrooms: {},
  kitchens: { images: [] },
  bathrooms: {},
  outdoors: { images: [] },
  furnitures: { images: [] },
  error: false
};

export type ImageReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setNumberBedroom'; payload: number }
  | { type: 'setNumberBathroom'; payload: number }
  | { type: 'setAvatarImage'; payload: ImagesRes }
  | { type: 'setCoverImage'; payload: ImagesRes }
  | { type: 'setLivingRoomImage'; payload: ImagesRes }
  | { type: 'setKitchensImage'; payload: ImagesRes }
  | { type: 'setOutdoorsImage'; payload: ImagesRes }
  | { type: 'setFurnituresImage'; payload: ImagesRes }
  | { type: 'setBedRoomImage'; payload: any }
  | { type: 'setBathRoomImage'; payload: any }
  | { type: 'setError'; payload: boolean };

export const imageReducer: Reducer<ImageReducerState, ImageReducerAction> = (
  state: ImageReducerState = init,
  action: ImageReducerAction
): ImageReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject<ImageReducerState>(state, { room_id: action.payload });
    case 'setNumberBedroom':
      return updateObject<ImageReducerState>(state, { number_bedroom: action.payload });
    case 'setNumberBathroom':
      return updateObject<ImageReducerState>(state, { number_bathroom: action.payload });
    case 'setAvatarImage':
      return updateObject<ImageReducerState>(state, { avatar_image: action.payload });
    case 'setCoverImage':
      return updateObject<ImageReducerState>(state, { cover_photo: action.payload });
    case 'setLivingRoomImage':
      return updateObject<ImageReducerState>(state, { livingrooms: action.payload });
    case 'setKitchensImage':
      return updateObject<ImageReducerState>(state, { kitchens: action.payload });
    case 'setOutdoorsImage':
      return updateObject<ImageReducerState>(state, { outdoors: action.payload });
    case 'setFurnituresImage':
      return updateObject<ImageReducerState>(state, { furnitures: action.payload });
    case 'setBedRoomImage':
      return updateObject<ImageReducerState>(state, {
        bedrooms: { ...state.bedrooms, ...action.payload }
      });
    case 'setBathRoomImage':
      return updateObject<ImageReducerState>(state, {
        bathrooms: { ...state.bathrooms, ...action.payload }
      });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataImages = async (
  id: any,
  dispatch: Dispatch<ImageReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const data = res.data.data;
    const room_id = data.room_id;
    const number_bedroom = res.data.data.bedrooms.number_bedroom;
    const number_bathroom = res.data.data.bathrooms.number_bathroom;
    dispatch({ type: 'setRoomId', payload: room_id });
    dispatch({ type: 'setNumberBedroom', payload: number_bedroom });
    dispatch({ type: 'setNumberBathroom', payload: number_bathroom });
    dispatch({ type: 'setAvatarImage', payload: data.avatar ? data.avatar : { images: [] } });
    dispatch({
      type: 'setCoverImage',
      payload: data.cover_photo ? data.cover_photo : { images: [] }
    });
    dispatch({
      type: 'setLivingRoomImage',
      payload: data.livingrooms ? data.livingrooms : { images: [] }
    });
    dispatch({ type: 'setKitchensImage', payload: data.kitchens ? data.kitchens : { images: [] } });
    dispatch({ type: 'setOutdoorsImage', payload: data.outdoors ? data.outdoors : { images: [] } });
    dispatch({
      type: 'setFurnituresImage',
      payload: data.furnitures ? data.furnitures : { images: [] }
    });
    if (number_bedroom) {
      _.times(number_bedroom, (i) =>
        dispatch({
          type: 'setBedRoomImage',
          payload: { [`bedroom_${i + 1}`]: { images: data.bedrooms[`bedroom_${i + 1}`].images } }
        })
      );
    }
    if (number_bathroom) {
      _.times(number_bathroom, (i) =>
        dispatch({
          type: 'setBathRoomImage',
          payload: { [`bathroom_${i + 1}`]: { images: data.bathrooms[`bathroom_${i + 1}`].images } }
        })
      );
    }
    return data;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
