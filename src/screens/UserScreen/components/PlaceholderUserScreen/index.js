import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { PlaceholderView } from "../../../../components";
import { HEADER_MAX_HEIGHT, NAME_MAX_TOP, NAME_MAX_WIDTH, NAME_MIN_RIGHT, styles, AVATAR_MAX_LEFT, AVATAR_TOP, AVATAR_MIM_LEFT, AVATAR_WIDTH } from '../../styles.UserScreen'

export default function PlaceholderUserScreen() {
    return (
        <View style={[styles.container]} >
            <View style={[styles.userInfoContainer, { height: HEADER_MAX_HEIGHT }]}>

                <PlaceholderView  >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: AVATAR_WIDTH, height: AVATAR_WIDTH, borderRadius: AVATAR_WIDTH / 2, marginTop: AVATAR_TOP - 40 }} />
                        <View style={{ width: 200, height: 30, borderRadius: 4, marginBottom: 30, marginTop: 30 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 10, marginHorizontal: 20 }} />
                            <View style={{ width: 60, height: 60, borderRadius: 10, marginHorizontal: 20 }} />
                            <View style={{ width: 60, height: 60, borderRadius: 10, marginHorizontal: 20 }} />
                        </View>
                    </View>
                </PlaceholderView>




            </View>

        </View >
    )
}