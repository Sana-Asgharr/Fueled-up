import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Icons } from '../../../constants/Themes'
import Entypo from 'react-native-vector-icons/Entypo'
import NextButton from '../../../components/NextButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import EditField from '../../../components/EditField'
import CustomDropDown from '../../../components/CustomDropDown'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'


const { width, height } = Dimensions.get('window')

interface DropDown {
    id : number,
    label : string
}

const AddVehicle:React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'AddVehicle'>>()
    const [value, setValue] = useState<DropDown | null>(null);
    const [value2, setValue2] = useState<DropDown | null>(null);
    const [dropdownVisible, setDropDownVisible] = useState<boolean>(false)
    const [dropdownVisible2, setDropDownVisible2] = useState<boolean>(false)


    const category : DropDown[] = [
        {
            id: 1,
            label: 'Petrol'
        },
        {
            id: 2,
            label: 'Diesel'
        },
        {
            id: 3,
            label: 'Engine Fuel'
        },

    ]

    const fuel:DropDown[] = [
        {
            id: 1,
            label: 'Half Tank'
        },
        {
            id: 2,
            label: 'One and a Half Tank (1.5)'
        },
        {
            id: 3,
            label: 'Two Tanks'
        },

    ]

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity style={{ bottom: 5 }}>
                            <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.9) }}>
                            Add Vehicle
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={Icons.notification} resizeMode='contain' style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ marginTop: RFPercentage(2) }}>
                            <Text style={styles.fieldTitle}>Name</Text>
                            <EditField placeholder="Enter" visible={true} password={false} />
                        </View>
                        <View style={{ marginTop: RFPercentage(2) }}>
                            <Text style={styles.fieldTitle}>How may gallons of fuel your vehicle take in one full tank?</Text>
                            <EditField placeholder="e.g, 20 US gal" visible={true} password={false} />
                        </View>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Gallons of fuel your vehicle take in one full tank?</Text>
                                <TouchableOpacity style={styles.field}
                                    onPress={() => {
                                        setDropDownVisible(true)
                                    }}
                                >
                                    <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}>{value?.label || 'Select'}</Text>
                                    <TouchableOpacity style={{}}
                                        onPress={() => {
                                            setDropDownVisible(!dropdownVisible)

                                        }}
                                    >
                                        <Entypo name='chevron-down' color={Colors.fieldColor} size={RFPercentage(2)}
                                        />
                                    </TouchableOpacity>

                                </TouchableOpacity>

                            </View>
                            {
                                dropdownVisible && (
                                    <>

                                        <CustomDropDown data={fuel} icon={Icons.gasStatiion} setValue={(item) => {
                                            setValue(item);
                                            setDropDownVisible(false)
                                        }} />
                                    </>
                                )
                            }




                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Modal</Text>
                                <TouchableOpacity style={styles.field}
                                    onPress={() => {
                                        setDropDownVisible2(true)
                                    }}
                                >
                                    <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}>{value2?.label || 'Year'}</Text>
                                    <TouchableOpacity style={{}}
                                        onPress={() => {
                                            setDropDownVisible2(!dropdownVisible2)

                                        }}
                                    >
                                        <Entypo name='chevron-down' color={Colors.fieldColor} size={RFPercentage(2)}
                                        />
                                    </TouchableOpacity>

                                </TouchableOpacity>

                            </View>
                            {
                                dropdownVisible2 && (
                                    <>
                                        <CustomDropDown data={category} setValue={(item) => {
                                            setValue2(item);
                                            setDropDownVisible2(false)
                                        }} />
                                    </>
                                )
                            }


                        </View>
                        <View style={{ marginTop: RFPercentage(20) }}>
                            <NextButton title={'Add'} style={{ width: '50%' }} color={Colors.background} onPress={() => navigation.navigate('PaymentMethod')} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default AddVehicle

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
    fieldTitle: {
        color: Colors.heading,
        fontFamily: Fonts.fontMedium,
        fontSize: RFPercentage(1.5)
    },
    field: {
        width: width * 0.9,
        height: 50,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(249, 250, 251, 1)',
        marginTop: 15
    },
    dropDown: {
        width: width * 0.9, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, backgroundColor: 'rgba(249, 250, 251, 1)', paddingVertical: 0, position: 'relative', borderWidth: 1, borderColor: 'rgba(241, 245, 249, 1)', paddingHorizontal: 15
    }
});