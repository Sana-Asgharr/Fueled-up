import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import NextButton from '../../components/NextButton';
import { Fonts, Icons, IMAGES, Colors } from '../../constants/Themes';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from '../../../firebaseConfig';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { Formik } from 'formik';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { width, height } = Dimensions.get('window');

GoogleSignin.configure({
    webClientId: '454483361944-ejrpo23t8ai1mt5dn4d90e1s5uc6fjo8.apps.googleusercontent.com',
});

const SignIn: React.FC = () => {
    const [selected, setSelected] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>()
    const [loading, setLoading] = useState<boolean>(false);
    const [storedEmail, setStoredEmail] = useState<string>("");
    const [storedPassword, setStoredPassword] = useState<string>("");

    let validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });


    useEffect(() => {
        loadCredentials();
    }, []);


    const loadCredentials = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem("email");
            const savedPassword = await AsyncStorage.getItem("password");
            if (savedEmail && savedPassword) {
                setStoredEmail(savedEmail);
                setStoredPassword(savedPassword);
            }
        } catch (error) {
            console.error("Error loading credentials", error);
        }
    };


    const setCredentials = async (values: any) => {
        try {
            await AsyncStorage.setItem("email", values.email);
            await AsyncStorage.setItem("password", values.password);
        } catch (error) {
            console.error("Error loading credentials", error);
        }
    };

    const handleSignIn = async (values: any) => {
        if (values.email && values.password) {
            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                if (selected) {
                    await setCredentials(values);
                }
                Toast.show({
                    type: 'success',
                    text1: 'Sign In',
                    text2: 'Successfully Signed In',
                    position: 'top',
                    text1Style: { fontFamily: Fonts.fontBold },
                    text2Style: { fontFamily: Fonts.fontRegular }
                });

                navigation.navigate('Home');
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: 'Sign In',
                    text2: 'Invalid Credentials',
                    position: 'top',
                    text1Style: { fontFamily: Fonts.fontBold },
                    text2Style: { fontFamily: Fonts.fontRegular }
                });
            } finally {
                setLoading(false);
            }
        }
    };


    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const signInResult = await GoogleSignin.signIn();
            if (!signInResult.idToken) {
                throw new Error('No ID token found');
            }
            const googleCredential = GoogleAuthProvider.credential(signInResult.idToken);
            await signInWithCredential(auth, googleCredential);
            Toast.show({
                type: 'success',
                text1: 'Sign In',
                text2: 'Successfully Signed In with Google',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
            // navigation.navigate('Home');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Google Sign In',
                text2: 'Failed to Sign In with Google',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ alignSelf: 'center' }}>
                    <Image
                        source={IMAGES.logo}
                        resizeMode="contain"
                        style={{ width: 140, height: 90 }}
                    />
                </View>
                <Text style={styles.welcomeText}>Welcome Back!</Text>

                <Formik
                    enableReinitialize
                    initialValues={{
                        email: storedEmail,
                        password: storedPassword,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSignIn(values)}>

                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (

                        <>
                            <View style={{ width: '100%', marginTop: 40 }}>
                                <InputField placeholder="Email" onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    customStyle={{
                                        borderBottomColor: touched.email && errors.email ? Colors.error : Colors.inputFieldColor
                                    }}
                                />
                                {
                                    touched.email && errors.email ?
                                        <>
                                            <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>Email is required</Text>
                                        </>
                                        :
                                        null
                                }


                                <View style={{ marginTop: 20 }}>
                                    <PasswordField placeholder="Password" onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        customStyle={{
                                            borderBottomColor: touched.password && errors.password ? Colors.error : Colors.inputFieldColor
                                        }}
                                    />
                                    {
                                        touched.password && errors.password ?
                                            <>
                                                <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>Password is required</Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>

                                <View style={styles.radioContainer}>
                                    <View style={styles.radioButtonRow}>
                                        <RadioButton>
                                            <RadioButtonInput
                                                obj={{ value: 0 }}
                                                index={0}
                                                isSelected={selected}
                                                onPress={() => setSelected(!selected)}
                                                borderWidth={1}
                                                buttonInnerColor={Colors.gradient1}
                                                buttonOuterColor={selected ? Colors.gradient1 : 'rgba(229, 231, 235, 1)'}
                                                buttonSize={6}
                                                buttonOuterSize={12}
                                            />
                                        </RadioButton>
                                        <Text style={styles.radioLabel}>Remember me?</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ width: '100%', marginTop: 40 }}>
                                <NextButton title={'Login'} color={Colors.background} style={{ width: '45%' }} onPress={handleSubmit} loading={loading} />
                            </View>
                        </>
                    )}
                </Formik>
                <View style={{ marginTop: 100, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>
                        <Text style={{ color: Colors.secondaryText, marginHorizontal: 8, bottom: 1, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>or login with</Text>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity>
                        <Image source={Icons.facebook} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), right: 6, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Home'))}>
                        <Image source={Icons.google} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), left: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 65 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: Colors.secondaryText, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: Colors.gradient1, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular, left: 3 }}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.1,
        backgroundColor: Colors.background,
        paddingTop: height * 0.05,
        alignItems: 'center',
    },
    welcomeText: {
        color: Colors.primaryText,
        fontFamily: Fonts.fontBold,
        fontSize: RFPercentage(2.5),
        marginTop: 60,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    radioButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        fontSize: RFPercentage(1.4),
        color: Colors.secondaryText,
        marginLeft: 5,
        fontFamily: Fonts.fontRegular,
        bottom: 2
    },
    forgotPassword: {
        fontSize: RFPercentage(1.4),
        color: Colors.secondaryText,
        fontFamily: Fonts.fontRegular,
        bottom: 2
    },
});
