import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView , TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors, Fonts, Icons } from '../../../constants/Themes'
import OrderField from '../../../components/OrderedFiled'
import NextButton from '../../../components/NextButton'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

const PlaceOrder:React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'PlaceOrder'>>()

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                            <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.9) }}>
                            Order
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ marginVertical: 15, alignSelf: 'center' }}>
                    <Image source={Icons.timeLine3} resizeMode='contain' style={{ width: width * 0.87, height: 50 }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: Colors.heading, fontFamily: Fonts.fontMedium, }}>Order Summary</Text>
                </View>
                <View>
                    <OrderField text1={'Payment Method '} text2={'Pay by card'} />
                    <OrderField text1={'Card Selected'} text2={'VISA *1 2 3 4'} />
                    <OrderField text1={'Fuel Quantity'} text2={'2 Tanks'} />
                    <OrderField text1={'Vehicle Selected'} text2={'Honda Civic 2019'} />
                    <OrderField text1={'Delivery Time And Date'} text2={'24/04/2024 | 8:00 AM'} />
                    <OrderField text1={'Sub Total'} text2={'100$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Service Fee'} text2={'30$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Tax Fee'} text2={'20$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <View style={{width:'100%', height:RFPercentage(5.5), backgroundColor:'rgba(249, 250, 251, 1)', borderRadius:6, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:10, marginTop:10}}>
                        <Text style={{color:'rgba(120, 113, 108, 1)', fontFamily:Fonts.fontRegular, fontSize:RFPercentage(1.5)}}>Total</Text>
                        <Text style={{color:Colors.gradient1, fontFamily:Fonts.fontBold, fontSize:RFPercentage(1.5)}}>150$</Text>

                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
                    <NextButton title={'Place Order'} style={{ width: '50%' }} color={Colors.background} onPress={() => navigation.navigate('OrderCompleted')} />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.background
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.04,
        paddingTop: height * 0.05
    },
})