import React from "react"
import { TouchableOpacity, View, StyleSheet, Image } from "react-native"
import { Text } from "../../../../components"
import { COLORS } from "../../../../constants"
import { getFullResUrl } from "../../../../utils"

const OrderedItem = ({ item }) => {


    const { orders, total } = item;


    const firstProduct = orders[0].product;
    const variant = orders[0].variant;
    const { size } = variant;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}>

            <View style={{ flexDirection: 'row' }}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: getFullResUrl(variant.image) }} />
                </View>

                <View style={styles.infoContainer}>
                    <Text>{firstProduct.name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        {firstProduct.colors.length > 0 &&
                            <Text subTitle style={{textTransform: 'capitalize'}}>
                                Color: {variant.color}/ </Text>
                        }

                        {size.eu ?
                            <Text subTitle>Size: {size.eu}</Text> :
                            <Text subTitle>Size: {size.size}</Text>
                        }

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text>x{orders[0].quantity}</Text>
                        </View>

                    </View>


                    <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
                        <Text>${firstProduct.price}</Text>
                    </View>

                </View>
            </View>

            {orders.length > 1 &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                    <Text subTitle>{orders.length} items</Text>
                    <Text subTitle>View more</Text>
                </View>
            }

            <View style={styles.line} />

            <View style={styles.totalContainer}>
                <Text title>Total</Text>
                <Text title>${total}</Text>
            </View>


        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
    },
    imageContainer: {
        width: 80,
        height: 80,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    infoContainer: {
        marginVertical: 20,
        marginRight: 10,
        justifyContent: 'flex-start',
        flex: 1,
    },
    line: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
    }
})


export default OrderedItem;