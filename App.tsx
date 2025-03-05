import { StyleSheet, View,Alert  } from 'react-native';
import React,{useEffect} from 'react';
import StackNavigator from './src/routers/StackNavigator';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Fonts } from './src/constants/Themes';
import messaging from '@react-native-firebase/messaging';

// useEffect(() => {
//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     Alert.alert('New Notification', remoteMessage?.notification?.title);
//   });
//   return unsubscribe;
// }, []);

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StackNavigator />
      <Toast />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
