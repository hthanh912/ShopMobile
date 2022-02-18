import { Children } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { getVisibleFilterSelector } from "../../redux/selectors";


const BackgroundView = ({ edges, paddingBottom, children }) => {

    const visibleFilter = useSelector(getVisibleFilterSelector)

    return (
        <SafeAreaView style={[styles.container,paddingBottom && {paddingBottom: 90}]} edges={edges} >

            <StatusBar barStyle='dark-content' />
            {children}

            {visibleFilter &&
                <View style={[{ width: '100%', height: '120%', position: 'absolute' }, visibleFilter && { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
            }

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteBackground,
    }
})

export default BackgroundView;