
import React from "react";
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import Text from "../../../../components/Text";
import { COLORS, screenName } from "../../../../constants";
import LinearGradient from 'react-native-linear-gradient';
import {navigate} from '../../../../navigation/root-navigation'
import { RES_URL } from '@env';


const FeaturesCard = ({ category }) => {

    let img = '';
    if (category === 'men'){
        img = `${RES_URL}/images/collections/features-1.jpg`
    } else if (category === 'women'){
        img = `${RES_URL}/images/collections/features-2.jpg`
    }else {
        img = `${RES_URL}/images/collections/features-3.jpg`
    }
    
    return (
        <TouchableOpacity
            onPress={() => navigate(screenName.products, {
                title: 'Our Features',
                isFeature: true,
                gender: category
            })}
            activeOpacity={0.8}
            style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={{ uri: img }}>
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.linearGradient}>
                    <Text title style={styles.title}>Our Features</Text>
                    <Text style={styles.subTitle}>Get moving in our styles</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    title: {
        color: COLORS.whiteBackground,
        fontFamily: 'Avenir-Heavy',
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'transparent',
        textTransform: 'uppercase',
        fontWeight: '900'
    },
    subTitle: {
        color: COLORS.whiteBackground,
        fontSize: 18,
        textAlign: 'center',
    },
    linearGradient: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
})

export default FeaturesCard;