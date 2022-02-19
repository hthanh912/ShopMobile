import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { COLORS, screenName } from "../../constants";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { stylesSmall, stylesBig } from "./styles.ProductCard";
import { navigate } from '../../navigation/root-navigation';
import { getFullResUrl } from "../../utils";
import { PlaceholderView } from "..";
import { Text } from '../../components'

const ProductCard = ({ item, index, isLargeCard, enableFavoriteBtn, onPress, onPressIcon, isFavorited, isPlaceholder, visibleFavoriteBtn }) => {

    renderColors = () => item.images.map((item, i) => (
        <View
            style={stylesBig.colorImageContainer}
            key={i} >
            <Image
                style={stylesBig.colorImage}
                source={{ uri: getFullResUrl(item) }}
                resizeMethod='resize'
            />
        </View>
    ))

    if (isPlaceholder) {
        return (
            <View style={stylesSmall.productCard}>
                <PlaceholderView>

                    <PlaceholderView style={stylesSmall.imageContainer} >
                        <PlaceholderView style={stylesSmall.productImagePlaceHolder} />
                    </PlaceholderView>

                    <View style={stylesSmall.infoContainer}>
                        <View style={{ width: 120, height: 20, marginVertical: 20, borderRadius: 5 }} />
                        <View style={{ width: 80, height: 20, borderRadius: 5 }} />

                    </View>
                </PlaceholderView>
            </View>
        )
    }

    if (item.name === null) {
        return <></>
    }

    if (isLargeCard && item.colors.length > 1) {
        return (
            <TouchableOpacity
                style={stylesBig.productCard}
                activeOpacity={0.5}
                onPress={onPress}>

                <View style={stylesBig.infoAndImageContainer}>

                    <View style={stylesBig.imageContainer}>
                        <Image
                            style={stylesBig.productImage}
                            resizeMethod='resize'
                            source={{ uri: getFullResUrl(item.images[0]) }} />
                    </View>

                    <View style={stylesBig.infoContainer}>
                        <Text style={stylesBig.name}>{item.name}</Text>

                        {/* <View style={stylesBig.priceContainer}> */}
                        <Text style={stylesBig.description} numberOfLines={3}>  {item.description}</Text>
                        <Text style={stylesBig.price}>${item.price}</Text>
                        {/* </View> */}

                    </View>

                </View>

                <View style={stylesBig.colorsContainer}>
                    {/* <Text style={stylesBig.color}>{item.colors.length} Colors </Text> */}
                    {renderColors()}
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onPressIcon}
                    style={stylesBig.iconHeartContainer}>
                    <AwesomeIcon
                        name='heart'
                        size={isFavorited ? 22 : 16}
                        color={isFavorited ? COLORS.red : COLORS.white} />
                </TouchableOpacity>

            </TouchableOpacity>
        )

    } else {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[stylesSmall.productCard]}
                onPress={onPress}
            >

                <View style={stylesSmall.imageContainer}>
                    <Image
                        style={stylesSmall.productImage}
                        resizeMethod='resize'
                        source={{ uri: getFullResUrl(item.images[0]) }} />
                </View>

                <View style={stylesSmall.infoContainer}>
                    <Text style={stylesSmall.name} numberOfLines={2}>{item.name}</Text>

                    {item.colors.length > 1 &&
                        <Text style={stylesSmall.colorsText}>{item.colors.length} colors</Text>
                    }

                    <View style={stylesSmall.priceContainer}>
                        <Text style={stylesSmall.price}>${item.price}</Text>
                    </View>

                </View>

                {visibleFavoriteBtn && (
                    <TouchableOpacity
                        disabled={!enableFavoriteBtn}
                        onPress={onPressIcon}
                        activeOpacity={0.5}
                        style={stylesSmall.iconHeartContainer}>
                        <AwesomeIcon
                            name='heart'
                            size={isFavorited ? 22 : 16}
                            color={isFavorited ? COLORS.red : COLORS.white} />
                    </TouchableOpacity>
                )}

            </TouchableOpacity >
        )
    }

}

export default ProductCard;