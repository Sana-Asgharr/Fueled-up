import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../services/Colors'
import Feather from 'react-native-vector-icons/Feather';
import { Fonts } from '../constants/Themes';
import { RFPercentage } from "react-native-responsive-fontsize";

const PasswordField = (props) => {
    const [visible, setVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };

    return (
        <View style={styles.container} >
            <TextInput placeholder={props.placeholder} placeholderTextColor={Colors.secondaryText} style={{ color: Colors.secondaryText, fontFamily: Fonts.fontRegular, top: 6 ,fontSize: RFPercentage(1.6),}} secureTextEntry={!visible} />
            <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{top:6, right: 15,}}
                >
                <Feather name={visible ? 'eye' : 'eye-off'} size={RFPercentage(2)} color={Colors.secondaryText} />
            </TouchableOpacity>
        </View>
    )
}

export default PasswordField

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.inputFieldColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})