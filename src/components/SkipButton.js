import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../services/Colors';
import { Fonts } from '../constants/Themes';
import { RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');

const SkipButton = (props) => {
    return (
        <LinearGradient 
            colors={[Colors.gradient1, Colors.gradient2]}
            style={styles.gradientBorder}
        >
            <TouchableOpacity onPress={props.onPress} style={styles.nextButton}>
                <Text style={[styles.nextButtonText, { color: props.color }]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default SkipButton;

const styles = StyleSheet.create({
    gradientBorder: {
        width: '43%',
        height: 50,
        borderRadius: 40,
        padding: 2,
        left:8
    },
    nextButton: {
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 247, 237, 1)',
        width: '100%',
        height: 45,
    },
    nextButtonText: {
        fontSize: RFPercentage(1.6),
        fontFamily: Fonts.fontMedium,
        color: Colors.background
    },
});
