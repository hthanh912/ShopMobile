import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants";

export const windowWidth = Dimensions.get('window').width;
export const AVATAR_WIDTH = 120;
export const NAME_WIDTH = windowWidth - AVATAR_WIDTH - 60;

export const HEADER_MAX_HEIGHT = 380;
export const HEADER_MIN_HEIGHT = 220;
export const AVATAR_TOP = 80
export const AVATAR_MAX_LEFT = windowWidth / 2 - 60; //60 = avatar_width/2
export const AVATAR_MIM_LEFT = 20;
export const NAME_MAX_WIDTH = windowWidth - 40;
export const NAME_MIN_WIDTH = windowWidth - AVATAR_WIDTH - 60;
export const NAME_MAX_TOP = 220;
export const NAME_MIN_TOP = 100;
export const NAME_MAX_RIGHT = (windowWidth - NAME_MAX_WIDTH) / 2;
export const NAME_MIN_RIGHT = 20;
export const NAME_MAX_FONT_SIZE = 26;
export const NAME_MIN_FONT_SIZE = 18;


export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.whiteBackground,
    },
    userInfoContainer: {
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        borderRadius: 40,
        backgroundColor: COLORS.white
    },
    avatarContainer: {
        position: 'absolute',
        top: AVATAR_TOP,
        width: AVATAR_WIDTH,
        height: AVATAR_WIDTH,
        borderRadius: AVATAR_WIDTH / 2,
        backgroundColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: AVATAR_WIDTH,
        height: AVATAR_WIDTH,
        borderRadius: AVATAR_WIDTH / 2,
    },
    fbIconContainer: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.facebook,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    nameLetter: {
        fontSize: 50,
        fontWeight: '700',
        color: COLORS.white,
        margin: 2,
    },

    textName: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
        color: COLORS.black,
        textTransform: 'uppercase',
    },
    settingIcon: {
        position: 'absolute',
        right: 20,
        top: 50,
    },
    buttonCotainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    optionContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },

    columnWrapperStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

});