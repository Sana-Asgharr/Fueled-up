import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Icons } from '../../../constants/Themes'
import NextButton from '../../../components/NextButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get('window')
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'
import Toast from 'react-native-toast-message'

interface Data {
    id: number,
    name: string
}

const method: Data[] = [
    {
        id: 1,
        name: 'Cash on delivery - COD'
    },
    {
        id: 2,
        name: 'Pay Online'
    },
]

interface Card {
    id: number,
    number: string,
    cardImg: any
}

const card: Card[] = [
    {
        id: 1,
        number: '**** **** **** 1 2 3 4',
        cardImg: Icons.card
    },
    {
        id: 2,
        number: '**** **** **** 1 2 3 4',
        cardImg: Icons.visa
    }
]

const PaymentMethod = () => {
    const [selected, setSelected] = useState<number | null>(null)
    const [selected2, setSelected2] = useState<number | null>(null)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PaymentMethod'>>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleNext = () => {
        if (selected) {
            setLoading(true);
            setTimeout(() => {
                navigation.navigate('PlaceOrder');
                setLoading(false);
            }, 2000);
        }
        else {
            Toast.show({
                type: 'info',
                text1: 'Payment Method',
                text2: 'Please select payment method',
                position: 'top',
                text1Style: { fontFamily: Fonts.fontBold },
                text2Style: { fontFamily: Fonts.fontRegular }
            });
        }

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.navigate('FuelOrder')
                        }>
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

                <View style={{ marginVertical: 18, alignSelf: 'center' }}>
                    <Image source={Icons.timeLine2} resizeMode='contain' style={{ width: width * 0.87, height: 50 }} />
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={{ color: Colors.heading, fontFamily: Fonts.fontMedium, }}>Payment Method</Text>
                </View>
                <View style={{}}>
                    <FlatList
                        data={method}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => setSelected(item.id)}>
                                    <View style={{ width: width * 0.9, height: 50, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, borderWidth: 1, borderColor: selected === item.id ? 'rgba(255, 143, 4, 1)' : 'rgba(243, 244, 246, 1)', marginTop: 15, borderRadius: 6 }}
                                    >
                                        <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, }}>{item.name}</Text>
                                        <View>
                                            <Image source={Icons.circle} style={{ width: 14, height: 14 }} resizeMode='contain' />
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }}

                    />

                </View>
                {
                    selected === 2 && (
                        <>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ color: Colors.heading, fontFamily: Fonts.fontMedium, }}>Select Card To Pay</Text>
                            </View>
                            <View style={{}}>
                                <FlatList
                                    data={card}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity onPress={() => setSelected2(item.id)}>
                                                <View style={{ width: width * 0.9, height: 50, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, borderWidth: 1, borderColor: selected2 === item.id ? 'rgba(255, 143, 4, 1)' : 'rgba(243, 244, 246, 1)', marginTop: 15, borderRadius: 6 }}
                                                >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={item.cardImg} style={{ width: 22, height: 40 }} resizeMode='contain' />
                                                        <Text style={{ color: Colors.fieldColor, left: 10, fontFamily: Fonts.fontBold, fontSize: 12, top: 2 }}>{item.number}</Text>
                                                    </View>
                                                    <View>
                                                        <Image source={Icons.circle} style={{ width: 14, height: 14 }} resizeMode='contain' />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}

                                />

                            </View>
                            <View style={{ marginTop: 12 }}>
                                <TouchableOpacity>
                                    <View style={{ width: 114, height: 34, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(243, 244, 246, 1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                        <AntDesign name='pluscircleo' color={Colors.fieldColor} size={RFPercentage(1.2)} style={{ bottom: 1, right: 2 }} />
                                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: 10, left: 2 }}>Add New Card</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </>
                    )
                }

                <View style={{ marginTop: height * 0.8, position: 'absolute', width: '100%', alignSelf: 'center' }}>
                    <NextButton title={selected === 1 ? 'Next' : 'Checkout'} style={{ width: '50%' }} color={Colors.background} onPress={handleNext} loading={loading} />
                </View>




            </View>
        </SafeAreaView>
    )
}

export default PaymentMethod

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