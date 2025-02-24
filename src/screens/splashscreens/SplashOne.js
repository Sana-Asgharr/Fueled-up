import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { IMAGES } from '../../constants/Themes'

const SplashOne = () => {

    const navigation = useNavigation()
    setTimeout(() => {
        navigation.navigate('OnBoarding')
    }, 3000);

    return (
        <SafeAreaView>
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor="transparent" />
            <ImageBackground
                source={IMAGES.splash}
                style={{
                    width: '100%',
                    height: '100%'
                }}
                resizeMode='cover'
            >
            </ImageBackground>

        </SafeAreaView>
    )
}

export default SplashOne

const styles = StyleSheet.create({})