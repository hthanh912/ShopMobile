import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "../../../../components";
import { COLORS } from "../../../../constants";

const SizeItem = ({ item, index, unit, selectedIndex, onPress }) => {
    const isSelected = index === selectedIndex;
    const isDisabled = item.quantity === 0;
    const category = item.size.category;

    let sizeText = ''
    
    if (category === 'shoes') {
        sizeText = item.size[unit];
    }else {
        sizeText = item.size.size;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            disabled={isDisabled}
            style={[
                styles.item,
                isDisabled && styles.itemDisable,
                isSelected && styles.itemSelected]
            }>
            <Text style={[
                isSelected ? styles.textSelected : styles.text,
                isDisabled && styles.textDisable,
                {textAlign: 'center'}, 
            ]}>
                {sizeText}
            </Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    item: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    itemDisable: {
        backgroundColor: COLORS.lightGray,
    },
    itemSelected: {
        backgroundColor: COLORS.black,
    }, 
    text: {
        color: COLORS.black,
        
    },
    textDisable: {
        color: COLORS.darkGray,
    },
    textSelected: {
        color: COLORS.white,
    }
})


export default SizeItem;