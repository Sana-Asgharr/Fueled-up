import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import SkipButton from '../../../components/SkipButton';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { Popable } from 'react-native-popable';
import { BlurView } from "@react-native-community/blur";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

interface Card {
    id : number,
    number : string,
    cardImg : any
}

const card:Card[] = [
    {
        id: 1,
        number: '**** **** **** 1 2 3 4',
        cardImg: Icons.card
    },
    {
        id: 2,
        number: '**** **** **** 1 2 3 4',
        cardImg: Icons.visa
    },
    {
        id: 3,
        number: '**** **** **** 1 2 3 4',
        cardImg: Icons.visa
    }
]
const Cards:React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<number | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'Cards'>>()

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                            Cards
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View>
                    <View style={{ marginTop: RFPercentage(4) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Added Cards</Text>

                        <FlatList
                            data={card}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{paddingBottom:50}}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View style={{
                                            width: width * 0.9,
                                            height: 50,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            paddingHorizontal: 15,
                                            borderWidth: 1,
                                            borderColor: 'rgba(243, 244, 246, 1)',
                                            marginTop: 15,
                                            borderRadius: 6
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={item.cardImg} style={{ width: 22, height: 40 }} resizeMode='contain' />
                                                <Text style={{ color: Colors.fieldColor, left: 10, fontFamily: Fonts.fontBold, fontSize: 12, top: 2 }}>
                                                    {item.number}
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => isVisible === item.id ? setIsVisible(null) :  setIsVisible(item.id)}>
                                                <Image source={Icons.list} style={{ width: 18, height: 18 }} resizeMode="contain" />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            isVisible === item.id && (
                                                <>
                                                    <View style={{
                                                        width: RFPercentage(10),
                                                        backgroundColor: 'rgba(243, 244, 246, 1)',
                                                        borderRadius: RFPercentage(1),
                                                        paddingVertical: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignSelf:'flex-end',
                                                        right: 10,
                                                        position:'absolute',
                                                        zIndex:9999999999,
                                                        top:RFPercentage(7)
                                                    }}>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottomColor: Colors.inputFieldColor, borderBottomWidth: 1 }}
                                                            onPress={() => {
                                                                setIsVisible(null)
                                                                setModalVisible(true)

                                                            }}
                                                        >
                                                            <Image source={Icons.trash} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                                            <Text style={{ marginLeft: 5, fontSize: RFPercentage(1),color:Colors.fieldColor }}>Delete Card</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, right: 3, }}
                                                        >
                                                            <Image source={Icons.cardEdit} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                                            <Text style={{ marginLeft: 5, fontSize: RFPercentage(1),color:Colors.fieldColor }}>Edit Card</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>
                                            )
                                        }

                                    </View>
                                );
                            }}
                        />

                    </View>

                </View>

                <View style={{ marginTop: RFPercentage(40) }}>
                    <NextButton title={'Add Cards'} style={{ width: '50%' }} color={Colors.background} onPress={() => navigation.navigate('AddCard')} />
                </View>


            </View>

            {
                modalVisible && (
                    <BlurView style={{ width: '100%', height: '100%', position: 'absolute', }} blurType="light" blurAmount={1} />
                )
            }

            {
                modalVisible && (
                    <View style={{ width: RFPercentage(35), height: RFPercentage(22), borderRadius: RFPercentage(2), backgroundColor: "rgba(243, 244, 246, 1)", alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: "absolute", paddingHorizontal: 16, top: RFPercentage(40) }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular, color: Colors.fieldColor }}>Are you sure you want to delete
                                this card?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <SkipButton title={'Cancel'} color={Colors.secondaryText} style={{ height: 35 }} style2={{ height: 30.5 }} onPress={() => setModalVisible(false)} />
                                <NextButton title={'Delete'} color={Colors.background} style={{ height: 35 }} />

                            </View>
                        </View>

                    </View>
                )
            }




        </SafeAreaView >

    )
}

export default Cards

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