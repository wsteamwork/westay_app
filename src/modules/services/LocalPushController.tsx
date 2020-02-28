import React, {FC, useEffect} from 'react';
import {StyleSheet, View, PushNotificationIOS, Alert} from 'react-native';
// @ts-ignore
import PushNotification, {PushNotification} from 'react-native-push-notification';
import firebase from "react-native-firebase";

interface IProps {

}

const LocalPushController: FC<IProps> = (props) => {
  const { } = props;

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
  }, []);

  PushNotification.configure({

    onNotification: function(notification: PushNotification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },});

  PushNotification.localNotification({
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  });

  useEffect(() => {


  }, []);


  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocalPushController;
