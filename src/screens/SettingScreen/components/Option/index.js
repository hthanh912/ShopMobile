import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntIcon from 'react-native-vector-icons/AntDesign';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Text from "../../../../components/Text";
import { COLORS } from "../../../../constants";

const Option = ({ name, text, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            {renderIcon(name)}
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    )
}

const renderIcon = (name) => {
    switch (name) {
        case optionName.logOut:
            return <AntIcon name="logout" size={25} color={COLORS.black} />
        case optionName.logIn:
            return <AntIcon name="login" size={25} color={COLORS.black} />
        case optionName.signUp:
            return <AwesomeIcon name="user-plus" size={25} color={COLORS.black} />
        case optionName.editProfile:
            return <AntIcon name="edit" size={25} color={COLORS.black} />
    }
}

export const optionName = {
    logOut: 'logOut',
    logIn: 'logIn',
    signUp: 'signUp',
    editProfile: 'editProfile',
}


const styles = StyleSheet.create({
    container: {
        width: 350,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        borderRadius: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    title: {
        marginLeft: 20,
        fontSize: 18,
    }
});

export default Option; 