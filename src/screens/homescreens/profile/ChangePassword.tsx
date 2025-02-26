import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

const ChangePasswordScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'ChangePasswordScreen'>>()
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                        Change Password
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                        </TouchableOpacity>
                    </View>

                </View>
                
                <View>
                    <View style={{ marginTop: RFPercentage(6) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Old Password</Text>
                        <EditField placeholder="Enter" visible={false} password={true} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>New Password</Text>
                        <EditField placeholder="Enter" visible={false} password={true} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Repeat New Password</Text>
                        <EditField placeholder="Enter" visible={false} password={true} />
                    </View>
                </View>

                <View style={{ marginTop: RFPercentage(40) }}>
                    <NextButton title={'Save'} style={{ width: '50%' }} color={Colors.background} />
                </View>


            </View>
        </SafeAreaView>

    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.background
    },
    container: {
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        flex: 1
    }
})