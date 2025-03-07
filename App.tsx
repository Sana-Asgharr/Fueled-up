import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/routers/StackNavigator';

const App: React.FC = () => {
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Default Channel',
          channelDescription: 'Used for general notifications',
          playSound: true,
          soundName: 'default',
          importance: 4, 
          vibrate: true,
        },
        (created) => console.log(`Default notification channel created: ${created}`)
      );
    }

    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (enabled) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    };

    requestPermission();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);

      PushNotification.localNotification({
        channelId: 'default-channel-id', 
        title: remoteMessage.notification?.title || 'New Notification',
        message: remoteMessage.notification?.body || 'You have a new message!',
        playSound: true,
        soundName: 'default',
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Notification:', remoteMessage);
    });

    return unsubscribeOnMessage;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StackNavigator />
      <Toast />
    </View>
  );
};

export default App;
