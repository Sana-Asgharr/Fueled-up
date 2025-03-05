import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import AddCard from '../screens/homescreens/profile/AddCard';
import FAQS from '../screens/homescreens/settings/FAQ';
import Terms from '../screens/homescreens/settings/Terms';
import Privacy from '../screens/homescreens/settings/Privacy';
import AddVehicle from '../screens/homescreens/vehicles/AddVehicle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import VitalsDetails from '../screens/chart/VitalsDetails';
import BarChartScreen from '../screens/chart/BarChart';

export type RootStackParamList = {
    SplashOne: undefined;
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ResetPassword: undefined;
    OTP: undefined;
    ChangePassword: undefined;
    Home: undefined;
    OrderCompleted: undefined;
    FuelOrder: undefined;
    PaymentMethod: undefined;
    PlaceOrder: undefined;
    EditProfile: undefined;
    ChangePasswordScreen: undefined;
    Cards: undefined;
    AddCard: undefined;
    FAQS: undefined;
    Terms: undefined;
    Privacy: undefined;
    AddVehicle: undefined;
    VitalsDetails : undefined;
    BarChartScreen : undefined
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [google, setGoogle] = useState<string | null>(null);
    const [facebook, setFaceBook] = useState<string | null>(null);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('FCM Permission Granted');
        }
    }

    const getToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log('FCM Token:', token);
            await AsyncStorage.setItem('fcmToken', token);
        } catch (error) {
            console.error('Error getting FCM Token:', error);
        }
    };

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                const storedGoogle = await AsyncStorage.getItem('google');
                const storedFacebook = await AsyncStorage.getItem('facebook');

                setFaceBook(storedFacebook);
                setGoogle(storedGoogle);
                setEmail(storedEmail);
                setPassword(storedPassword);
                if (storedEmail && storedPassword || storedGoogle || storedFacebook) {
                    await requestUserPermission();
                    await getToken();
                }
            } catch (error) {
                console.error('Error fetching credentials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCredentials();
    }, []);

    if (loading) return null;


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}
                    initialRouteName={(email && password) || facebook || google ? 'Home' : 'SplashOne'}
                >
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
                    <Stack.Screen name='AddCard' component={AddCard} />
                    <Stack.Screen name='FAQS' component={FAQS} />
                    <Stack.Screen name='Terms' component={Terms} />
                    <Stack.Screen name='Privacy' component={Privacy} />
                    <Stack.Screen name='AddVehicle' component={AddVehicle} />
                    <Stack.Screen name='VitalsDetails' component={VitalsDetails} />
                    <Stack.Screen name='BarChartScreen' component={BarChartScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})