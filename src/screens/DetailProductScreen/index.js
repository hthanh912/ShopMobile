import { Text, SmallButton, smallBtnName, Button, Header, Modal, ProductCard, CARD_WIDTH } from '../../components'
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Modal as RNModal, ScrollView, Animated, Dimensions, BackHandler } from 'react-native';
import Snackbar from 'react-native-snackbar'
import { styles } from './styles.DetailProductScreen'
import { getBrand, getProduct, getRandomProduct } from '../../api/product';
import { goBack } from '../../navigation/root-navigation';
import { SliderBox } from "react-native-image-slider-box";
import { capitalizeFirstLetter, getFullResUrl } from '../../utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import ListSize from './components/ListSize';
import HorizontalList from './components/HorizontalList';
import PlaceHolderDetailScreen from './components/PlaceHolderDetailScreen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedInSelector, getListFavoriteSelector } from '../../redux/selectors';
import { getRequestAddProductToFavorites, getRequestRemoveProductFromFavorites, getRequestAddProductToBag } from '../../redux/thunk/userThunkAction'
import { navigate } from '../../navigation/root-navigation';
import { screenName, COLORS } from '../../constants';
import axios from 'axios';

const DetailProductScreen = ({ route }) => {

    const [fetching, setFetching] = useState(true);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [product, setProduct] = useState({});
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [images, setImages] = useState([]);
    const [visibleZoom, setVisibleZoom] = useState(false);
    const [indexImage, setIndexImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(-1);
    const [visibleModalSize, setVisibleModalSize] = useState(false);
    const [listRelativeProduct, setListRelativeProduct] = useState([]);
    const [listBrandProduct, setListBrandProduct] = useState([]);
    const [brand, setBrand] = useState();

    const isLoggedIn = useSelector(getIsLoggedInSelector);
    const listFavorite = useSelector(getListFavoriteSelector);

    const dispatch = useDispatch();
    const animatedIconRef = useRef(null);

    const AnimatedHeaderValue = new Animated.Value(0);

    const translateY = useRef(new Animated.Value(100)).current;

    const translateAnimatedIcon = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const opacityAnimatedIcon = useRef(new Animated.Value(0)).current;

    const screenWidth = Dimensions.get('window').width;
    //const screenHeight = Dimensions.get('window').height;

    useEffect(() => {

        const fetch = async () => {
            try {
                console.log(route.params.slug);

                const result = await getProduct(route.params.slug);
                const product = result.data.content;

                setProduct(product);
                setImages(getPreviews(product));
                setFetching(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetch();

    }, []);

    useEffect(() => {

        const fetchRelativeProduct = () => {

            axios.all([
                getRandomProduct(10, product.category, null),
                getRandomProduct(10, null, product.brand),
                getBrand(product.brand),

            ]).then(axios.spread((resultRelativeProduct, resultBrandProduct, resultBrand) => {
                setListRelativeProduct(resultRelativeProduct.data.content);
                setListBrandProduct(resultBrandProduct.data.content);
                setBrand(resultBrand.data.content);
            }))

        }

        if (isAnimationComplete) {
            fetchRelativeProduct();
        }

    }, [isAnimationComplete]);

    useEffect(() => {
        if (!fetching) {
            setImages(getPreviews(product));
        }
    }, [selectedVariant]);


    const startFooterAnaimation = () => {
        Animated.timing(translateY,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
            .start(({ finished }) => {
                if (finished) setIsAnimationComplete(true);
            });
    }


    const startAnimationAddToBag = () => {
        console.log("startAnimationAddToBag");
        animatedIconRef.current.measure((px, py, width, height, fx, fy) => {
            opacityAnimatedIcon.setValue(0.8)
            Animated.timing(translateAnimatedIcon, {
                toValue: {
                    x: screenWidth - fx - px - 20,
                    y: height - fy - 20,
                },
                duration: 600,
                useNativeDriver: false,
            }).start(() => {
                translateAnimatedIcon.setValue({ x: 0, y: 0 });
                opacityAnimatedIcon.setValue(0)
            });
        })
    }

    const animateHeaderBackgroundColor =
        AnimatedHeaderValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
        });

    const renderVariants = () => {
        return product.variants.map((item, index) => {
            return (
                <TouchableOpacity
                    key={item.color}
                    onPress={() => {
                        if (index !== selectedVariant) {
                            setSelectedVariant(index);
                            setSelectedSize(-1);
                        }
                    }}
                    style={[
                        styles.variantStyle,
                        (index === selectedVariant) && styles.selectedVariant
                    ]}>

                    <Image
                        style={[styles.variantImage]}
                        source={{ uri: getFullResUrl(item.image) }} />

                </TouchableOpacity>
            )
        })
    }

    const checkFavorite = (item) => listFavorite.some(product => product._id === item._id);

    const onPressIconHeart = async (item) => {
        console.log("onPressIcon");
        if (isLoggedIn) {
            console.log(item);
            const isFavorited = checkFavorite(item);
            console.log("isFavorited", isFavorited);
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


    const getPreviews = (product) => {
        //variants[selectedVariant]);        
        return [
            getFullResUrl(product.variants[selectedVariant].image),
            ...product.variants[selectedVariant].previews.map(item => getFullResUrl(item))
        ]
    }

    const getZoomPreviews = () => {
        return images.map(image => ({ url: image }))
    }

    const onPressAddToCart = () => {

        console.log("OnClick Add To Bag ");


        if (selectedSize > -1) {

            addToCart(product, selectedVariant, selectedSize);


        } else {
            setVisibleModalSize(true);
        }

    }

    const onClickSizeModal = (selectedSize) => {

        setSelectedSize(selectedSize);

        addToCart(product, selectedVariant, selectedSize);

        setVisibleModalSize(false);

    }

    const addToCart = (product, selectedVariant, selectedSize) => {

        startAnimationAddToBag();

        const productId = product._id;
        const vartiantId = product.variants[selectedVariant].sizes[selectedSize]._id;
        const quantity = 1;

        dispatch(getRequestAddProductToBag(productId, vartiantId, quantity));
    }

    const closeZoomModal = () => setVisibleZoom(false);

    const CustomImage = (props) => {
        const windowWidth = Dimensions.get('window').width;

        return (
            <View style={{
                borderRadius: 45,
                width: '100%',
                backgroundColor: COLORS.white,
                height: windowWidth + 40,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    {...props}

                    style={{ width: '100%', height: '100%', borderRadius: 45 }}
                />
            </View>
        )
    }

    if (!fetching) {

        startFooterAnaimation();

        const { variants, name, price, description } = product;
        const isFavorited = checkFavorite(product);

        return (
            <View style={{ flex: 1 }}>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 120 }}
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}

                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: { y: AnimatedHeaderValue }
                            }
                        }],
                        { useNativeDriver: false }
                    )}>

                    <SliderBox
                        ImageComponent={CustomImage}
                        images={images}
                        dotColor={COLORS.black}
                        inactiveDotColor={COLORS.gray}
                        imageLoadingColor={COLORS.gray}
                        resizeMode='contain'
                        resizeMethod='resize'
                        autoplayInterval={3000}
                        //ImageComponentStyle={styles.imageComponentStyle}
                        onCurrentImagePressed={(index) => {
                            setIndexImage(index);
                            setVisibleZoom(true);
                        }}
                    />


                    {variants.length > 1 &&
                        <View style={styles.variantsContainer}>
                            {renderVariants()}
                        </View >
                    }

                    <View style={styles.infoContainer}>

                        <View style={styles.info}>
                            <Text title style={styles.name}>{name}</Text>

                            <View style={styles.titleContainer}>
                                <Text subTitle style={{ textTransform: 'capitalize' }}>
                                    Color: {variants[selectedVariant].color}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.iconHeartContainer}>
                            <TouchableOpacity
                                onPress={() => onPressIconHeart(product)}
                                activeOpacity={0.5}
                                style={styles.iconHeart}>
                                <AwesomeIcon
                                    name='heart'
                                    //size={18}
                                    size={isFavorited ? 24 : 18}
                                    color={isFavorited ? COLORS.red : COLORS.white}

                                //color={COLORS.white}

                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <ListSize
                        product={product}
                        selectedVariant={selectedVariant}
                        selectedSize={selectedSize}
                        onPressItem={(size) => setSelectedSize(size)} />

                    <Text title style={{ marginHorizontal: 20 }}>Overview</Text>
                    <Text info style={styles.description}>{description}</Text>

                    {listRelativeProduct.length > 0 &&
                        <HorizontalList
                            title='Maybe You Like'
                            data={listRelativeProduct} />
                    }

                    {listBrandProduct.length > 0 && brand &&
                        <HorizontalList
                            title={`More from ${brand.name}`}
                            logo={getFullResUrl(brand.logo)}
                            description={brand.short_description}
                            data={listBrandProduct} />
                    }

                    <RNModal
                        onRequestClose={closeZoomModal}
                        visible={visibleZoom}
                        transparent={false}>
                        <ImageViewer
                            imageUrls={getZoomPreviews()}
                            index={indexImage}
                            enableSwipeDown={true}
                            saveToLocalByLongPress={false}
                            onSwipeDown={closeZoomModal} />
                    </RNModal>

                </ScrollView>

                <Animated.View

                    style={[
                        styles.header,
                        { backgroundColor: animateHeaderBackgroundColor },
                    ]}>

                    <Header
                        btnLeft={smallBtnName.back}
                        onPressLeft={() => goBack()}
                        btnRight={smallBtnName.bag}
                        onPressRight={() => navigate(screenName.bag)}
                    />

                </Animated.View>

                <Animated.View style={[styles.footerContainer, { transform: [{ translateY: translateY }] }]}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text subTitle>Price</Text>
                        <Text price>${price}</Text>
                    </View>

                    <Button
                        onPress={onPressAddToCart}
                        color={COLORS.black}
                        title='Add to Cart' >

                        <Animated.View
                            visible={true}
                            ref={animatedIconRef}
                            style={[
                                {
                                    flex: 1,
                                    position: 'absolute',
                                    opacity: opacityAnimatedIcon,
                                },
                                {
                                    transform: [
                                        { translateX: translateAnimatedIcon.x },
                                        { translateY: translateAnimatedIcon.y }
                                    ]
                                }
                            ]}>

                            <Image style={{ width: 60, height: 60 }} source={{ uri: getFullResUrl(product.variants[selectedVariant].image) }} />

                        </Animated.View>

                    </Button>

                </Animated.View>

                <Modal
                    style={{ height: 400 }}
                    title='Select Size'
                    isModalVisible={visibleModalSize}
                    setModalVisible={setVisibleModalSize}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ListSize
                            product={product}
                            selectedVariant={selectedVariant}
                            selectedSize={selectedSize}
                            expanded={true}
                            onPressItem={(selectedSize) => onClickSizeModal(selectedSize)} />

                    </View>

                </Modal>

            </View >

        )
    } else {
        return (
            <PlaceHolderDetailScreen />
        )
    }

}

export default DetailProductScreen;