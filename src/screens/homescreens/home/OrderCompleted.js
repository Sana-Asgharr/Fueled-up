import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants/Themes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'

const OrderCompleted = () => {
    return (
        <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={styles.safeArea} >
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                <AntDesign name='checkcircleo' color={Colors.background} size={120} />
                <Text style={{color:Colors.background, fontFamily:'Poppins-Bold', fontSize:RFPercentage(2.2),marginTop:RFPercentage(4)}}>Order Placed Successfully!</Text>
            </View>
            <View style={{width:RFPercentage(18), height:RFPercentage(5), backgroundColor:Colors.background, borderRadius:30, alignItems:'center', justifyContent:'center', alignSelf:'center', bottom:50}}>
                <Text style={{color:'rgba(255, 143, 4, 1)', fontFamily:'Poppins-Bold'}}>Shop More</Text>

            </View>
           
        </LinearGradient>
    )
}

export default OrderCompleted

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: "relative",
    }
})