import { StyleSheet, Dimensions } from "react-native"
import { COLORS } from "../../constants"

const width = Dimensions.get('window').width;
export const CARD_WIDTH = (width - 60) / 2;


export const stylesSmall = StyleSheet.create({
    productCard: {
        height: 260,
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        borderRadius: 30,
        //paddingTop: 10,
        paddingBottom: 10,
        //backgroundColor: COLORS.facebook,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: CARD_WIDTH - 10,
        height: CARD_WIDTH - 10,
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius: 40,
    },

    productImagePlaceHolder: {
        marginTop: 10,
        width: CARD_WIDTH - 20,
        height: CARD_WIDTH - 20,
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius: 20,
    },
    infoContainer: {
        marginHorizontal: 16,
        //marginBottom: 10,
        // backgroundColor: COLORS.facebook,

    },
    name: {
        //marginVertical: 2,
        fontSize: 16,
        //fontFamily: 'Avenir-Heavy',
    },
    color: {
        color: COLORS.darkGray,
    },
    priceContainer: {
        marginVertical: 2,
    },
    colorsText: {
        color: COLORS.darkGray,
    },
    price: {
        flexDirection: 'row',
        fontSize: 16,
        marginVertical: 4,
        fontFamily: 'Avenir-Heavy',
        fontWeight: '800'
    },
    iconHeartContainer: {
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        ///shadow
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 5 }, // change this for more shadow
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 15,
    },
    numberResultContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 80,
        width: '100%',
        justifyContent: 'center',
    },
    numberResult: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 20,
        textAlign: 'center',
    }
})

export const stylesBig = StyleSheet.create({
    productCard: {
        backgroundColor: COLORS.white,
        width: '100%',
        borderRadius: 30,
        height: 220,
        marginVertical: 10,
    },
    imageContainer: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        //marginHorizontal: 10,
    },
    productImage: {
        width: CARD_WIDTH - 10,
        height: CARD_WIDTH - 10,
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius: 30,
    },
    infoAndImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //backgroundColor: COLORS.facebook,
    },
    infoContainer: {
        flex: 1,
        marginRight: 5,
        justifyContent: 'center',
        //backgroundColor: COLORS.facebook,
    },
    colorsContainer: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 65,
        //backgroundColor: COLORS.facebook,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorImageContainer: {
        width: 42,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 4,
        borderColor: COLORS.whiteBackground,
    },
    colorImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
        resizeMode: 'contain',
        overflow: 'hidden'
    },
    name: {
        marginVertical: 2,
        fontSize: 18,
    },
    color: {
        color: COLORS.darkGray,
    },
    priceContainer: {
        marginVertical: 4,
    },
    price: {
        flexDirection: 'row',
        marginVertical: 2,
        fontSize: 18,
        fontWeight: '800'
        //fontFamily: 'Avenir-Heavy',
    },
    description: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    iconHeartContainer: {
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        ///shadow
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 5 }, // change this for more shadow
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 15,
    },
    numberResultContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 80,
        width: '100%',
        justifyContent: 'center',
    },
    numberResult: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 20,
        textAlign: 'center',
    },
})