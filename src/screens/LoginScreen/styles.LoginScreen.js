import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        flex: 2,
        alignItems: 'center',
    },
    avatarContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    loginText: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    profileIcon: {
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 75,
        borderColor: '#E8E8E8',
        borderWidth: 15,
        overflow: 'hidden',
        backgroundColor: '#E8E8E8',
    },
    formContainer: {
        //backgroundColor: '#888',
        flex: 3,
        alignItems: 'center',
    },
    inputStyle: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        paddingLeft: 10,
        fontSize: 16,
    },
    btnContainer: {
        width: '100%',
    },
    btnLoginStyle: {
        width: '80%',
        marginVertical: 15,
        height: 50,
        alignSelf: 'center'
    },
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
    },
    textForgotPw: {
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    textSignUp: {
        fontSize: 18,
        fontWeight: '600',
        color: 'red',
    },

    textSignUpContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },

})
