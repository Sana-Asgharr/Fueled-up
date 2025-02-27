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
import { RFPercentage } from "react-native-responsive-fontsize";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';

const { width, height } = Dimensions.get('window');

const SignUp:React.FC = () => {
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'SignUp'>>()
   
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

                <View style={{ width: '100%', marginTop:20 }}>
                    <InputField placeholder="Name" />
                    <View style={{ marginTop: 16 }}>
                    <InputField placeholder="Email" />
                    </View>
                    <View style={{ marginTop: 16 }}>
                    <InputField placeholder="Phone Number" />
                    </View>
                    <View style={{ marginTop: 16 }}>
                    <InputField placeholder="Password" />
                    </View>
                    <View style={{ marginTop: 16 }}>
                    <InputField placeholder="Confirm Password" />
                    </View>

                    
                </View>
                <View style={{ width: '100%', marginTop: 40 }}>
                    <NextButton title={'Sign Up'} color={Colors.background} style={{ width: '45%' }} onPress={()=> console.log('sign up')} />
                </View>
                <View style={{ marginTop: RFPercentage(10), }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>
                        <Text style={{ color: Colors.secondaryText, marginHorizontal: 8, bottom: 1,fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>or sign up with</Text>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RFPercentage(4) }}>
                    <TouchableOpacity>
                        <Image source={Icons.facebook} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), right: 6, }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Icons.google} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), left: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:RFPercentage(5)}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: Colors.secondaryText,fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}>Already have an account?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('SignIn')}>
                            <Text style={{ color: Colors.gradient1, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular, left:3 }}>Sign In</Text>
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
        marginTop: 40,
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
