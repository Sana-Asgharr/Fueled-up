import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Icons } from '../../../constants/Themes'
import OrderField from '../../../components/OrderedFiled'
import NextButton from '../../../components/NextButton'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'
import { collection, getDocs, query, limit } from "firebase/firestore"
import { auth, db } from '../../../../firebaseConfig'
// import moment from 'moment'
// import axios from "axios";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window')


type Order = {
    category: string;
    phone: string;
    address: string;
    fuel: string;
    vehicle: string;
    date: string;
    id: string
};

const PlaceOrder: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PlaceOrder'>>()
    const [order, setOrders] = useState([]);
    const [token, setToken] = useState<string | null>(null)
    const fetchedData = order?.[0]

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                console.log(querySnapshot)
                const orderList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(orderList);
            } catch (error) {
                console.log("Error fetching orders:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    // useEffect(() => {
    //     const fetchToken = async () => {
    //         try {
    //             const storedToken = await AsyncStorage.getItem('fcmToken');
    //             setToken(storedToken)
    //         } catch (error) {
    //             console.error('Error fetching credentials:', error);
    //         }
    //     };
    //     fetchToken();
    // }, []);


    // const sendNotification = async () => {
    //     const deviceToken = token;
    //     const notificationData = {
    //         to: deviceToken,
    //         notification: {
    //             title: "Order Placed",
    //             body: "Your order has been successfully placed!",
    //             sound: "default",
    //         },
    //         data: {
    //             orderId: "12345",
    //         },
    //     };

    //     try {
    //         await axios.post("https://fcm.googleapis.com/fcm/send", notificationData, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "key=",
    //             },
    //         });
    //         console.log("Notification sent!");
    //     } catch (error) {
    //         console.log("Error sending notification:", error);
    //     }
    // };

    const handlePlaceOrder = async () => {
        // await sendNotification();
        navigation.navigate("OrderCompleted");
    };




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
                    <OrderField text1={'Fuel Quantity'} text2={fetchedData?.fuel} />
                    <OrderField text1={'Vehicle Selected'} text2={fetchedData?.vehicle} />
                    <OrderField text1={'Delivery Time And Date'} text2={'8/12/2024'} />
                    <OrderField text1={'Sub Total'} text2={'100$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Service Fee'} text2={'30$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Tax Fee'} text2={'20$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <View style={{ width: '100%', height: RFPercentage(5.5), backgroundColor: 'rgba(249, 250, 251, 1)', borderRadius: 6, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ color: 'rgba(120, 113, 108, 1)', fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>Total</Text>
                        <Text style={{ color: Colors.gradient1, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.5) }}>150$</Text>

                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
                    <NextButton title={'Place Order'} style={{ width: '50%' }} color={Colors.background} onPress={handlePlaceOrder} />
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
        paddingTop: height * 0.03
    },
})