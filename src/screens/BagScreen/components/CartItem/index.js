import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "../../../../components";
import { COLORS } from "../../../../constants";
import AntIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { getFullResUrl } from "../../../../utils";

const CartItem = ({ item, onPress, onPressIncrease, onPressDecrease, onPressRemove }) => {

    const { quantity, total } = item;
    const { name, price, colors } = item.product;
    const { image, size, color } = item.variant;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={styles.container}>
            <View style={styles.shadowView}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        //borderRadius={20}
                        source={{ uri: getFullResUrl(image) }} />
                </View>

            </View>

            <View style={styles.infoContainer}>
                <Text>{name}</Text>

                <View style={{ flexDirection: 'row' }}>

                    {size.eu ?
                        <Text info>Size: EU {size.eu}</Text> :
                        <Text info>Size: {size.size}</Text>
                    }

                    {colors.length > 1 ?
                        <Text info style={{ textTransform: 'capitalize' }}>/ Color: {color}</Text> :
                        <></>
                    }

                </View>

                <Text title>${total}</Text>
            </View>

            <TouchableOpacity
                onPress={onPressRemove}
                activeOpacity={0.5}
                style={styles.deleteBtn}>
                <AntIcon name='close' color={COLORS.darkGray} size={16} />
            </TouchableOpacity>

            <View style={styles.quantity}>
                <TouchableOpacity
                    onPress={onPressDecrease}
                    activeOpacity={0.5}>
                    <IonIcon name='remove-circle-outline' color={COLORS.black} size={30} />
                </TouchableOpacity>

                <Text style={{ marginHorizontal: 8, fontSize: 18 }}>
                    {quantity.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                </Text>

                <TouchableOpacity
                    onPress={onPressIncrease}
                    activeOpacity={0.5}>
                    <IonIcon name='add-circle' color={COLORS.black} size={30} />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

        height: 100,
        //backgroundColor: COLORS.gray,
        marginHorizontal: 20,
        marginVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',


    },
    shadowView: {
        //shadow
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 5 }, // change this for more shadow
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 20,
    },
    imageContainer: {
        backgroundColor: COLORS.white,
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
    },
    image: {
        padding: 30,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
        marginRight: 40,
        marginLeft: 20,
        //backgroundColor: COLORS.facebook
    },
    deleteBtn: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    quantity: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        bottom: 5,
        alignItems: 'center',
    }
})


export default CartItem;

