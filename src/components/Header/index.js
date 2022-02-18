import { View } from "react-native"
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "../Text"; import { COLORS } from "../../constants";
import SmallButton from "../SmallButton";
import { useSelector } from "react-redux";

const Header = ({ title, btnLeft, btnRight, onPressLeft, onPressRight }) => {

    return (
        <View style={styles.header}>
            <SmallButton
                isLeft={true}
                name={btnLeft}
                onPress={onPressLeft}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title} title >{title}</Text>
            </View>
            <SmallButton
                isLeft={false}
                name={btnRight}
                onPress={onPressRight}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        height: 50,
    },

    titleContainer: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
    },
})

export const headerTitleName = {
    settings: 'Settings',
    editProfile: 'Edit Profile',
    signup: 'Sign Up',
    login: 'Login',
}


export default Header;
