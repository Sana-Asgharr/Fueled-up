import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ProfileField from '../../components/ProfileField'
const { width, height } = Dimensions.get('window')
import ToggleSwitch from 'toggle-switch-react-native';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routers/StackNavigator'

const Profile:React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(false);
  
  const handleToggle2 = (isOn: boolean) => {
    setIsPushEnabled(isOn);
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
              Profile
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ alignSelf: 'center', marginTop: RFPercentage(6) }}>
          <View style={{ width: RFPercentage(16), height: RFPercentage(16), borderRadius: RFPercentage(30), alignItems: 'center', justifyContent: 'center' }}>
            <Image source={IMAGES.profile} resizeMode='contain' style={{ width: RFPercentage(15), height: RFPercentage(15) }} borderRadius={RFPercentage(16)} />
            <View style={{ bottom: RFPercentage(4.5), left: RFPercentage(4) }}>
              <TouchableOpacity>
                <Image source={Icons.edit} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
              </TouchableOpacity>

            </View>
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(2) }}>
          <View style={{ width: RFPercentage(30), borderBottomColor: 'rgba(243, 244, 246, 1)', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text style={{ color: Colors.brown, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>User Options</Text>
          </View>
        </View>
        <View>
          <ProfileField icon={Icons.ProfileEdit} text={'Edit Profile'} onPress={()=>navigation.navigate('EditProfile')} />
          <ProfileField icon={Icons.cardEdit} text={'Add Payment Card'} onPress={()=> navigation.navigate('Cards')} />
          <ProfileField icon={Icons.passwordChange} text={'Change Password'} onPress={()=> navigation.navigate('ChangePasswordScreen')} />
          <View
            style={{ width: '100%', height: RFPercentage(6), borderWidth: 1, borderColor: Colors.profileField, borderRadius: 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={Icons.pushNotifications} resizeMode='contain' style={{ width: RFPercentage(2), height: RFPercentage(2) }} />
              <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5), left: 8, top: 1 }}>{'Push Notifications'}</Text>
            </View>
            <ToggleSwitch
              isOn={isPushEnabled}
              onColor={Colors.gradient1}
              offColor="rgb(238, 233, 233)"
              size="small"
              onToggle={handleToggle2}
            />
          </View>


        </View>

      </View>
    </SafeAreaView>

  )
}

export default Profile

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