import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../services/Colors'
import { Fonts } from '../constants/Themes'
import { RFPercentage } from "react-native-responsive-fontsize";

const InputField = (props) => {
  return (
    <View style={styles.container} >
      <TextInput placeholder={props.placeholder} placeholderTextColor={Colors.secondaryText} style={{color : Colors.secondaryText, fontFamily:Fonts.fontRegular, top:14, fontSize: RFPercentage(1.6),}} />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height:50,
        borderBottomWidth:1,
        borderBottomColor:Colors.inputFieldColor
    }
})