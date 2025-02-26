import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

const AddCard: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'AddCard'>>()
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                            Add Card
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ marginTop: RFPercentage(2) }}>
                    <View style={{ width: RFPercentage(30), borderBottomColor: 'rgba(243, 244, 246, 1)', borderBottomWidth: 1, paddingBottom: 5 }}>
                        <Text style={{ color: Colors.brown, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>Edit Info</Text>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Card Holder Name</Text>
                        <EditField placeholder="Emma Stone" visible={true} password={false} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Card Number</Text>
                        <EditField placeholder="1234 5678 1234 1234" visible={true} password={false} card={true} cardPic={Icons.card} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop:20}}>

                        <View>
                            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Expiry Date</Text>
                            <EditField placeholder="04/27" visible={true} password={false} style={{width:100}} />

                        </View>
                        <View style={{left:30}}>
                            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>CVV</Text>
                            <EditField placeholder="437" visible={true} password={false} style={{width:100}} />

                        </View>
                    </View>
                </View>

                <View style={{ marginTop: RFPercentage(30) }}>
                    <NextButton title={'Add'} style={{ width: '50%' }} color={Colors.background} />
                </View>


            </View>
        </SafeAreaView>

    )
}

export default AddCard

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