import React from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from '../../constants';
import { Text } from '../../components';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import  changeNavigationBarColor  from 'react-native-navigation-bar-color';

export default function CustomModal({ isModalVisible, setModalVisible, title, subTitle, children, style }) {

    return (

        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={isModalVisible}
            onBackdropPress={() => {
                console.log("onBackdropPress");
                setModalVisible(false);
            }}
            onSwipeComplete={() => {
                setModalVisible(false)
                console.log("onSwipeComplete");
            }}
            swipeDirection="down"
        >

            <View style={[styles.modalView, style]}>

                <TouchableOpacity
                    onPress={() => setModalVisible(false)} >
                    <SimpleLineIcon style={{ marginTop: 10 }} name='arrow-down' size={20} color={COLORS.gray} />
                </TouchableOpacity>

                {title &&
                    <Text title style={styles.modalTitle}>{title}</Text>
                }

                <View style={styles.line} />

                {subTitle &&
                    <Text subTitle style={styles.modalText}>{subTitle}</Text>
                }

                {children}

            </View>

        </Modal >

    )

}

const styles = StyleSheet.create({
    bottomView: {
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        //alignSelf: 'flex-end',
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: "center",
        paddingBottom: 40,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        marginVertical: 5,
        textAlign: "center"
    },
    modalText: {
        marginVertical: 15,
        textAlign: "center"
    },
    line: {
        width: '90%',
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
})
