import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export const scheduleNotification = (title, message) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
    },
    trigger: null,
  });
};

export const registerNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export const addNotificationListener = () => {
  Notifications.addNotificationReceivedListener((notification) => {
    // Handle the notification here if needed
    Alert.alert(notification.request.content.title, notification.request.content.body);
  });
};
