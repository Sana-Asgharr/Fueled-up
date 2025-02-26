import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native'

const Delivered = () => {
    const navigation = useNavigation()




    const data = [
        {
            id: 1,
            time: '24-04-2024 | 8:00 AM',
            vehicle: 'Honda Civic',
            fuel: '2 Tanks',
            address: 'Main Street, Capital Center, CO, USA'
        },
        {
            id: 2,
            time: '24-04-2024 | 8:00 AM',
            vehicle: 'Honda Civic',
            fuel: '2 Tanks',
            address: 'Main Street, Capital Center, CO, USA'
        },
        {
            id: 3,
            time: '24-04-2024 | 8:00 AM',
            vehicle: 'Honda Civic',
            fuel: '2 Tanks',
            address: 'Main Street, Capital Center, CO, USA'
        },
    ]

    return (

        <View>

            <View style={{ marginTop: 15 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <View style={{ width: '100%', borderWidth: 1, borderColor: 'rgba(249, 250, 251, 1)', borderRadius: 6, marginVertical: 10 }}
                                >
                                    <View style={{ width: 44, height: 14, backgroundColor: Colors.gradient1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 6 }}>
                                        <Text style={{ color: Colors.background, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1) }}>Delivered</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 6, paddingBottom:6 }}>


                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={Icons.calender} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Ordered On </Text>

                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.time}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={Icons.clock} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Vehicle Selected</Text>

                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.vehicle}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={Icons.car} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Fuel Quantity</Text>

                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.fuel}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={Icons.location} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Delivery Address</Text>

                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.address}</Text>
                                            </View>
                                        </View>
                                        <View style={{}}>
                                            <TouchableOpacity>
                                                <View style={{width:70, height:26, borderWidth:1, borderColor:Colors.inputFieldColor, borderRadius:8, alignItems:'center', justifyContent:'center', alignSelf:'flex-end'}}>
                                                    <Text style={{color:Colors.fieldColor, fontSize:10, fontFamily:Fonts.fontRegular, textAlign:'center'}}>View More</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                />
            </View>




        </View>


    )
}

export default Delivered

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.background
    },
    container: {
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        flex: 1
    }
})