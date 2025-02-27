import { StyleSheet, View } from 'react-native';
import React from 'react';
import StackNavigator from './src/routers/StackNavigator';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Fonts } from './src/constants/Themes';

const toastConfig = {
  success: (props : any) => (
    <Toast
      {...props}
      position="top"
      text1Style={{ fontFamily: Fonts.fontBold }}
      text2Style={{ fontFamily: Fonts.fontRegular }}
    />
  ),
  error: (props: any) => (
    <Toast
      {...props}
      position="top"
      text1Style={{ fontFamily: Fonts.fontBold }}
      text2Style={{ fontFamily: Fonts.fontRegular }}
    />
  ),
  info: (props: any) => (
    <Toast
      {...props}
      position="top"
      text1Style={{ fontFamily: Fonts.fontBold }}
      text2Style={{ fontFamily: Fonts.fontRegular }}
    />
  ),
};


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
