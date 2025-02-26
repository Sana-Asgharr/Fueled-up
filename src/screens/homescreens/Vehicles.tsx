import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ProfileField from '../../components/ProfileField'
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native'
import Delivered from './orders/Delivered'
import { BlurView } from "@react-native-community/blur";
import SkipButton from '../../components/SkipButton'
import NextButton from '../../components/NextButton'


interface Data {
  id : number;
  vehicle: string;
  fuel: string;
  quantity: string
}

const data: Data[] = [
  {
    id: 1,
    vehicle: 'Honda Civic 1.9',
    fuel: 'Petrol | 2019',
    quantity: '1 Full Tank | 20 US gal fuel'
  },
  {
    id: 2,
    vehicle: 'Prius',
    fuel: 'Petrol | 2020',
    quantity: '1 Full Tank | 20 US gal fuel'
  },
  {
    id: 3,
    time: '24-04-2024 | 8:00 AM',
    vehicle: 'Audi A5',
    fuel: 'Petrol | 2023',
    quantity: '1 Full Tank | 20 US gal fuel'
  },
]

const Vehicles:React.FC = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
          <View>
            <Image source={Icons.logo2} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
          </View>
          <View>
            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
              Vehicle
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.profileField, marginTop: 30, justifyContent: 'space-between', paddingBottom: 6 }}>
          <View style={{}}>
            <Text style={{ color: 'rgba(148, 163, 184, 1)', fontSize: RFPercentage(1.6), fontFamily: Fonts.fontRegular }}> Previously Added</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('AddVehicle')}>
            <Text style={{ color: Colors.gradient1, fontSize: RFPercentage(1.6), fontFamily: Fonts.fontRegular }}>+ Add New</Text>
          </TouchableOpacity>

        </View>

        <>
          <View style={{ marginTop: 15 }}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={{ width: '100%', borderWidth: 1, borderColor: 'rgba(249, 250, 251, 1)', borderRadius: 6, marginVertical: 10, padding: 10 }}>
                      <View style={{}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.6) }}>{item.vehicle}</Text>
                          <TouchableOpacity onPress={() => isVisible === item.id ? setIsVisible(null) : setIsVisible(item.id)}>
                            <Image source={Icons.list} resizeMode='contain' style={{ width: 16, height: 16 }} />
                          </TouchableOpacity>

                        </View>
                        {
                          isVisible === item.id && (
                            <>
                              <View style={{
                                width: RFPercentage(12),
                                backgroundColor: 'rgba(243, 244, 246, 1)',
                                borderRadius: RFPercentage(1),
                                paddingVertical: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                zIndex: 9999999999,
                                top: RFPercentage(3)
                              }}>
                                <TouchableOpacity
                                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottomColor: Colors.inputFieldColor, borderBottomWidth: 1 }}
                                  onPress={() => {
                                    setIsVisible(null)
                                    setModalVisible(true)

                                  }}
                                >
                                  <Image source={Icons.trash} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                  <Text style={{ marginLeft: 5, fontSize: RFPercentage(1), color: Colors.fieldColor }}>Delete Vehicle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, right: 3, }}
                                >
                                  <Image source={Icons.cardEdit} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                  <Text style={{ marginLeft: 5, fontSize: RFPercentage(1), color: Colors.fieldColor }}>Edit Vehicle</Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          )
                        }
                        <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>{item.fuel}</Text>
                        <Text style={{ color: Colors.fieldColor, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>{item.quantity}</Text>
                      </View>
                    </View>
                  </>
                )
              }}
            />
          </View>
        </>

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


    </SafeAreaView>

  )
}

export default Vehicles

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