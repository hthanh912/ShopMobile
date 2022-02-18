import React, { useState, useRef, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { COLORS, CATEGORY } from "../../../../constants"
import SizeItem from "../SizeItem"
import { Text } from "../../../../components"

const ListSize = ({ product, selectedVariant, selectedSize, onPressItem, expanded }) => {

    const [expandedSizeList, setExpandedSizeList] = useState(false);
    const [indexUnit, setIndexUnit] = useState(0);

    useEffect(() => {

        if (expanded) {
            setExpandedSizeList(expanded)
        }

    }, [])

    let listUnit = [];
    if (product.category === CATEGORY.shoes) {
        listUnit = ['eu', 'uk', 'cm'];
    } else {
        listUnit = ['size']
    }

    renderItemUnit = (item, index) => (
        <TouchableOpacity
            key={index}
            onPress={() => setIndexUnit(index)}
            activeOpacity={0.8} >

            <Text style={[
                {
                    marginHorizontal: 8,
                    fontSize: 19,
                    fontWeight: '600',
                    color: COLORS.darkGray,
                },
                index === indexUnit && {
                    textDecorationLine: 'underline',
                    fontWeight: '800',
                    color: COLORS.black,
                },
            ]}>
                {item}
            </Text>

        </TouchableOpacity>
    )


    if (product) {
        return (
            <View>
                <View style={styles.sizeHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text title style={{ marginRight: 20 }}>Size</Text>
                        {listUnit.length > 1 &&
                            listUnit.map((item, index) => renderItemUnit(item, index))
                        }
                    </View>
                    {product.variants[selectedVariant].sizes.length > 6 && !expanded &&
                        <TouchableOpacity
                            onPress={() => setExpandedSizeList(!expandedSizeList)}
                            style={styles.expandSizeBtn}>

                            <MaterialIcon
                                name={expandedSizeList ? 'expand-less' : 'expand-more'}
                                size={25}
                                color={COLORS.darkGray} />

                        </TouchableOpacity>
                    }
                </View>

                <ScrollView
                    contentContainerStyle={styles.sizescontentContainerStyle}
                    style={{ marginHorizontal: 20 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={!expandedSizeList}>

                    {product.variants[selectedVariant].sizes.map((item, index) => {
                        return (
                            <SizeItem
                                key={item._id}
                                unit={listUnit[indexUnit]}
                                item={item}
                                index={index}
                                selectedIndex={selectedSize}
                                onPress={() => {
                                    onPressItem(index)
                                }}
                            />
                        )
                    })}

                </ScrollView>
            </View>
        )
    }

    return (<View />)

}

const styles = StyleSheet.create({
    sizeHeader: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    expandSizeBtn: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    sizescontentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 10,
    },
})


export default ListSize;
