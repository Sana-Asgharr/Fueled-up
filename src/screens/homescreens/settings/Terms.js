import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const Terms = () => {
    const navigation = useNavigation()
    const [explanation, setExplanation] = useState(null)
    const [visible, setVisible] = useState(false)

    const data = [
        {
            id: 1,
            q: '1. Service Description',
            e: 'Our service enables customers to order and receive fuel delivery directly to their specified location.'
        },
        {
            id: 2,
            q: '2. Eligibility',
            e: 'To use our services, you must be of legal age in your jurisdiction and capable of entering into a binding agreement. By using our services, you represent and warrant that you meet these eligibility requirements.'
        },
        {
            id: 3,
            q: '3. Ordering',
            e: 'Customers can place orders for fuel delivery through our App. By placing an order, you agree to provide accurate and complete information about your location, contact details, and payment information.'
        },
        {
            id: 4,
            q: '4. Delivery',
            e: 'We will make best efforts to deliver fuel orders within the requested time slot. However, delivery times may vary depending on factors such as weather conditions, traffic, and operational constraints. We do not guarantee specific delivery times and are not liable for any delays.'
        },

    ]

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                            T & C’s
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{marginTop:RFPercentage(3)}}>
                    <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.7), textAlign: 'justify', lineHeight:23 }}>These Terms and Conditions ("Terms") govern your use of the fuel delivery services offered by Fueled Up ("Company," "we," "us," or "our") through our mobile application ("App"). By accessing or using our services, you agree to be bound by these Terms. If you do not agree with these Terms, you may not use our services.</Text>

                </View>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View style={{ marginTop: RFPercentage(2) }}>
                                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.8) }}>{item.q}</Text>
                                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.7), marginTop: 5, textAlign:'justify', lineHeight:23 }}>{item.e}</Text>
                                    </View>
                                </>
                            )
                        }}
                    />
                </View>



            </View>
        </SafeAreaView>

    )
}

export default Terms

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.background
    },
    container: {
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.05,
        flex: 1
    }
})