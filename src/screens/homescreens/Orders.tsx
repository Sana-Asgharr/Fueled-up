import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ProfileField from '../../components/ProfileField'
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native'
import Delivered from './orders/Delivered'

interface Data {
  id : number;
  time: string;
  vehicle: string;
  fuel: string;
  address: string
}

const data: Data[] = [
  {
    id: 1,
    time: '24-04-2024 | 8:00 AM',
    vehicle: 'Honda Civic',
    fuel: '2 Tanks',
    address: 'Main Street, Capital Center, CO, USA'
  },
  {
    id: 2,
    time: '24-04-2024 | 8:00 AM',
    vehicle: 'Honda Civic',
    fuel: '2 Tanks',
    address: 'Main Street, Capital Center, CO, USA'
  },
  {
    id: 3,
    time: '24-04-2024 | 8:00 AM',
    vehicle: 'Honda Civic',
    fuel: '2 Tanks',
    address: 'Main Street, Capital Center, CO, USA'
  },
]

const Orders:React.FC = () => {
  const [active, setActive] = useState<boolean>(true)
  const [deliver, setDeliver] = useState<boolean>(false)

  const toggle1 = () => {
    setActive(false)
    setDeliver(true)
  }

  const toggle2 = () => {
    setActive(true)
    setDeliver(false)
  }

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
          <View>
            <Image source={Icons.logo2} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
          </View>
          <View>
            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
              Orders
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.profileField, marginTop: 30 }}>
          <TouchableOpacity style={{ borderBottomColor: active ? Colors.gradient1 : 'transparent', borderBottomWidth: 1.6, width: 90, alignItems: 'center', justifyContent: 'center', top: 1 }} onPress={toggle2}>
            <Text style={{ color: active ? Colors.gradient1 : 'rgba(148, 163, 184, 1)', fontSize: RFPercentage(1.8), fontFamily: Fonts.fontRegular, textAlign: 'center' }}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderBottomColor: deliver ? Colors.gradient1 : 'transparent', borderBottomWidth: 1.6, width: 90, alignItems: 'center', justifyContent: 'center', top: 1, marginLeft: 20 }} onPress={toggle1}>
            <Text style={{ color: deliver ? Colors.gradient1 : 'rgba(148, 163, 184, 1)', fontSize: RFPercentage(1.8), fontFamily: Fonts.fontRegular, textAlign: 'center' }}>Delivered</Text>
          </TouchableOpacity>

        </View>
        {
          active ? (
            <>
              <View style={{ marginTop: 15 }}>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <>
                        <View style={{ width: '100%', borderWidth: 1, borderColor: 'rgba(249, 250, 251, 1)', borderRadius: 6, marginVertical: 10 }}
                        >
                          <View style={{ width: 34, height: 14, backgroundColor: Colors.gradient1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 6 }}>
                            <Text style={{ color: Colors.background, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1) }}>Active</Text>
                          </View>
                          <View style={{ paddingHorizontal: 6 }}>


                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Icons.calender} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Ordered On </Text>

                              </View>
                              <View>
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.time}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Icons.clock} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Vehicle Selected</Text>

                              </View>
                              <View>
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.vehicle}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Icons.car} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Fuel Quantity</Text>

                              </View>
                              <View>
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.fuel}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Icons.location} resizeMode='contain' style={{ width: 14, height: 14 }} />
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6), top: 1, left: 5 }}>Delivery Address</Text>

                              </View>
                              <View>
                                <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.3), top: 1, }}>{item.address}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </>
                    )
                  }}
                />
              </View>
            </>
          )
            :
            <Delivered />
        }
      </View>
    </SafeAreaView>

  )
}

export default Orders

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