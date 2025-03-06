import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
// import Colors from '../../../config/Colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = SCREEN_WIDTH * 0.8;
const SliderTwo = ({ value }: { value: number }) => {
    const progressWidth = (value / 100) * SLIDER_WIDTH;
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View
                    style={[styles.progressBar, { width: progressWidth }, { backgroundColor: 'white' }]}
                ></View>

            </View>
            <View
                style={[
                    styles.circle,
                    { left: Math.max(progressWidth - RFPercentage(1.5), 0) },
                ]}>
                <View
                    style={[styles.progressBar, { backgroundColor: 'white' }]}
                >

                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        width: SLIDER_WIDTH,
        position: 'relative',
        marginTop: RFPercentage(2.6),
    },
    container: {
        width: '100%',
        height: RFPercentage(0.8),
        backgroundColor: 'rgba(86, 160, 227, 0.35)',
        borderRadius: RFPercentage(1),
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        width: '100%',
    },
    circle: {
        width: RFPercentage(2),
        height: RFPercentage(2),
        borderRadius: RFPercentage(1.5),
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        position: 'absolute',
        top: Platform.OS === 'ios' ? RFPercentage(-0.55) : RFPercentage(-0.6),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        overflow: 'hidden',
    },
    verticalLine: {
        position: 'absolute',
        left: '50%',
        top: '25%',
        width: RFPercentage(0.2),
        height: RFPercentage(3.5),
        backgroundColor: 'white',
        transform: [{ translateX: -RFPercentage(0.1) }, { translateY: -RFPercentage(1.5) }], zIndex: 9999999,
        // bottom:RFPercentage(5)
    },
});
export default SliderTwo;