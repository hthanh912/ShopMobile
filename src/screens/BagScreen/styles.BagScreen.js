import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    totalContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    checkoutBtn: {
        marginVertical: 20,
        height: 50,
        width: 280,
    },
    btnContainer: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    modalBtn: {
        width: 160
    }
})

