import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Icons } from '../../../constants/Themes'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NextButton from '../../../components/NextButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import CustomDropDown from '../../../components/CustomDropDown'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window')
import { auth, db } from '../../../../firebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import moment from 'moment';


interface DropDown {
    id : number,
    label : string
}

const OrderFuel: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'FuelOrder'>>()
    const [value, setValue] = useState<DropDown | null>(null);
    const [value2, setValue2] =useState<DropDown | null>(null);
    const [value3, setValue3] = useState<DropDown | null>(null);
    const[phone, setPhone] = useState <string>("")
    const[address, setAddress] = useState <string>("")
    const [dropdownVisible, setDropDownVisible] = useState<boolean>(false)
    const [dropdownVisible2, setDropDownVisible2] = useState<boolean>(false)
    const [dropdownVisible3, setDropDownVisible3] = useState<boolean>(false)
    const [vehicle, setVehicle] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [open, setOpen] = useState<boolean>(false)
    const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const [loading, setLoading]  = useState<boolean>(false)
  
    const category: DropDown[] = [
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

    const fuel: DropDown[] = [
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

    const vehicles: DropDown[] = [
        {
            id: 1,
            label: 'Civic'
        },
        {
            id: 2,
            label: 'Alto'
        },
        {
            id: 3,
            label: 'Tesla'
        },

    ]



    const orderFuel = async ()=>{
        navigation.navigate('PaymentMethod')
        try {
            setLoading(true)
            await addDoc(collection(db, "orders") ,{
                category : value?.label,
                phone : phone,
                address : address,
                fuel : value2?.label,
                vehicle : value3?.label,
                date : date
            })
            console.log('order addeed ')
            // navigation.navigate('PaymentMethod')
        }
        catch(e) {
         console.log(e)

        }
        finally {
            setLoading(false)
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.navigate('Home')}>
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
                    <Image source={Icons.timeLine} resizeMode='contain' style={{ width: width * 0.87, height: 50 }} />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: 'center' }}>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Category</Text>
                                <TouchableOpacity style={styles.field}
                                    onPress={() => {
                                        setDropDownVisible(true)
                                    }}
                                >
                                    <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}>{value?.label || 'Petrol'}</Text>
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
                                        <CustomDropDown data={category} icon={Icons.gasStatiion} setValue={(item) => {
                                            setValue(item);
                                            setDropDownVisible(false)
                                        }} />
                                        
                                    </>
                                )
                            }

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Phone Number</Text>
                                <View style={styles.field}
                                >
                                    <TextInput style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}  placeholder='+1-501-808-1234' value={phone} onChangeText={t=>setPhone(t)} />
                                    <View style={{}}>
                                        <AntDesign name='phone' color={Colors.fieldColor} size={RFPercentage(2)}
                                        />
                                    </View>

                                </View>

                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Address</Text>
                                <View style={styles.field}
                                >
                                    <TextInput style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}  placeholder='Bahawalpur' value={address} onChangeText={t=> setAddress(t)}/>
                                    <View style={{}}>
                                        <Ionicons name='location-sharp' color={Colors.fieldColor} size={RFPercentage(2)}
                                        />
                                    </View>

                                </View>

                            </View>


                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Fuel Quantity</Text>
                                <TouchableOpacity style={styles.field}
                                    onPress={() => {
                                        setDropDownVisible2(true)
                                    }}
                                >
                                    <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}>{value2?.label || '1 Full Tank'}</Text>
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
                                        <CustomDropDown data={fuel} icon={Icons.gasStatiion} setValue={(item) => {
                                            setValue2(item);
                                            setDropDownVisible2(false)
                                        }} />
                                    </>
                                )
                            }

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Date and Time<Text style={{ color: 'rgba(156, 163, 175, 1)', fontSize: 10 }}> (Optional)</Text></Text>
                                <View style={styles.field}
                                >
                                    <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.4), fontFamily: Fonts.fontRegular }}> {formattedDate} </Text>
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <AntDesign name='calendar' color={Colors.fieldColor} size={RFPercentage(2)}
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>

                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.fieldTitle}>Vehicle Details</Text>

                                {
                                    vehicle ? (
                                        <>
                                            <TouchableOpacity style={{ width: width * 0.9, height: 50, borderTopLeftRadius: 6, borderTopRightRadius: 6, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, backgroundColor: 'rgba(249, 250, 251, 1)', marginTop: 15 }}
                                                onPress={() => {
                                                    setDropDownVisible3(true)
                                                }}
                                            >
                                                <Text style={{ color: Colors.fieldColor, fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular }}>{value3?.label || 'Choose'}</Text>
                                                <TouchableOpacity style={{}}
                                                    onPress={() => {
                                                        setDropDownVisible3(!dropdownVisible3)

                                                    }}
                                                >
                                                    <Entypo name='chevron-down' color={Colors.fieldColor} size={RFPercentage(2)}
                                                    />
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                        </>
                                    )
                                        :
                                        (
                                            <>

                                                <View>
                                                    <TouchableOpacity onPress={() => setVehicle(true)}>
                                                        <View style={{ width: 108, height: 34, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(243, 244, 246, 1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                                            <AntDesign name='pluscircleo' color={Colors.fieldColor} size={RFPercentage(1.2)} style={{ bottom: 1, right: 2 }} />
                                                            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.2), left: 2 }}>Add Vehicle</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                            </>
                                        )
                                }

                                {
                                    dropdownVisible3 && (
                                        <>
                                            <CustomDropDown data={vehicles} setValue={(item) => {
                                                setValue3(item);
                                                setDropDownVisible3(false)
                                            }} />
                                        </>
                                    )
                                }


                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <NextButton title={'Next'} style={{ width: '50%' }} color={Colors.background} onPress={orderFuel} loading={loading} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OrderFuel

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.background
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.04,
        paddingTop: height * 0.02
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