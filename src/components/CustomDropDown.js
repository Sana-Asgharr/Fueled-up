import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors, Fonts, Icons } from '../constants/Themes'
const { width, height } = Dimensions.get('window')

const CustomDropDown = (props) => {
  return (
    <View style={{
      width: width * 0.9, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, backgroundColor: 'rgba(249, 250, 251, 1)', paddingVertical: 0, position: 'relative', borderWidth: 1, borderColor: 'rgba(241, 245, 249, 1)', paddingHorizontal: 15
    }}>
      <FlatList data={props.data} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            props.setValue(item)
          }
          }>
            <View style={{ paddingVertical: 8, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(244, 244, 245, 1)' }}>
              <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.4) }}>{item.label}</Text>
              <Image source={props.icon} resizeMode='contain' style={{ width: 12, height: 12 }} />
            </View>
          </TouchableOpacity>
        )
      }} />

    </View>
  )
}

export default CustomDropDown

const styles = StyleSheet.create({})