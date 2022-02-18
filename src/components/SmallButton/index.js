import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Text from '../Text';
import { getListCartCountSelector, getListCartSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";

import { COLORS } from "../../constants";

const SmallButton = ({ name, isLeft, onPress }) => {

    let cartItemsCount = 0;

    const styles = StyleSheet.create({
        button: {
            alignItems: isLeft ? 'flex-start' : 'flex-end',
            justifyContent: 'center',
            width: 40,
            height: 40,
        },
        numberContainer: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 18,
            height: 18,
            top: 14,
            right: 6,
        },
        number: {
            fontSize: 14,
            textAlign: 'center',
            textAlign: 'center',
            color: COLORS.black,
        }
    })

    const renderIconBtn = (name) => {
        switch (name) {
            case smallBtnName.back:
                return <MaterialIcon name="arrow-back-ios" size={30} color={COLORS.black} />

            case smallBtnName.search:
                return <FeatherIcon name='search' size={30} color={COLORS.black} />

            case smallBtnName.bag:
                return <SimpleLineIcon name='bag' size={30} color={COLORS.black} />

            case smallBtnName.star:
                return <AntIcon name='staro' size={30} color={COLORS.black} />

            case smallBtnName.edit:
                return <MaterialIcon name='edit' size={30} color={COLORS.black} />

            case smallBtnName.done:
                return <MaterialIcon name='done' size={30} color={COLORS.black} />

            default:
                return <View style={styles.button} />
        }
    }

    if (name === smallBtnName.bag) {

        cartItems = useSelector(getListCartSelector);
        if (cartItems.orders.length > 0) {
            for (const order of cartItems.orders) {
                cartItemsCount += order.quantity;
            }
        }

    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}>

            {renderIconBtn(name)}
            {name === smallBtnName.bag &&
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>
                        {cartItemsCount > 0 &&
                            cartItemsCount}
                    </Text>
                </View>
            }

        </TouchableOpacity>
    )

}

export const smallBtnName = {
    back: 'back',
    setting: 'setting',
    search: 'search',
    bag: 'bag',
    edit: 'edit',
    done: 'done',
    star: 'star',
}




export default SmallButton;

