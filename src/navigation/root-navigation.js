import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, screenName } from "../constants";
import React from "react";
import { HomeScreen, UserScreen, LoginScreen, SplashScreen, SettingScreen, EditProfileScreen, SignUpScreen, ProductsScreen, DetailProductScreen, FavoritesScreen, BagScreen, OrderedScreen } from "../screens";
import { createNavigationContainerRef } from '@react-navigation/native';
import { getIsLoggedInSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import { StackActions } from '@react-navigation/native';
import { View, Dimensions, Platform } from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Text } from "../components";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef()

export const navigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function navigateReplace(name, param) {
    if (navigationRef.isReady()) {
        console.log(name, param);
        navigationRef.dispatch(
            StackActions.replace(name, param),
        );
    }
}

export function getCurrentRoute(nav) {
    if (Array.isArray(nav.routes) && nav.routes.length > 0) {
        return getCurrentRoute(nav.routes[nav.index])
    } else {
        return nav.routeName
    }
}

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
function tabBarHeight() {
    const majorVersion = parseInt(Platform.Version, 10);
    const isIos = Platform.OS === 'ios';
    const isIOS11 = majorVersion >= 11 && isIos;
    if (Platform.isPad) return 60;
    if (isIOS11 && !isLandscape()) return 90;
    return 60;
}

export const goBack = () => {
    navigationRef.current?.goBack();
}

export const pop = () => {
    navigationRef.current?.pop();
}

export const replace = (screenName) => {
    navigationRef.current.replace(screenName)
}

export const push = (name, params) => {
    navigationRef.current && navigationRef.current.dispatch(StackActions.push(name, params));
}

const rootTab = () => (
    <Tab.Navigator
        screenOptions={tabBarOption}>

        <Tab.Screen
            component={HomeStack}
            name={screenName.homeStack}
        />

        <Tab.Screen
            component={BagScreen}
            name={screenName.bag}
        />

        <Tab.Screen
            component={UserStack}
            name={screenName.userStack} />

    </Tab.Navigator>
)

const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}>

        <Stack.Screen
            component={HomeScreen}
            name={screenName.home} />

        <Stack.Screen
            name={screenName.products}
            component={ProductsScreen} />
    </Stack.Navigator>
)

const UserStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                component={UserScreen}
                name={screenName.user} />

        </Stack.Navigator>
    )
}


const MainStack = () => {

    const isLoggedIn = useSelector(getIsLoggedInSelector)

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={screenName.rootTab}
                component={rootTab} />

            <Stack.Screen
                name={screenName.detailProduct}
                component={DetailProductScreen} />

            {isLoggedIn ?
                <>
                    <Stack.Screen
                        name={screenName.favorites}
                        component={FavoritesScreen}
                    />

                    <Stack.Screen
                        name={screenName.ordered}
                        component={OrderedScreen}
                    />

                    <Stack.Screen
                        component={SettingScreen}
                        name={screenName.settingScreen}
                    />

                    <Stack.Screen
                        name={screenName.editProfile}
                        component={EditProfileScreen} />
                </>
                : <>
                    <Stack.Screen
                        name={screenName.login}
                        component={LoginScreen} />

                    <Stack.Screen
                        name={screenName.signup}
                        component={SignUpScreen} />

                </>

            }



        </Stack.Navigator>
    )
}

export const RootNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name={screenName.splashSreen}
                component={SplashScreen}
            />

            <Stack.Screen
                name={screenName.mainStack}
                component={MainStack} />


        </Stack.Navigator>
    )
}

const tabBarOption = ({ route }) => {
    return {
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
            borderTopColor: COLORS.white,
            height: tabBarHeight(),
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            ///shadow
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 }, // change this for more shadow
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 10,
        },


        tabBarIcon: ({ focused }) => {
            let iconName;
            let tabName;
            if (route.name === screenName.homeStack) {
                return (
                    <View
                        style={{
                            alignItems: 'center',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }}
                    // style={focused && { backgroundColor: COLORS.facebook }}
                    >
                        <EntypoIcon
                            name='home'
                            color={focused ? COLORS.black : COLORS.gray}
                            size={focused ? 32 : 26} />

                        <Text tabName focused={focused}>Home</Text>

                    </View>
                )

            } else if (route.name === screenName.userStack) {
                return (
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    // style={focused && { backgroundColor: COLORS.facebook }}
                    >
                        <AwesomeIcon
                            name='user'
                            color={focused ? COLORS.black : COLORS.gray}
                            size={focused ? 32 : 26} />

                        <Text tabName focused={focused}>User</Text>

                    </View>
                )
            } else {
                return (
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <EntypoIcon
                            name='shopping-bag'
                            color={focused ? COLORS.black : COLORS.gray}
                            size={focused ? 32 : 26} />

                        <Text tabName focused={focused}>Bag</Text>

                    </View>
                )

            }

        }
    }
}