import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors, Fonts } from '../constants/Themes'
import Entypo from 'react-native-vector-icons/Entypo'
const ProfileField = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{ width: '100%', height: RFPercentage(6), borderWidth: 1, borderColor: Colors.profileField, borderRadius: 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:10, marginVertical:10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={props.icon} resizeMode='contain' style={{ width: RFPercentage(2), height: RFPercentage(2) }} />
                    <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5), left: 8 , top:1}}>{props.text}</Text>
                </View>
                <TouchableOpacity onPress={props.onPress}>
                    <Entypo name='chevron-thin-right' size={RFPercentage(1.8)} color={Colors.heading} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileField

const styles = StyleSheet.create({})