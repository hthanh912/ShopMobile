import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Pressable, Platform } from "react-native"
import { getProductsByQuery, getProductsByCategory, getProductsByCollection, getProductsByFeature, getProductsBySearch } from "../../../../api/product";
import { ProductCard } from "../../../../components";
import Snackbar from 'react-native-snackbar';
import { styles } from './styles.ProductTabContent';
import { Text } from '../../../../components';
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedInSelector, getListFavoriteSelector } from '../../../../redux/selectors';
import { getRequestAddProductToFavorites, getRequestRemoveProductFromFavorites } from '../../../../redux/thunk/userThunkAction';
import { navigate } from "../../../../navigation/root-navigation";
import { COLORS, screenName } from "../../../../constants";
import { emptyIcon } from "../../../../assets";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { arrageListProduct, getIsLargeCard, storeIsLargeCard } from "../../../../utils";

const ProductsTabContent = ({ category, productCollection, isFeature, gender, searchString }) => {

    const [listProduct, setListProduct] = useState([]);
    const [listView, setListView] = useState([]);
    const [isListEnd, setIsListEnd] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [numResults, setNumResults] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLargeCard, setIsLargeCard] = useState();

    const isLoggedIn = useSelector(getIsLoggedInSelector);
    const listFavorite = useSelector(getListFavoriteSelector);

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchProduct = async (pageNumber) => {

            if (!isFetching && !isListEnd) {
                setIsFetching(true)

                let result;
                if (category) {
                    result = await getProductsByQuery(pageNumber, { category, gender });
                } else if (productCollection) {
                    result = await getProductsByCollection(pageNumber, productCollection);
                } else if (isFeature) {
                    result = await getProductsByQuery(pageNumber, { feature: true, gender });
                } else if (searchString) {
                    result = await getProductsBySearch(pageNumber, searchString)
                }

                if (result) {
                    const listProduct = result.data.content;

                    setListProduct(listProduct);

                    setIsLargeCard(await getIsLargeCard());

                    setNumResults(result.data.count);

                    setIsFetching(false);
                }

            }

        }

        fetchProduct(pageNumber);

    }, []);

    useEffect(() => {
        setListView(isLargeCard ? arrageListProduct(listProduct) : listProduct);
    }, [isLargeCard, listProduct]);

    const onPressItem = (item) => {
        navigate(screenName.detailProduct, {
            slug: item.slug
        })
    }

    const checkFavorite = (item) => listFavorite.some(product => product._id === item._id);

    const onPressIcon = async (item) => {
        console.log("onPressIcon");
        if (isLoggedIn) {

            const isFavorited = checkFavorite(item);
            if (isFavorited) {
                dispatch(getRequestRemoveProductFromFavorites(item._id));
                Snackbar.show({
                    text: 'Removed from Favorites',
                    duration: Snackbar.LENGTH_SHORT,
                });

            } else {
                dispatch(getRequestAddProductToFavorites(item._id));
                Snackbar.show({
                    text: 'Added to Favorites',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } else {
            navigate(screenName.login)
        }
    }

    const loadMoreProducts = async () => {
        console.log("load more");

        if (listProduct.length < numResults) {

            setIsFetching(true)
            try {
                let result;
                if (category) {
                    result = await getProductsByQuery(pageNumber + 1, { category: category });
                } else if (productCollection) {
                    result = await getProductsByCollection(pageNumber + 1, productCollection);
                } else if (isFeature) {
                    result = await getProductsByQuery(pageNumber + 1, { feature: true });
                } else if (searchString) {
                    result = await getProductsBySearch(pageNumber, searchString)
                }

                const listMoreProduct = result.data.content;

                if (listMoreProduct.length > 0) {

                    const newListProducts = [...listProduct, ...listMoreProduct]

                    setListProduct(newListProducts);
                    setPageNumber(pageNumber + 1);

                    setIsFetching(false)
                } else {
                    setIsListEnd(true);
                    setIsFetching(false);
                }

            } catch (error) {
                console.log(error);
                setIsFetching(false)
            }
        }
    }

    const toggleCardStyle = async () => {
        setIsLargeCard(!isLargeCard);
        await storeIsLargeCard(!isLargeCard);
    }

    const renderHeaderList = () => {
        return (
            <View style={styles.headerList} >
                {!isFetching && numResults > 0 &&
                    <>
                        <View>
                            {numResults > 1 ?
                                <Text title>{numResults} Results</Text> :
                                <Text title>{numResults} Result</Text>}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={toggleCardStyle}
                        >
                            <MaterialCommunityIcon
                                name={isLargeCard ? 'view-day' : 'view-grid'}
                                size={28}
                                color={COLORS.black} />
                        </TouchableOpacity>
                    </>
                }
            </View>
        )
    }

    const renderFooterList = () => {
        if (!isFetching && numResults === 0) {
            return (
                <View style={{ alignItems: 'center', marginTop: 100 }}>
                    <Image source={emptyIcon} />
                    <Text subTitle>No Product Found</Text>
                </View>
            )
        }
        else {
            return (
                <View style={[styles.columnWrapperStyle, { marginBottom: 200 }]}>
                    {isFetching &&
                        <>
                            {numResults === 0 &&
                                <>
                                    <ProductCard isPlaceholder={true} />
                                    <ProductCard isPlaceholder={true} />
                                </>
                            }
                            <ProductCard isPlaceholder={true} />
                            <ProductCard isPlaceholder={true} />
                        </>
                    }
                </View >
            )
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={renderHeaderList}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                horizontal={false}
                columnWrapperStyle={styles.columnWrapperStyle}
                numColumns={2}
                data={listView}
                keyExtractor={listProduct.id}
                renderItem={({ item, index }) =>
                    <ProductCard
                        isFavorited={checkFavorite(item)}
                        item={item}
                        onPress={() => onPressItem(item)}
                        //index={index}
                        isLargeCard={isLargeCard}
                        enableFavoriteBtn={true}
                        visibleFavoriteBtn={true}
                        onPressIcon={() => onPressIcon(item)} />
                }
                ListFooterComponent={renderFooterList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}


export default ProductsTabContent;