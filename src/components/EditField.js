import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../services/Colors'
import { Fonts } from '../constants/Themes'
import { RFPercentage } from "react-native-responsive-fontsize";
import Feather from 'react-native-vector-icons/Feather';

const EditField = (props) => {

    const [visible, setVisible] = useState(props.visible);
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };
    return (
        <View style={styles.container} >
            <TextInput placeholder={props.placeholder} placeholderTextColor={Colors.secondaryText} style={{ color: Colors.secondaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5), }} secureTextEntry={!visible} />
            {
                props.password && (
                    <>
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={{ right: 15, }}
                        >
                            <Feather name={visible ? 'eye' : 'eye-off'} size={RFPercentage(2)} color={Colors.secondaryText} />
                        </TouchableOpacity>
                    </>
                )
            }

        </View>
    )
}

export default EditField

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(249, 250, 251, 1)',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})