import React, {useReducer} from 'react';

import AppNavigator from './RootNavigation';
import {RoomDetailContext, initStateRoom, roomReducer} from 'store/context/room/RoomDetailContext';

export default function NavigatorView() {
  const [stateRoom, dispatchRoomDetail] = useReducer(
    roomReducer,
    initStateRoom,
  );

  return (
    <RoomDetailContext.Provider
      value = {{stateRoom, dispatchRoomDetail}}
    >
      <AppNavigator />
    </RoomDetailContext.Provider>
  );
}
