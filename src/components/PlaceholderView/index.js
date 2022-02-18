import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { COLORS } from "../../constants";
import React from "react";

export default function PlaceholderView(props) {

    return (
        <SkeletonPlaceholder
            backgroundColor={COLORS.placeholder}
            highlightColor={COLORS.whiteBackground}
            speed={1000}>

            {props.children}
        </SkeletonPlaceholder>

    )
}