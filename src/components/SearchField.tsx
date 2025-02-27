import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../services/Colors'
import { Fonts, Icons } from '../constants/Themes'
import { RFPercentage } from "react-native-responsive-fontsize";

interface Props{
  placeholder: string,
}

const SearchField:React.FC<Props> = (props:Props) => {
  return (
    <View style={styles.container} >
      <TextInput placeholder={props.placeholder} placeholderTextColor={'rgba(148, 163, 184, 1)'} style={{color : Colors.secondaryText, fontFamily:Fonts.fontRegular, fontSize: RFPercentage(1.3),}} />
      <View>
        <TouchableOpacity>
            <Image source={Icons.map} resizeMode='contain' style={{width:18, height:18}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchField

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height:50,
        backgroundColor:'rgba(249, 250, 251, 1)',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    }
})