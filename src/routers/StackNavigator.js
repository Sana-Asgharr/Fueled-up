import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashOne from '../screens/splashscreens/SplashOne';
import OnBoarding from '../screens/onboardingscreens/OnBoarding';
import SignIn from '../screens/authscreens/SignIn';
import SignUp from '../screens/authscreens/SignUp';
import ResetPassword from '../screens/authscreens/ResetPassword';
import OTP from '../screens/authscreens/OTP';
import ChangePassword from '../screens/authscreens/ChangePassword';
import BottomNavigation from './BottomNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OrderCompleted from '../screens/homescreens/home/OrderCompleted';
import OrderFuel from '../screens/homescreens/home/OrderFuel';
import PaymentMethod from '../screens/homescreens/home/PaymentMethod';
import PlaceOrder from '../screens/homescreens/home/PlaceOrder';
import EditProfile from '../screens/homescreens/profile/EditProfile';
import ChangePasswordScreen from '../screens/homescreens/profile/ChangePassword';
import Cards from '../screens/homescreens/profile/Cards';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name='SplashOne' component={SplashOne} />
                    <Stack.Screen name='OnBoarding' component={OnBoarding} />
                    <Stack.Screen name='SignIn' component={SignIn} />
                    <Stack.Screen name='SignUp' component={SignUp} />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} />
                    <Stack.Screen name='OTP' component={OTP} />
                    <Stack.Screen name='ChangePassword' component={ChangePassword} />
                    <Stack.Screen name='Home' component={BottomNavigation} />
                    <Stack.Screen name='OrderCompleted' component={OrderCompleted} />
                    <Stack.Screen name='FuelOrder' component={OrderFuel} />
                    <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
                    <Stack.Screen name='PlaceOrder' component={PlaceOrder} />
                    <Stack.Screen name='EditProfile' component={EditProfile} />
                    <Stack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} />
                    <Stack.Screen name='Cards' component={Cards} />



                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})