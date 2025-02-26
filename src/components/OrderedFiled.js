import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../services/Colors'
import { Fonts } from '../constants/Themes'
import { RFPercentage } from "react-native-responsive-fontsize";

const OrderField = (props) => {
  return (
    <View style={styles.container} >
        <Text style={{color:'rgba(120, 113, 108, 1)', fontSize:RFPercentage(1.5), fontFamily:'Poppins-Regular'}}>{props.text1}</Text>
        <Text style={[{color:'rgba(41, 37, 36, 1)', fontSize:RFPercentage(1.6), fontFamily:'Poppins-Regular'},{...props.textStyle}]}>{props.text2}</Text>
    </View>
  )
}

export default OrderField

const styles = StyleSheet.create({
    container : {
        width : '96%',
        height:50,
        borderBottomWidth:1,
        borderBottomColor:'rgba(243, 244, 246, 1)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:2,
        alignSelf:'center'
    }
})