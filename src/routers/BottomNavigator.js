import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Orders from "../screens/homescreens/Orders";
import Settings from "../screens/homescreens/Settings";
import Home from "../screens/homescreens/Home";
import Vehicles from "../screens/homescreens/Vehicles";
import Profile from "../screens/homescreens/Profile";
import { Icons } from "../constants/Themes";

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;

    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(route.name)}
                        style={[styles.tabButton, isFocused && styles.activeTab]}
                    >
                        {route.name === "HomeScreen" ? (
                            <View style={{ bottom: 24 }}>
                                <Image source={isFocused ? Icons.home : Icons.homeInactive} style={{ width: 55, height: 55 }} resizeMode="contain" />
                            </View>
                        ) :
                            route.name === "Orders" ?
                                (
                                    <Image source={isFocused ? Icons.orderActive : Icons.order} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                )
                                :
                                route.name === "Settings" ?
                                    (
                                        <Image source={isFocused ? Icons.settingActive : Icons.settings} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                    )
                                    :
                                    route.name === "Vehicles" ?
                                        (
                                            <Image source={isFocused ? Icons.vehicleActive : Icons.vehicle} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                        )
                                        :

                                        (
                                            <Image source={isFocused ? Icons.profileActive : Icons.profile} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                        )

                        }
                        <Text style={{ color: isFocused ? "#ff9800" : "#777", fontSize: 11, top: 5, fontFamily:'Poppins-Regular' }}>{route.name === "HomeScreen" ? null : label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default function App() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}
        
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="HomeScreen" component={Home} />
            <Tab.Screen name="Vehicles" component={Vehicles} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarContainer: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "rgba(241, 245, 249, 1)",
        borderRadius: 25,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "space-around",
        alignItems: "center",
        width: '99%',
        paddingHorizontal: 18

    },
    tabButton: {
        alignItems: "center",
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ff9800",
        justifyContent: "center",
        alignItems: "center",
        top: -30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderWidth: 10, borderColor: 'transparent'
    },
    activeTab: {
        fontWeight: "bold",
    },
});