import React from "react"
import { Text as RNText, StyleSheet } from "react-native"
import { COLORS } from "../../constants"


const Text = ({ numberOfLines, title, info, subTitle, price, titleTextInput, style, tabName, focused, children }) => {
    
    return (
        <RNText
            numberOfLines={numberOfLines && numberOfLines}
            style={[
                styles.textStyle,
                style,
                title && styles.titleStyle,
                subTitle && styles.subTitle,
                info && styles.info,
                price && styles.price,
                tabName && styles.tabName,
                focused && styles.focused,
                titleTextInput && styles.titleTextInput,
            ]}>
            {children}
        </RNText>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        //fontFamily: 'Avenir-Heavy',
        color: COLORS.black,
        fontSize: 16,
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.darkGray,
    },
    titleTextInput: {
        fontSize: 18,
    },
    info: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.darkGray,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
    },
    tabName: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.gray,
    },
    focused: {
        color: COLORS.black,
    }
})


export default Text;

