import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ProfileField from '../../components/ProfileField'
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routers/StackNavigator'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import Toast from 'react-native-toast-message';


const Settings: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const logOut = async () => {
    await signOut(auth).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Log Out',
        text2: 'Log out Successfuly',
        position: 'top'
      })
      navigation.navigate('SignIn')
    }).catch((error) => {
      console.log(error)
    });
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
              Settings
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
            </TouchableOpacity>
          </View>

        </View>


        <View style={{ marginTop: RFPercentage(5) }}>
          <View style={{ width: RFPercentage(30), borderBottomColor: 'rgba(243, 244, 246, 1)', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text style={{ color: Colors.brown, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>Help & Security</Text>
          </View>
        </View>
        <View>
          <ProfileField icon={Icons.privacy} text={'Privacy Policy'} onPress={() => navigation.navigate('Privacy')} />
          <ProfileField icon={Icons.terms} text={'Term & Conditions'} onPress={() => navigation.navigate('Terms')} />
          <ProfileField icon={Icons.faq} text={'FAQ’s'} onPress={() => navigation.navigate('FAQS')} />
          <ProfileField icon={Icons.logout} text={'Logout'} color={'red'} onPress={logOut} />
        </View>

      </View>
    </SafeAreaView>

  )
}

export default Settings

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