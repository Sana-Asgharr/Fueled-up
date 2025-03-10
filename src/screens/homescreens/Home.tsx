import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Icons } from '../../constants/Themes'
import SearchField from '../../components/SearchField'
import NextButton from '../../components/NextButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [loading, setLoading] = useState<boolean>(false)

  const handelNext = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('FuelOrder');
      setLoading(false);
    }, 1000);
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
          <View>
            <Image source={Icons.logo2} resizeMode='contain' style={{ width: 26, height: 36 }} />
          </View>
          <View>
            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.9) }}>
              Home
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Icons.notification} resizeMode='contain' style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
          </View>

        </View>



        <View style={{ marginTop: 24 }}>
          <View>
            <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(1.8) }}>Welcome, Emma</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={Icons.location} resizeMode='contain' style={{ width: 14, height: 14 }} />
              <Text style={{ color: Colors.primaryText, fontFamily: Fonts.fontMedium, fontSize: RFPercentage(1.3), marginLeft: 6, top: 1 }}>Main Street, Capital Center, CO, SC, USA</Text>

            </View>
          </View>
        </View>
        <View style={{ marginVertical: 13 }}>
          <SearchField placeholder={'Search location manually'} />
        </View>

        <View>
          <Image source={Icons.mapImage} resizeMode='contain' style={{ width: RFPercentage(49), height: RFPercentage(49), alignSelf: 'center' }} />
        </View>
        <NextButton title={'Order Fuel'} style={{ width: '48%', marginTop: RFPercentage(5) }} color={Colors.background} onPress={handelNext} loading={loading} />

      </View>
    </SafeAreaView>
  )
}

export default Home

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
  }
})