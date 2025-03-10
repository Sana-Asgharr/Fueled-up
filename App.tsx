import React, { useEffect } from 'react';
import { View, Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/routers/StackNavigator';

const App: React.FC = () => {
  
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('POST_NOTIFICATIONS permission denied.');
          }
        }
  
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          console.log('Notification permission granted.');
        } else {
          console.warn('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };
  
    requestNotificationPermission();
  
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      try {
        console.log('Foreground Notification:', remoteMessage);
        onDisplayNotification(remoteMessage);
      } catch (error) {
        console.error('Error handling notification:', error);
      }
    });
  
    return () => {
      unsubscribeOnMessage();
    };
  }, []);
  
  const onDisplayNotification = async (remoteMessage) => {
    try {
      console.log('Received Notification:', remoteMessage);
  
      if (!remoteMessage || !remoteMessage.notification) {
        console.warn('Invalid notification format:', remoteMessage);
        return;
      }
  
      await notifee.requestPermission();
  
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default'
      });
  
      if (!channelId) {
        console.error('Failed to create notification channel.');
        return;
      }
  
      const { title, body } = remoteMessage.notification;
  
      await notifee.displayNotification({
        title: title || 'No Title',
        body: body || 'No Body',
        android: {
          channelId,
          sound: 'default',
          pressAction: { id: 'default' },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <StackNavigator />
      <Toast />
    </View>
  );
};

export default App;
