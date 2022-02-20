import React, { useState } from "react"
import { Text, ProductCard, CARD_WIDTH } from "../../../../components"
import { View, FlatList, Image, TouchableOpacity } from "react-native"
import { push } from "../../../../navigation/root-navigation"
import { COLORS, screenName } from "../../../../constants"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function HorizontalList({ title, logo, description, data }) {

    const [isExpand, setIsExpand] = useState(false);

    const onPressItem = (item) => {
        push(screenName.detailProduct, {
            slug: item.slug,
        })
    }

    return (
        <>
            <View style={{
                flexDirection: 'row',
                //backgroundColor: COLORS.facebook,
                height: 25,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20
            }}>

                {(logo && description) ?
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text title>{title}</Text>

                            <Image
                                style={{ width: 50, height: 25, marginLeft: 10 }}
                                resizeMode="contain"
                                source={{ uri: logo }} />

                        </View>

                        <TouchableOpacity
                            onPress={() => setIsExpand(!isExpand)}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>

                            {!isExpand &&
                                <Text subTitle>About</Text>
                            }

                            <MaterialIcon name={isExpand ? 'expand-less' : 'expand-more'} size={25} color={COLORS.black} />

                        </TouchableOpacity>
                    </> :

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text title>{title}</Text>

                    </View>
                }

            </View>

            {isExpand && description &&
                <Text subTitle style={{ marginHorizontal: 24, marginVertical: 8 }}>{description}</Text>
            }

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