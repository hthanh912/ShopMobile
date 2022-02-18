import { StyleSheet } from "react-native"
import { COLORS } from "../../constants";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteBackground
    },
    header: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 45,
        height: 90,
        width: '100%',
        zIndex: 0,
    },
    backBtnContainer: {
        position: 'absolute',
        top: 45,
        left: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    imageComponentStyle: {
        flex: 0,
        height: windowWidth + 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 0,
        borderRadius: 45,
        width: '100%',
        backgroundColor: COLORS.white,
        overflow: 'hidden',
    },
    variantsContainer: {
        //backgroundColor: COLORS.facebook,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    variantStyle: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
    },
    selectedVariant: {
        borderColor: COLORS.black,
        borderWidth: 2,
    },
    variantImage: {
        width: 55,
        height: 55,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    name: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    description: {
        marginHorizontal: 20,
        marginVertical: 5,
        marginBottom: 30,
        textTransform: 'capitalize',
    },
    modalListSize: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.facebook,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingTop: 20,
        paddingBottom: 60,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        ///shadow
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 }, // change this for more shadow
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderTopWidth: 0,
        elevation: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: 10,
        flex: 1,
    },
    info: {
        flex: 1,
    },
    iconHeartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
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
    iconHeart: {
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
})
