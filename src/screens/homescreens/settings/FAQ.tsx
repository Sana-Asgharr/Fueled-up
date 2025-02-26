import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

interface Data {
    id : number,
    q : string,
    e : string
}

const data: Data[] = [
    {
        id: 1,
        q: 'What areas do you serve?',
        e: 'The fuel delivery service operates through a user-friendly mobile application that enables customers to order fuel directly to their desired location. '
    },
    {
        id: 2,
        q: 'What types of fuel do you deliver?',
        e: 'The fuel delivery service operates through a user-friendly mobile application that enables customers to order fuel directly to their desired location. '
    },
    {
        id: 3,
        q: 'What are your delivery hours?',
        e: 'The fuel delivery service operates through a user-friendly mobile application that enables customers to order fuel directly to their desired location. '
    },
    {
        id: 4,
        q: 'What areas do you serve?',
        e: 'The fuel delivery service operates through a user-friendly mobile application that enables customers to order fuel directly to their desired location. '
    },
    {
        id: 5,
        q: 'How long does delivery take??',
        e: 'The fuel delivery service operates through a user-friendly mobile application that enables customers to order fuel directly to their desired location. '
    }
]


const FAQS:React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'FAQS'>>()
    const [explanation, setExplanation] = useState<number | null>(null)
    const [visible, setVisible] = useState<boolean>(false)

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                            FAQ'S
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", borderBottomColor: Colors.inputFieldColor, borderBottomWidth: 1, paddingBottom: 8, marginTop: RFPercentage(5) }}>
                                        <Text style={{ color: Colors.secondaryText, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.7) }}>{item.q}</Text>
                                        <TouchableOpacity onPress={() => {
                                            setVisible(!visible)
                                            setExplanation(item.id)
                                        }
                                        }>
                                            <Entypo name={visible && explanation === item.id ? 'chevron-small-up' : 'chevron-small-down' }  color={Colors.secondaryText} size={RFPercentage(3)} />
                                        </TouchableOpacity>


                                    </View>
                                    {
                                    visible && explanation === item.id  &&  (
                                            <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.7), marginTop: 10 }}>{item.e}</Text>
                                        )
                                    }

                                </>
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>

    )
}

export default FAQS

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