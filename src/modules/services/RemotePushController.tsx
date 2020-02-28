import React, {FC, useEffect} from 'react';
import {Alert} from 'react-native';
// @ts-ignore
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';

const RemotePushController = () => {

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
    } else {
    }
  };

  let messageListener = async () => {
    const notificationListener = firebase.notifications().onNotification((notification) => {
      const {title, body} = notification;
      showAlert(title, body);
    });

    const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const {title, body} = notificationOpen.notification;
      showAlert(title, body);
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      showAlert(title, body);
    }

    messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    checkPermission();
    messageListener();

    PushNotification.configure({
      // @ts-ignore
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // @ts-ignore
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
      },

      senderID: '53949270433',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default RemotePushController;
