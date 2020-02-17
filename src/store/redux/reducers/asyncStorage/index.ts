import {Reducer} from 'redux';

export const SET_HISTORY_SEARCH = 'SET_HISTORY_SEARCH';

export type AsyncStorageState = {
  historySearch: []
};

export type AsyncStorageAction =
  | { type: 'SET_HISTORY_SEARCH'; payload: [] }


const asyncStorageInitialState: AsyncStorageState = {
  historySearch: [],
};

const asyncStorageReducer: Reducer<AsyncStorageState, AsyncStorageAction> = (
  state:AsyncStorageState = asyncStorageInitialState,
  action: AsyncStorageAction
):AsyncStorageState  => {
  switch (action.type) {
    case SET_HISTORY_SEARCH:
      return { ...state, historySearch: action.payload };
    default:
      return state;
  }
};

export const setHistorySearch = (payload: []) => (dispatch: (arg0: { type: string; payload: []; }) => AsyncStorageAction) =>
  dispatch({ type: SET_HISTORY_SEARCH, payload });

export default asyncStorageReducer;
