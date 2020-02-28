import React, { useRef } from 'react';
import {NotificationContext} from 'store/context/notification/NotifiContext';

const ProviderNotifi = (props:any) => {
  const refNoti = useRef(null);

  const showNotification = (notificationOptions:any) => {
    if (refNoti) {
      // @ts-ignore
      refNoti.current.show(notificationOptions);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {props.children}
      {/*<Notification {...props} ref={refNoti} />*/}
    </NotificationContext.Provider>
  );
};

export default ProviderNotifi;
