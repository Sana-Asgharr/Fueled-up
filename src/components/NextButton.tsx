import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../services/Colors';
import { Fonts } from '../constants/Themes';
import { RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');

interface Props {
    onPress: () => void,
    disabled?: boolean,
    color?: string,
    title: string,
    style?: object,
    loading? : boolean
}

const NextButton: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ flex: 1 }} disabled={props.disabled} >
            <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={[styles.nextButton, { ...props.style }]}>
                <Text style={[styles.nextButtonText, { color: props.color }]}>{props.loading ? <ActivityIndicator size={'small'} color={Colors.background} /> : props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default NextButton

const styles = StyleSheet.create({
    nextButton: {
        height: 48,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '75%'
    },
    nextButtonText: {
        fontSize: RFPercentage(1.8),
        fontFamily: Fonts.fontMedium,
        color: Colors.background
    },
})