import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    columnWrapperStyle: {
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    headerList: {
        backgroundColor: COLORS.whiteBackground,
        marginHorizontal: 20,
        marginBottom: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    btnRemove: {
        width: 160,
    }
})
