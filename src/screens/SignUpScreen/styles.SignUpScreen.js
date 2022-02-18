import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputStyle: {
        width: '80%',
    },
    pickerGenderContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerGender: {
        justifyContent: 'center',
        alignItems: 'center',

        viewContainer: {
            flex: 1,
            marginLeft: 20,
            justifyContent: 'center'
        },
        alignItems: 'center',
        inputIOS: {
            height: '100%',
            color: COLORS.black,
            fontSize: 18,
            justifyContent: 'center',
        },
        inputAndroid: COLORS.facebook,
    },
    labelGender: {
        fontSize: 18,
        paddingLeft: 10,
        color: COLORS.black,
    },
    btnSave: {
        marginTop: 20,
    }


})
