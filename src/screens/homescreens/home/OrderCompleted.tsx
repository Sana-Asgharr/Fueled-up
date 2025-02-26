import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts } from '../../../constants/Themes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const OrderCompleted = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'OrderCompleted'>>()
    return (
        <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={styles.safeArea} >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <AntDesign name='checkcircleo' color={Colors.background} size={120} />
                <Text style={{ color: Colors.background, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2.2), marginTop: RFPercentage(4) }}>Order Placed Successfully!</Text>
            </View>
            <TouchableOpacity>
                <View style={{ width: RFPercentage(18), height: RFPercentage(5), backgroundColor: Colors.background, borderRadius: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', bottom: 50 }}>
                    <Text style={{ color: 'rgba(255, 143, 4, 1)', fontFamily: Fonts.fontBold }}>Shop More</Text>

                </View>
            </TouchableOpacity>

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