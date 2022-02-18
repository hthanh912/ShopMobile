import React, { useState, useEffect } from "react"
import { FlatList, View, Image } from "react-native"
import { BackgroundView, Button, Text, Header, Modal } from "../../components"
import { useSelector, useDispatch } from "react-redux"
import { getListCartSelector, getCartTotal } from '../../redux/selectors'
import CartItem from "./components/CartItem"
import { styles } from './styles.BagScreen';
import { getRequestConfirmOrder, getRequestRemoveItemBag, getRequestEditItemBag, getRequestAddProductToFavorites } from "../../redux/thunk/userThunkAction"
import { COLORS, screenName } from "../../constants";
import { navigate } from "../../navigation/root-navigation"
import { emptyIcon } from "../../assets"

const BagScreen = () => {

    const bagList = useSelector(getListCartSelector);
    const total = useSelector(getCartTotal);

    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [selectedItemRemove, setSelectedItemRemove] = useState(-1);

    const dispatch = useDispatch();

    const onPressCheckOut = () => {
        dispatch(getRequestConfirmOrder());
    }

    const onPressIncrease = (item) => {

        console.log("onPressIncrease");

        const { quantity, _id } = item;

        if (quantity < 99) {
            dispatch(getRequestEditItemBag(_id, quantity + 1));
        }
    }

    const onPressDecrease = (item) => {

        console.log("onPressDecrease");

        const { quantity, _id } = item;

        if (quantity > 1) {
            dispatch(getRequestEditItemBag(_id, quantity - 1));
        }
    }

    const onPressRemoveItem = (item) => {
        setModalRemoveVisible(true);
        setSelectedItemRemove(item);
    }

    const removeItem = () => {
        //console.log(selectedItemRemove);
        dispatch(getRequestRemoveItemBag(selectedItemRemove._id));
        setModalRemoveVisible(false);
    }

    const moveItemToFavorites = () => {
        //console.log(selectedItemRemove);
        dispatch(getRequestRemoveItemBag(selectedItemRemove._id));
        dispatch(getRequestAddProductToFavorites(selectedItemRemove.product._id));
        setModalRemoveVisible(false);
    }

    const onPressItem = (item) => {
        console.log("On Press Item Bag", item.product.slug);
        navigate(screenName.detailProduct, {
            slug: item.product.slug
        })
    }

    if (bagList?.orders.length > 0) {
        return (
            <BackgroundView edges={['top']} paddingBottom={true}>

                <View style={styles.container}>
                    <Header
                        title="Bag"
                    />

                    <FlatList
                        data={bagList.orders}
                        renderItem={({ item }) => (
                            <CartItem
                                item={item}
                                onPress={() => onPressItem(item)}
                                onPressIncrease={() => onPressIncrease(item)}
                                onPressDecrease={() => onPressDecrease(item)}
                                onPressRemove={() => onPressRemoveItem(item)}
                            />
                        )}
                        ListFooterComponent={<View style={{ height: 40 }} />}
                    />

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.totalContainer}>
                            <Text>Bag Total</Text>
                            <Text price>${total}</Text>
                        </View>

                        <Button
                            style={styles.checkoutBtn}
                            title='Proceed To Checkout'
                            color={COLORS.black}
                            onPress={onPressCheckOut}
                        />
                    </View>

                </View>

                <Modal
                    title='Remove Item'
                    subTitle='Are you sure you want to remove this item?'
                    isModalVisible={modalRemoveVisible}
                    setModalVisible={setModalRemoveVisible} >

                    <View style={styles.btnContainer}>
                        <Button
                            style={styles.modalBtn}
                            title='Move to Favorites'
                            color={COLORS.white}
                            onPress={moveItemToFavorites}
                        />

                        <Button
                            style={styles.modalBtn}
                            title='Remove'
                            color={COLORS.darkRed}
                            onPress={removeItem}
                        />
                    </View>



                </Modal>

            </BackgroundView >

        )
    }

    return (
        <BackgroundView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={emptyIcon} />
                <Text subTitle>Your Bag is empty.</Text>
                <Button
                    color={COLORS.black}
                    title='Shop now'
                    style={{ marginVertical: 40 }}
                    onPress={() => navigate(screenName.home)}
                />
            </View>
        </BackgroundView>
    )


}

export default BagScreen;