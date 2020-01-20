import { AxiosRes } from './../../../../types/ResponseTemplate';
import { axios } from 'utils/api';
import { updateObject } from 'utils/mixins';
import { Dispatch, Reducer } from 'redux';
import { LTRoomIndexRes } from 'types/LTR/LTRoom/LTRoom';

export type LTRoomReducerState = {
  readonly room: LTRoomIndexRes | null;
  readonly error: boolean;
};

export type LTRoomReducerAction =
  | { type: 'setLTRoom'; payload: LTRoomIndexRes }
  | { type: 'setErrorSSRLTRoompage'; payload: boolean }

export const init: LTRoomReducerState = {
  room: null,
  error: false,
};

export const ltroomReducer: Reducer<LTRoomReducerState, LTRoomReducerAction> = (
  state: LTRoomReducerState = init,
  action: LTRoomReducerAction
): LTRoomReducerState => {
  switch (action.type) {
    case 'setLTRoom':
      return updateObject(state, { room: action.payload });
    case 'setErrorSSRLTRoompage':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getLTRoom = async (
  idRoom: any,
  initLanguage: string = 'en'
): Promise<LTRoomIndexRes> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getDataLTRoom = async (
  id: number,
  dispatch: Dispatch<LTRoomReducerAction>,
  initLanguage: string = 'en'
): Promise<any> => {
  try {
    const res = await Promise.all([
      getLTRoom(id, initLanguage),
    ]);
    const [room] = res;
    dispatch({ type: 'setLTRoom', payload: room });
    dispatch({ type: 'setErrorSSRLTRoompage', payload: false });
    return { room };
  } catch (error) {
    dispatch({ type: 'setErrorSSRLTRoompage', payload: true });
  }
};
