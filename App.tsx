import { StyleSheet, View } from 'react-native';
import React from 'react';
import StackNavigator from './src/routers/StackNavigator';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Fonts } from './src/constants/Themes';




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
