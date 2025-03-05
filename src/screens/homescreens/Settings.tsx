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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from "@react-native-community/blur";
import NextButton from '../../components/NextButton'
import SkipButton from '../../components/SkipButton'


const Settings: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('google');
      await AsyncStorage.removeItem('facebook');
      await AsyncStorage.removeItem('fcmToken');
      await signOut(auth);
      navigation.navigate('SignIn');
      Toast.show({
        type: 'success',
        text1: 'Log Out',
        text2: 'Logged out successfully',
        position: 'top',
      });
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };


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
          <ProfileField icon={Icons.logout} text={'Logout'} color={'red'} onPress={() => setModalVisible(true)} />
        </View>
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
              <Text style={{ textAlign: 'center', fontSize: RFPercentage(1.5), fontFamily: Fonts.fontRegular, color: Colors.fieldColor }}>Are you sure you want to log out?</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <SkipButton title={'Cancel'} color={Colors.secondaryText} style={{ height: 35 }} style2={{ height: 30.5 }} onPress={() => setModalVisible(false)} />
                <NextButton title={'Logout'} color={Colors.background} style={{ height: 35 }} onPress={logOut} />
              </View>
            </View>

          </View>
        )
      }

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