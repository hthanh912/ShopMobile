
import { TouchableOpacity, StyleSheet, Animated } from "react-native"
import React from "react";
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { COLORS } from "../../../../constants";

const UserButton = ({ name, onPress, visibleTitleBtn }) => {

    const renderIcon = (name) => {
        if (name === userButtonName.orders) {
            return <Octicon name='package' size={40} color='black' />
        } else if (name === userButtonName.favorites) {
            return <MaterialIcon name='list-alt' size={40} color='black' />
        } else {
            return <FontistoIcon name='shopping-sale' size={40} color='black' />
        }
    }

    return (
        <TouchableOpacity
            visibleTitleBtn={visibleTitleBtn}
            onPress={onPress}
            activeOpacity={0.5}
            style={styles.buttonContainer}>
            {renderIcon(name)}
            <Animated.Text style={[styles.text, {opacity: visibleTitleBtn}]}>
                {name}
            </Animated.Text>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    text: {
        color:COLORS.black,
        marginTop: 10,
        fontSize: 16,
    }
})

export const userButtonName = {
    orders: 'Orders',
    favorites: 'Favorites',
    saleOff: 'Sale Off',
}



export default UserButton;