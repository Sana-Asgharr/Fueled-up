import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity , Platform} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from '@react-navigation/native'
const { width, height } = Dimensions.get('window')
import moment from "moment";


type Order = {
    category: string;
    phone: string;
    address: string;
    fuel: string;
    vehicle: string;
    date: string;
    id: string
};


const SERVER_URL = 
// Platform.OS === 'android' 
//   ? 'http://10.0.2.2:5000' 
//   : 
  'http://192.168.100.30:5000';

const PlaceOrder: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PlaceOrder'>>()
    const [order, setOrders] = useState([]);
    const [token, setToken] = useState<string | null>(null)
    const fetchedData = order
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null)

    // console.log('order................', order)

    useEffect(() => {
        const fetchUID = async () => {
            try {
                const storedID = await AsyncStorage.getItem('uid'); 
                setId(storedID); 
            } catch (error) {
                console.error("Error retrieving UID:", error);
            }
        };
    
        fetchUID();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                const orderList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log(orderList?.[0])
                setOrders(orderList?.[0]);
            } catch (error) {
                console.log("Error fetching orders:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchOrders();
    }, []);




    const fetchFCMToken = async (id) => {
        if (id) {
            const userDocRef = doc(db, "Users", id);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                console.log("Fetched FCM Token:", data.fcmToken);
                setToken(data.fcmToken)
            } else {
                console.warn("User document does NOT exist.");
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchFCMToken(id);
        }, [id])
    );

    const sendPushNotification = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/send-notification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fcmToken: token,
                    title: "Fuel Order",
                    body: "Your order has been placed!",
                }),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            await sendPushNotification();
            navigation.navigate("OrderCompleted");
        } catch (error) {
            console.error("Error placing order:", error);
        } finally {
            setLoading(false);
        }
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
                    <OrderField text1={'Delivery Time And Date'} text2={`${moment.unix(fetchedData?.date?.seconds).format("DD/MM/YYYY")}`} />
                    <OrderField text1={'Sub Total'} text2={'100$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Service Fee'} text2={'30$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <OrderField text1={'Tax Fee'} text2={'20$'} textStyle={{ fontFamily: Fonts.fontBold }} />
                    <View style={{ width: '100%', height: RFPercentage(5.5), backgroundColor: 'rgba(249, 250, 251, 1)', borderRadius: 6, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ color: 'rgba(120, 113, 108, 1)', fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>Total</Text>
                        <Text style={{ color: Colors.gradient1, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.5) }}>150$</Text>

                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
                    <NextButton title={'Place Order'} style={{ width: '50%' }} color={Colors.background} onPress={handlePlaceOrder} loading={loading} />
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