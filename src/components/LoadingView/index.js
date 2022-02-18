import { BackgroundView } from "..";
import React from "react";
import AnimatedLottieView from 'lottie-react-native';
import { loadingLottie } from "../../assets";
import { View } from "react-native";

export default function LoadingView() {
    return (
        <BackgroundView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AnimatedLottieView style={{ width: 120, height: 120 }} source={loadingLottie} autoPlay loop />
            </View>
        </BackgroundView>
    )
}