import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Notification:', remoteMessage);
  
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default'
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'New Message',
    body: remoteMessage.notification?.body || 'You have a new notification',
    android: {
      channelId,
      sound: 'default',
      pressAction: {
        id: 'default',
      },
    },
  });
});

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('Notification caused app to open from background:', remoteMessage);
  
  if (navigationRef.isReady()) {
    navigationRef.navigate('Home');
  }
});

messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage);
      setTimeout(() => {
        if (navigationRef.isReady()) {
          navigationRef.navigate('Home');
        }
      }, 1000);
    }
  });

AppRegistry.registerComponent(appName, () => App);
