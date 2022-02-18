
import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    listProductStyle: {
        // flexDirection: 'row',
    },
    columnWrapperStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    headerList: {
        backgroundColor: COLORS.whiteBackground,
        marginHorizontal: 20,
        //marginBottom: 0,
        // paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
    },
    btnFilter: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 16,
    },

    modalView: {
        width: '100%',
        height: '100%',
        marginTop: 200,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    filterHeader: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },

    btnClose: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 30,
        width: 30,
        backgroundColor: COLORS.black,
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 5 }, // change this for more shadow
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },


    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


});

