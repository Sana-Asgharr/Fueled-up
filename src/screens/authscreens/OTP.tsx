import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../services/Colors';
import InputField from '../../components/InputField';
import NextButton from '../../components/NextButton';
import { Fonts, Icons, IMAGES } from '../../constants/Themes';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from "react-native-responsive-fontsize";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { Formik } from 'formik';

const { width, height } = Dimensions.get('window');

const OTP:React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'OTP'>>()
     let validationSchema = yup.object({
            phone: yup
                .string()
                .required('Phone number is required'),
        });
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
                        style={{ width: 140, height: 90, alignSelf: 'center', right:8, }}
                    />
                    <View></View>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Reset Password?</Text>

                <View style={{ width: '100%', marginTop: 30 }}>
                    <InputField placeholder="Enter Sent OTP" />

                </View>
                <View style={{ width: '100%', marginTop: 50 }}>
                    <NextButton title={'Verify'} color={Colors.background} style={{ width: '45%' }} onPress={() => navigation.navigate('ChangePassword')} />
                </View>


            </View>
        </SafeAreaView>
    );
};

export default OTP;

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
