import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { BackgroundView, Button, Modal } from "../../components";
import { Text } from "../../components";
import Header from "../../components/Header";
import { smallBtnName } from "../../components/SmallButton";
import { COLORS, screenName } from "../../constants";
import { goBack, navigate } from "../../navigation/root-navigation";
import { getListFavoriteSelector, getIsLoggedInSelector } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { getListProduct } from '../../api/product'
import { styles } from './styles.WishlistScreen'
import { ProductCard } from '../../components';
import { getRequestRemoveProductFromFavorites } from "../../redux/thunk/userThunkAction";

const FavoritesScreen = () => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [visibleModalRemove, setVisibleModalRemove] = useState(false);
    const [deletedItems, setDeletedItems] = useState([]);
    const [selectdItem, setSelectedItem] = useState();

    const isLoggedIn = useSelector(getIsLoggedInSelector);
    const listFavorite = isLoggedIn ? useSelector(getListFavoriteSelector) : [];

    const dispatch = useDispatch();

    const renderHeaderList = () => (
        <View style={styles.headerList}>
            {listFavorite.length > 1 ?
                <Text title>{listFavorite.length} Items</Text> :
                <Text title>{listFavorite.length} Item</Text>}
        </View>
    )

    const onEdit = () => {
        console.log("edit mode");
        if (isEditMode) {
            dispatch(getRequestRemoveProductFromFavorites(deletedItems.map(item => item._id)));
        }
        setIsEditMode(!isEditMode)
    }

    const checkItem = (item) => !deletedItems.some(product => product._id === item._id);

    const onPressItem = (item) => {
        navigate(screenName.detailProduct, {
            slug: item.slug,
        })
    }

    const onPressIcon = (item) => {

        if (isLoggedIn) {

            if (isEditMode) {
                const isChecked = checkItem(item);

                if (isChecked) {
                    setDeletedItems([...deletedItems, item])
                } else {
                    setDeletedItems(deletedItems.filter(product => product._id !== item._id))
                }

            } else {

                setVisibleModalRemove(true);
                setSelectedItem(item._id);

            }

        } else {
            navigate(screenName.login)
        }

    }

    const removeItem = () => {
        dispatch(getRequestRemoveProductFromFavorites(selectdItem));
        setVisibleModalRemove(false);
    }


    if (listFavorite.length > 0) {
        return (
            <BackgroundView edges={['top']}>
                <View style={{ flex: 1 }}>
                    <Header
                        title='Favorites'
                        btnLeft={smallBtnName.back}
                        onPressLeft={goBack}
                        btnRight={isEditMode ? smallBtnName.done : smallBtnName.edit}
                        onPressRight={() => onEdit()}
                    />

                    <FlatList
                        ListHeaderComponent={renderHeaderList}
                        stickyHeaderIndices={[0]}
                        stickyHeaderHiddenOnScroll={true}
                        horizontal={false}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        numColumns={2}
                        data={listFavorite}
                        keyExtractor={listFavorite._id}
                        renderItem={({ item, index }) =>
                            <ProductCard
                                isFavorited={checkItem(item)}
                                enableFavoriteBtn={true}
                                visibleFavoriteBtn={true}
                                item={item}
                                index={index}
                                onPress={() => onPressItem(item)}
                                onPressIcon={() => onPressIcon(item)}
                            />}
                        ListFooterComponent={<View style={{ height: 100 }}></View>}
                        showsVerticalScrollIndicator={false}
                    />

                </View>

                <Modal
                    isModalVisible={visibleModalRemove}
                    setModalVisible={setVisibleModalRemove}
                    title='Remove Item'
                    subTitle='Are you sure you want to remove this item?'>

                    <Button
                        style={styles.btnRemove}
                        title='Remove'
                        color={COLORS.darkRed}
                        onPress={removeItem}
                    />

                </Modal>

            </BackgroundView>
        )
    }

    return (<BackgroundView edges={['top']}>
        <View style={{ flex: 1 }}>
            <Header
                title='Favorites'
                btnLeft={smallBtnName.back}
                onPressLeft={goBack}
                btnRight={isEditMode ? smallBtnName.done : smallBtnName.edit}
                onPressRight={() => onEdit()}
            />
        </View>
    </BackgroundView>)


}

export default FavoritesScreen;