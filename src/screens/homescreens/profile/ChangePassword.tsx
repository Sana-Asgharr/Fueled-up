import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Icons, Fonts } from '../../../constants/Themes';
import { RFPercentage } from 'react-native-responsive-fontsize';
import NextButton from '../../../components/NextButton';
import EditField from '../../../components/EditField';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routers/StackNavigator';
import { auth, db } from '../../../../firebaseConfig'; // Use your custom Firebase config
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

const { width, height } = Dimensions.get('window');

const ChangePasswordScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChangePasswordScreen'>>();
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [id, setId] = useState(null)

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

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "All fields are required!");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match!");
            return;
        }
        setLoading(true);
    
        try {
            
            const userDocRef = doc(db, "users", id);
            const userDoc = await getDoc(userDocRef);
    
            if (!userDoc.exists()) {
                Alert.alert("Error", "User not found in Firestore!");
                setLoading(false);
                return;
            }
    
            const userData = userDoc.data();
            const userEmail = userData.email;
    
            if (!userEmail) {
                Alert.alert("Error", "User email not found in Firestore!");
                setLoading(false);
                return;
            }
    
            // Authenticate with user's email
            const credential = EmailAuthProvider.credential(userEmail, oldPassword);
            const user = auth.currentUser;
    
            if (!user) {
                Alert.alert("Error", "User not authenticated!");
                setLoading(false);
                return;
            }
    
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
    
            Alert.alert("Success", "Password changed successfully!");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Password change error:", error);
            Alert.alert("Error", error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-thin-left' color={Colors.secondaryText} size={RFPercentage(1.9)} />
                    </TouchableOpacity>
                    <Text style={{ color: Colors.heading, fontFamily: Fonts.fontBold, fontSize: RFPercentage(2) }}>
                        Change Password
                    </Text>
                    <TouchableOpacity>
                        <Image source={Icons.notification} resizeMode='contain' style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(6) }}>
                    <Text style={styles.label}>Old Password</Text>
                    <EditField placeholder="Enter old password" visible={false} password={true} value={oldPassword} onChangeText={setOldPassword} />
                </View>
                <View style={{ marginTop: RFPercentage(2) }}>
                    <Text style={styles.label}>New Password</Text>
                    <EditField placeholder="Enter new password" visible={false} password={true} value={newPassword} onChangeText={setNewPassword} />
                </View>
                <View style={{ marginTop: RFPercentage(2) }}>
                    <Text style={styles.label}>Repeat New Password</Text>
                    <EditField placeholder="Re-enter new password" visible={false} password={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </View>

                <View style={{ marginTop: RFPercentage(40) }}>
                    <NextButton title="Save" style={{ width: '50%' }} color={Colors.background} onPress={handleChangePassword} loading={loading} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;

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
    },
    label: {
        color: Colors.heading,
        fontFamily: Fonts.fontRegular,
        fontSize: RFPercentage(1.6)
    }
});
