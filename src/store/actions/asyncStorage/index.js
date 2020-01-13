import { SET_HISTORY_SEARCH } from './asyncTypes';

export const setHistorySearch = payload => dispatch =>
  dispatch({ type: SET_HISTORY_SEARCH, payload });
