import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Linking,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import InputField from '../../components/InputField';
import NextButton from '../../components/NextButton';
import { Fonts, Icons, IMAGES, Colors } from '../../constants/Themes';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('window');
import { RFPercentage } from "react-native-responsive-fontsize";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { Formik } from 'formik';
import { auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
import { BlurView } from "@react-native-community/blur";

const ResetPassword: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);

    let validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
    });


    const handleReset = async (values: any) => {
        try {
            if (values.email) {
                await sendPasswordResetEmail(auth, values.email);
                setModalVisible(true)
                Toast.show({
                    type: 'success',
                    text1: 'Reset Password',
                    text2: 'Check your email for the reset link.',
                });
            }
        }
        catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
        }

    };

    const openGmailInbox = async () => {
        if (Platform.OS === 'android') {
          const url = 'intent://inbox/#Intent;scheme=android-app;package=com.google.android.gm;end;';
          Linking.openURL(url).catch(err => console.error("Couldn't open Gmail", err));
        } else {
          Linking.openURL('message://').catch(err => console.error("Couldn't open Mail app", err));
        }
      };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ paddingHorizontal: width * 0.08, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ bottom: 5 }}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={18} />
                    </TouchableOpacity>
                    <Image
                        source={IMAGES.logo}
                        resizeMode="contain"
                        style={{ width: 140, height: 90, alignSelf: 'center', right: 8 }}
                    />
                    <View></View>
                </View>
            </View>
            <View style={styles.container}>

                <Text style={styles.welcomeText}>Reset Password?</Text>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => handleReset(values)}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View style={{ width: '100%', marginTop: 30 }}>
                                <InputField placeholder="Enter Email" onChangeText={handleChange('email')}
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

                            </View>
                            <View style={{ width: '100%', marginTop: 50 }}>
                                <NextButton title={'Send Link'} color={Colors.background} style={{ width: '45%' }} onPress={handleSubmit} />
                            </View>
                        </>
                    )}
                </Formik>
            </View>

            {
                modalVisible && (
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <BlurView
                                style={{ width: '100%', height: '100%', position: 'absolute' }}
                                blurType="light"
                                blurAmount={1}
                            />
                            <View
                                style={{
                                    width: RFPercentage(35),
                                    height: RFPercentage(22),
                                    borderRadius: RFPercentage(2),
                                    backgroundColor: "rgba(243, 244, 246, 1)",
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: "absolute",
                                    paddingHorizontal: 16,
                                    top: RFPercentage(40),
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: RFPercentage(1.5),
                                        fontFamily: Fonts.fontRegular,
                                        color: Colors.fieldColor,
                                    }}
                                >
                                    Reset your password by given link
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 15,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <NextButton
                                        title={'Reset'}
                                        color={Colors.background}
                                        style={{ height: 35, width: '60%' }}
                                        onPress={() => Linking.openURL( 'mailto:')}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }

        </SafeAreaView >
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.1,
        backgroundColor: Colors.background,
        paddingTop: height * 0.02,
        alignItems: 'center',
    },
    welcomeText: {
        color: Colors.primaryText,
        fontFamily: Fonts.fontBold,
        fontSize: RFPercentage(2.3),
        marginTop: 20,
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
        fontSize: 10,
        fontWeight: '400',
        color: Colors.secondaryText,
        marginLeft: 10,
        fontFamily: Fonts.fontRegular,
        bottom: 3
    },
    forgotPassword: {
        fontSize: 10,
        color: Colors.secondaryText,
        fontFamily: Fonts.fontRegular,
        bottom: 3
    },
});
