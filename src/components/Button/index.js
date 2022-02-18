import React, { Component } from 'react'
import { Children } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants';

export default class index extends Component {

    render() {

        const { style, onPress, title, color, children } = this.props;

        let btnStyle;
        let textStyle;

        // switch (color) {
        if (color === COLORS.black) {
            btnStyle = styles.btnBlack;
            textStyle = styles.textWhite;
        } else if (color === COLORS.white) {
            btnStyle = styles.btnWhite;
            textStyle = styles.textBlack;
        } else if (color === COLORS.darkRed) {
            btnStyle = styles.btnRed;
            textStyle = styles.textWhite;
        } else if (color === COLORS.facebook) {
            btnStyle = styles.btnFb;
            textStyle = styles.textWhite;
        } else {
            btnStyle = styles.btnWhite;
            textStyle = styles.textBlack;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.buttonStyle,
                    btnStyle,
                    style]}
                onPress={onPress}>

                <Text style={[styles.text, textStyle]}>{title}</Text>

                {children}

            </TouchableOpacity>
        )
    }
}

export const ButtonTheme = {
    dark: 'dark',
    light: 'light',
}

const styles = StyleSheet.create({

    buttonStyle: {
        width: 170,
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnBlack: {
        borderColor: COLORS.black,
        backgroundColor: COLORS.black,
    },

    btnWhite: {
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
    },

    btnFb: {
        backgroundColor: COLORS.facebook,
        borderColor: COLORS.facebook,
    },

    btnRed: {
        backgroundColor: COLORS.darkRed,
        borderColor: COLORS.darkRed,
    },

    text: {
        fontSize: 18,
        fontWeight: '600'
    },

    textBlack: {
        color: COLORS.black,
    },

    textWhite: {
        color: COLORS.white,
    },

    red: {
        backgroundColor: COLORS.red,
    },
})

