import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../services/Colors'
import { Fonts } from '../constants/Themes'
import { RFPercentage } from "react-native-responsive-fontsize";
import Feather from 'react-native-vector-icons/Feather';

interface Props{
    visible : boolean,
    style?: object,
    placeholder : string,
    password? : boolean,
    card? : boolean,
    cardPic? : any
}

const EditField:React.FC <Props> = (props:Props) => {

    const [visible, setVisible] = useState<boolean>(props.visible);

    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };
    return (
        <View style={[styles.container,{...props.style}]} >
            <TextInput placeholder={props.placeholder} placeholderTextColor={Colors.secondaryText} style={{ color: Colors.primaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5), }} secureTextEntry={!visible} />
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
            {
                props.card && (
                    <Image  source={props.cardPic} resizeMode='contain' style={{width:20, height:20}} />
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
        paddingHorizontal: 10,
        borderRadius:6
    }
})