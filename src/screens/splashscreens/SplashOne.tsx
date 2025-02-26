import { ImageBackground, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../constants/Themes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/StackNavigator';

const SplashOne: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SplashOne'>>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('OnBoarding');
        }, 3000);

        return () => clearTimeout(timeout); 
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ImageBackground source={IMAGES.splash} style={styles.image} resizeMode="cover" />
        </SafeAreaView>
    );
};

export default SplashOne;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
