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
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { Colors } from '../../services/Colors';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import NextButton from '../../components/NextButton';
import { Fonts, Icons, IMAGES } from '../../constants/Themes';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');

const SignIn = () => {
    const [selected, setSelected] = useState(false); 
    const navigation = useNavigation()

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

                <View style={{ width: '100%', marginTop:40 }}>

                    <InputField placeholder="Email" />

                    <View style={{ marginTop: 20 }}>
                        <PasswordField placeholder="Password" />
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

                        <TouchableOpacity onPress={()=>navigation.navigate('ResetPassword')}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: '100%', marginTop: 40 }}>
                    <NextButton title={'Login'} color={Colors.background} style={{ width: '45%' }} onPress={()=> navigation.navigate('Home')} />
                </View>
                <View style={{ marginTop: 100, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>
                        <Text style={{ color: Colors.secondaryText, marginHorizontal: 8, bottom: 1,         fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular }}>or login with</Text>
                        <View style={{ width: 26, height: 1, backgroundColor: Colors.inputFieldColor }}></View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity>
                        <Image source={Icons.facebook} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), right: 6, }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Icons.google} resizeMode='contain' style={{ width: RFPercentage(4), height: RFPercentage(4), left: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:65}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: Colors.secondaryText, fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular }}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                            <Text style={{ color: Colors.gradient1,fontSize: RFPercentage(1.3), fontFamily: Fonts.fontRegular, left:3 }}>Sign Up</Text>
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
        fontSize: RFPercentage(1.3),
        color: Colors.secondaryText,
        marginLeft: 10,
        fontFamily: Fonts.fontRegular,
        bottom: 2
    },
    forgotPassword: {
        fontSize: RFPercentage(1.3),
        color: Colors.secondaryText,
        fontFamily: Fonts.fontRegular,
        bottom: 2
    },
});
