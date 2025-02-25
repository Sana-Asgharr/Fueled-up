import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import Tooltip from 'react-native-walkthrough-tooltip';
import { Popable } from 'react-native-popable';

const { width, height } = Dimensions.get('window')

const Cards = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [selectedTooltipId, setSelectedTooltipId] = useState(null);

    const card = [
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
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
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
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                const isTooltipVisible = selectedTooltipId === item.id;
                                return (
                                    <TouchableOpacity>
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

                                            <Popable
                                                position="bottom"
                                                content={
                                                    <View style={{
                                                        width: RFPercentage(14),
                                                        backgroundColor: 'rgba(243, 244, 246, 1)',
                                                        borderRadius: RFPercentage(1),
                                                        paddingVertical: 5,
                                                        paddingHorizontal: 10
                                                    }}>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}
                                                            onPress={() => console.log('Delete Card')}
                                                        >
                                                            <Image source={Icons.trash} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                                            <Text style={{ marginLeft: 5, fontSize: RFPercentage(1) }}>Delete Card</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}
                                                            onPress={() => console.log('Edit Card')}
                                                        >
                                                            <Image source={Icons.cardEdit} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                                            <Text style={{ marginLeft: 5, fontSize: RFPercentage(1) }}>Edit Card</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            >
                                                <TouchableOpacity onPress={() => setSelectedTooltipId(selectedTooltipId === item.id ? null : item.id)}>
                                                    <Image source={Icons.list} style={{ width: 18, height: 18 }} resizeMode="contain" />
                                                </TouchableOpacity>
                                            </Popable>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>

                </View>

                <View style={{ marginTop: RFPercentage(40) }}>
                    <NextButton title={'Add Cards'} style={{ width: '50%' }} color={Colors.background} />
                </View>


            </View>
            <Modal
                visible={modalVisible}

            >


            </Modal>
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