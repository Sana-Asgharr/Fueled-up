import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/routers/StackNavigator';

const App: React.FC = () => {

  useEffect(() => {
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
      console.log('Foreground Notification:', remoteMessage)
      onDisplayNotification(remoteMessage)
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Notification:', remoteMessage);
    });
    return unsubscribeOnMessage;
  }, []);

  const onDisplayNotification = async (remoteMessage) => {
    console.log('remoteMessage..........', remoteMessage);
  
    await notifee.requestPermission();
  
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    const { title, body } = remoteMessage.notification || {};
  
    await notifee.displayNotification({
      title: title || 'No Title',
      body: body || 'No Body',
      android: {
        channelId,
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'default',
        },
      },
    });
  };
  



  return (
    <View style={{ flex: 1 }}>
      <StackNavigator />
      <Toast />
    </View>
  );
};

export default App;
