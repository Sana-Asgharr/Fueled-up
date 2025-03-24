import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Icons, Fonts, IMAGES } from '../../../constants/Themes'
import { RFPercentage } from 'react-native-responsive-fontsize'
import NextButton from '../../../components/NextButton'
import EditField from '../../../components/EditField'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../routers/StackNavigator'
import { collection, getDocs, query, limit, where, doc, updateDoc } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../../../../firebaseConfig'
import ImagePicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get('window')
import storage from '@react-native-firebase/storage';

const EditProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'EditProfile'>>()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [id, setId] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)
    const [name, setName] = useState(userData?.name || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [phone, setPhone] = useState(userData?.phone || '');

    console.log(userData?.[0])

    const imagePick = async (id) => {
        try {
            if (!id) {
                throw new Error('User ID is required');
            }
            const image = await ImagePicker.openPicker({
                width: 1000,
                height: 1000,
                cropping: true
            });
    
            if (!image?.path) {
                throw new Error('No image selected');
            }
    
            console.log('Selected image path:', image.path);
            setSelectedImg(image.path); 
    
            const filename = `profile_${id}.jpg`;
            const storageRef = storage().ref(`profileImages/${filename}`);
    
            await storageRef.putFile(image.path);
    
            const downloadURL = await storageRef.getDownloadURL();
            console.log('Uploaded image URL:', downloadURL);
    
            await updateDoc(doc(db, "Users", id), { profile: downloadURL });
            Alert.alert("Success", "Profile image updated successfully!");
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert("Upload Failed", error.message || "Please try again.");
        }
    };
    

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

    // console.log(id)

    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            try {
                const q = query(collection(db, "Users"), where("uid", "==", id));
                const querySnapshot = await getDocs(q);
                const user = querySnapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }));
                setUserData(user)
                //   console.log('user.............',user)
            } catch (error) {
                console.log("Error fetching orders:", error);
            } finally {
            }
        };
        fetchUser();
    }, [id]);



    const handelNext = () => {
        setLoading(true);
        setTimeout(() => {
            navigation.navigate('Home');
            setLoading(false);
        }, 1000);
    }

    const handleUpdateProfile = async () => {
        if (!name && !email && !phone && !selectedImg) {
            alert("No changes made");
            return;
        }
    
        if (!id) {
            alert("User data is missing. Please log in again.");
            return;
        }
    
        setLoading(true);
    
        try {
            const userRef = doc(db, "Users", id);
            let updatedFields = {};
    
            if (email && email !== userData?.email) {
                updatedFields.email = email;
            }
    
            if (name && name !== userData?.name) {
                updatedFields.name = name;
            }
    
            if (phone && phone !== userData?.phone) {
                updatedFields.phone = phone;
            }
    
            if (selectedImg && selectedImg !== userData?.profile) {
                updatedFields.profile = selectedImg;
            }
    
            console.log("Updating fields:", updatedFields);
    
            if (Object.keys(updatedFields).length > 0) {
                await updateDoc(userRef, updatedFields);
                alert("Profile updated successfully!");
            } else {
                alert("No changes were made.");
            }
        } catch (error) {
            console.error("Firestore update error:", error);
            alert("Failed to update profile. Please try again.");
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
                            <TouchableOpacity onPress={()=>imagePick(id)}>
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
                        <EditField placeholder={userData?.[0]?.name} visible={true} password={false} value={name}
                            onChangeText={setName} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Email</Text>
                        <EditField placeholder={userData?.[0]?.email} visible={true} password={false} value={email}
                            onChangeText={setEmail} />
                    </View>
                    <View style={{ marginTop: RFPercentage(2) }}>
                        <Text style={{ color: Colors.heading, fontFamily: Fonts.fontRegular, fontSize: RFPercentage(1.6) }}>Phone Number</Text>
                        <EditField placeholder={userData?.[0]?.phone} visible={true} password={false} value={phone}
                            onChangeText={setPhone} />
                    </View>
                </View>

                <View style={{ marginTop: RFPercentage(16) }}>
                    <NextButton title={'Edit'} style={{ width: '50%' }} color={Colors.background} onPress={handleUpdateProfile} loading={loading} />
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