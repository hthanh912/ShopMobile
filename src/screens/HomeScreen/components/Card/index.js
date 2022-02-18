
import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Dimensions, View } from "react-native";
import Text from "../../../../components/Text";
import { COLORS, screenName } from "../../../../constants";
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from "../../../../navigation/root-navigation";
import { getFullResUrl } from "../../../../utils";
import { PlaceholderView } from "../../../../components";

const windowWidth = Dimensions.get('window').width;

const Card = ({ item, gender, isBig, type, isPlaceholder }) => {

    const onPress = (type) => {
        if (type === typeName.category) {
            navigate(screenName.products, {
                isCategory: true,
                category: item._id,
                title: item.name,
                gender,
            })
        } else {
            console.log("navigate");
            navigate(screenName.products, {
                isCategory: false,
                productCollection: item.name,
                title: item.name
            })
        }
    }

    if (isPlaceholder) {
        return(
            <PlaceholderView>
                <View style={stylesBig.container}/>
            </PlaceholderView>
        )
    }


    if (isBig)
        return (
            <TouchableOpacity
                onPress={() => onPress(type)}
                activeOpacity={0.8}
                style={stylesBig.container}>

                <ImageBackground
                    style={stylesBig.image}
                    source={{ uri: getFullResUrl(item.images[imageIndex(gender)]) }}>

                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
                        style={stylesBig.linearGradient}>
                        <Text title style={stylesBig.name}>{item.name}</Text>
                        {(type === typeName.collection) && <Text style={stylesBig.shopNow}>Shop now</Text>}
                    </LinearGradient>

                </ImageBackground>

            </TouchableOpacity>

        )
    else return (
        <TouchableOpacity
            onPress={() => onPress(type)}
            activeOpacity={0.8}
            style={stylesSmall.container}>

            <ImageBackground
                style={stylesSmall.image}
                source={{ uri: getFullResUrl(item.images[imageIndex(gender)]) }}>

                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
                    style={stylesSmall.linearGradient}>
                    <Text title style={stylesSmall.name}>{item.name}</Text>
                </LinearGradient>

            </ImageBackground>

        </TouchableOpacity>
    )
}

const imageIndex = (gender) => {
    switch (gender) {
        case 'men':
            return 0;
        case 'women':
            return 1;
        default:
            return 2;
    }
}

export const typeName = {
    collection: 'collection',
    category: 'category',
}

const stylesBig = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        height: 200,
        overflow: 'hidden',
        borderRadius: 20,
    },
    name: {
        color: COLORS.whiteBackground,
        fontFamily: 'Avenir-Heavy',
        fontSize: 22,
        backgroundColor: 'transparent',
        textTransform: 'capitalize'

    },
    shopNow: {
        fontSize: 18,
        color: COLORS.whiteBackground,
        textDecorationLine: 'underline'
    },
    linearGradient: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
})

const stylesSmall = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        marginVertical: 10,
        height: (windowWidth - 60) / 2,
        width: (windowWidth - 60) / 2,
        overflow: 'hidden',
        borderRadius: 20,
    },
    name: {
        color: COLORS.whiteBackground,
        fontFamily: 'Avenir-Heavy',
        fontSize: 22,
        backgroundColor: 'transparent',
    },
    linearGradient: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
})


export default Card;