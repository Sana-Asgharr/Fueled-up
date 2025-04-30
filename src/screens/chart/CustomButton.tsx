import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';

interface Props {
  onPress: () => void;
  title: string;
}

const CustomButton = (props: Props) => {
  return (
    <LinearGradient
      colors={[
        'rgba(255, 112, 105, 1)',
        'rgba(252, 254, 137, 1)',
        'rgba(115, 255, 190, 1)',
        'rgba(96, 210, 255, 1)',
        'rgba(232, 138, 255, 1)',
      ]}
      style={styles.gradientBorder}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={styles.innerButton}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  gradientBorder: {
    width: '100%',
    borderRadius: RFPercentage(100),
    padding: 2,
  },
  innerButton: {
    height: RFPercentage(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(100),
    backgroundColor: 'rgb(82, 113, 145)',
    width: '100%',
  },
  text: {
    color: 'rgba(159, 193, 215, 0.8)',
    fontSize: RFPercentage(2),
  },
});
