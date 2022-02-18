import React from "react"
import { Text, ProductCard, CARD_WIDTH } from "../../../../components"
import { View, FlatList } from "react-native"
import { push } from "../../../../navigation/root-navigation"
import { screenName } from "../../../../constants"

export default function HorizontalList({title, data}) {

    const onPressItem = (item) => {
        push(screenName.detailProduct, {
            slug: item.slug,
        })
    } 

    return (
        <>
            <Text title style={{ marginHorizontal: 20 }}>{title}</Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                decelerationRate={0}
                snapToInterval={(CARD_WIDTH + 10) * 2}
                snapToAlignment={"start"}
                ListHeaderComponent={<View style={{ width: 10 }} />}
                ListFooterComponent={<View style={{ width: 40 }} />}
                data={data}
                renderItem={({ item }) =>
                    <View style={{ marginHorizontal: 5 }}>
                        <ProductCard
                            item={item}
                            onPress={() => onPressItem(item)}
                        />
                    </View>}
            />
        </>

    )
}