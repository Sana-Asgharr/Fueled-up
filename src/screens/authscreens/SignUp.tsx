import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import InputField from '../../components/InputField';
import NextButton from '../../components/NextButton';
import { Fonts, Icons, IMAGES, Colors } from '../../constants/Themes';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, FacebookAuthProvider} from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../../firebaseConfig';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { Formik } from 'formik';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const { width, height } = Dimensions.get('window');

const SignUp: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>()
    const [name, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);

    let validationSchema = yup.object({
        name: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string().required('Phone number is required'),
        password: yup
            .string()
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match'),
    });

    const handleSignUp = async (values: any) => {
        if (!values.name || !values.email || !values.phone || !values.password || !values.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Sign Up',
                text2: 'All fields are required',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
            return;
        }
    
        if (values.password !== values.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Sign Up',
                text2: 'Passwords do not match',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
            return;
        }
    
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
    
            await setDoc(doc(db, "Users", user.uid), {
                name: values.name,
                email: values.email,
                phone: values.phone,
                uid: user.uid,  // Store UID in Firestore
            });
    
            Toast.show({
                type: 'success',
                text1: 'Sign Up',
                text2: 'User registered successfully',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
    
            navigation.navigate('Home');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Sign Up',
                text2: error.code === 'auth/email-already-in-use' ? 'Email already exists' : `${error.message}`,
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
        } finally {
            setLoading(false);
        }
    };
    


    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const signInResult = await GoogleSignin.signIn();
            console.log(signInResult)

            if (!signInResult?.data?.user || !signInResult?.data?.idToken) {  
                throw new Error('No ID token found');
            }

            const googleCredential = GoogleAuthProvider.credential(signInResult?.data?.idToken);
            // console.log(googleCredential)
            await signInWithCredential(auth, googleCredential);

            Toast.show({
                type: 'success',
                text1: 'Sign In',
                text2: 'Successfully Signed In with Google',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
            navigation.navigate('Home')

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


    const onFacebookButtonPress = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
            if (result.isCancelled) {
                console.log("Login cancelled");
                return;
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                console.log("Something went wrong with obtaining access token");
                return;
            }
            console.log("Facebook Access Token:", data.accessToken);
        } catch (error) {
            console.error("Facebook Login Error:", error);
        }
    }

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

                <Text style={styles.welcomeText}>Welcome!</Text>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSignUp(values)}>
                    {(
                        {
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }
                    ) => (
                        <>
                            <View style={{ width: '100%', marginTop: RFPercentage(2),position: 'relative', }}>
                                <InputField placeholder="Name" onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    customStyle={{
                                        borderBottomColor: touched.name && errors.name ? Colors.error : Colors.inputFieldColor
                                    }} />
                                {
                                    touched.name && errors.name ?
                                        <>
                                            <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top:3, }}>{errors.name}</Text>
                                        </>
                                        :
                                        null
                                }
                                <View style={{ marginTop: RFPercentage(1) }}>
                                    <InputField placeholder="Email" onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        customStyle={{
                                            borderBottomColor: touched.email && errors.email ? Colors.error : Colors.inputFieldColor
                                        }} />
                                    {
                                        touched.email && errors.email ?
                                            <>
                                                <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>{errors.email}</Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>
                                <View style={{ marginTop: RFPercentage(1) }}>
                                    <InputField placeholder="Phone Number" onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        customStyle={{
                                            borderBottomColor: touched.phone && errors.phone ? Colors.error : Colors.inputFieldColor
                                        }} />
                                    {
                                        touched.phone && errors.phone ?
                                            <>
                                                <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>{errors.phone}</Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>
                                <View style={{ marginTop: RFPercentage(1) }}>
                                    <InputField placeholder="Password" onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        customStyle={{
                                            borderBottomColor: touched.password && errors.password ? Colors.error : Colors.inputFieldColor
                                        }} />
                                    {
                                        touched.password && errors.password ?
                                            <>
                                                <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>{errors.password}</Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>
                                <View style={{ marginTop: RFPercentage(1), }}>
                                    <InputField placeholder="Confirm Password" onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        customStyle={{
                                            borderBottomColor: touched.confirmPassword && errors.confirmPassword ? Colors.error : Colors.inputFieldColor
                                        }} />
                                    {
                                        touched.confirmPassword && errors.confirmPassword ?
                                            <>
                                                <Text style={{ fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, color: Colors.error, top: 3 }}>{errors.confirmPassword}</Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>


                            </View>
                            <View style={{ width: '100%', marginTop: RFPercentage(7) }}>
                                <NextButton title={'Sign Up'} color={Colors.background} style={{ width: '45%' }} onPress={handleSubmit} loading={loading} />
                            </View>

                        </>
                    )}





                </Formik>
                <View style={{ marginTop: RFPercentage(10), }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>
                        <Text style={{ color: Colors.secondaryText, marginHorizontal: 8, bottom: 1, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>or sign up with</Text>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(4) }}>
                    <TouchableOpacity onPress={()=>onFacebookButtonPress().then(() => navigation.navigate('Home'))}>
                        <Image source={Icons.facebook} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), right: 6, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGoogleButtonPress}>
                        <Image source={Icons.google} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), left: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: RFPercentage(3) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: Colors.secondaryText, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={{ color: Colors.gradient1, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular, left: 3 }}>Sign In</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default SignUp;

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
        marginTop: RFPercentage(5),
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
        fontSize: RFPercentage(1.3),
        fontWeight: '400',
        color: Colors.secondaryText,
        marginLeft: 10,
        fontFamily: Fonts.fontRegular,
        bottom: 3
    },
    forgotPassword: {
        fontSize: RFPercentage(1.3),
        color: Colors.secondaryText,
        fontFamily: Fonts.fontRegular,
        bottom: 3
    },
});
