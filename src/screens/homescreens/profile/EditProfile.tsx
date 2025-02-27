import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'

const { width, height } = Dimensions.get('window')

const EditProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'EditProfile'>>()
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
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
                        <Text style={{ color: Colors.brown, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.5) }}>Edit Info</Text>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Name</Text>
                        <EditField placeholder="Emma Stone" visible={true} password={false} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Phone Number</Text>
                        <EditField placeholder="+1 (502) 363-6754" visible={true} password={false} />
                    </View>
                </View>

                <View style={{ marginTop: RFPercentage(30) }}>
                    <NextButton title={'Edit'} style={{ width: '50%' }} color={Colors.background} onPress={()=> console.log('edit')
                    } />
                </View>


            </View>
        </SafeAreaView>

    )
}

export default EditProfile

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