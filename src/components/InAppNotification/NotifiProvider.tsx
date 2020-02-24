import React, { useRef } from 'react';
import PropTypes from 'prop-types';
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
      <Notification {...props} ref={refNoti} />
    </NotificationContext.Provider>
  );
};

ProviderNotifi.propTypes = {
  ...Notification.propTypes,
  children: PropTypes.element.isRequired,
};

export default ProviderNotifi;
