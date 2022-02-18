import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { BackgroundView, PlaceholderView } from "../../../../components";
import { COLORS } from "../../../../constants";

const windowWidth = Dimensions.get('window').width;

export default function PlaceHolderDetailScreen() {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder
                highlightColor={COLORS.whiteBackground}
                backgroundColor={COLORS.white}>

                <View style={styles.image} />
            </SkeletonPlaceholder>

            <PlaceholderView>
                <View style={styles.largeText} />
                <View style={styles.smallText} />
                <View style={styles.smallText} />
                <View style={styles.smallText} />
                <View style={styles.smallText} />
                <View style={styles.smallText} />
            </PlaceholderView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: windowWidth + 40,
        width: '100%',
        borderRadius: 45,
    },
    largeText: {
        marginVertical: 20,
        marginLeft: 20,
        width: 280,
        height: 35,
        borderRadius: 10,
    },
    smallText: {
        marginVertical: 10,
        marginLeft: 20,
        height: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    }
});
