import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Animated } from "react-native";
import { useSelector } from "react-redux";
import { getIsLoggedInSelector, getUserSelector, getIsFetchingUserSelector, getListFavoriteSelector } from "../../redux/selectors";
import { styles, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, AVATAR_MAX_LEFT, AVATAR_MIM_LEFT, NAME_MAX_TOP, NAME_MIN_TOP, NAME_MAX_RIGHT, NAME_MIN_RIGHT, NAME_MAX_WIDTH, NAME_MIN_WIDTH, NAME_MAX_FONT_SIZE, NAME_MIN_FONT_SIZE, AVATAR_WIDTH, AVATAR_TOP } from "./styles.UserScreen";
import AntIcon from 'react-native-vector-icons/AntDesign';
import UserButton, { userButtonName } from './components/UserButton'
import { navigate } from "../../navigation/root-navigation";
import { screenName, COLORS } from "../../constants";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Option, { optionName } from "../SettingScreen/components/Option";
import PlaceholderUserScreen from "./components/PlaceholderUserScreen";
import { getRandomProduct } from "../../api/product";
import { ProductCard, Text } from "../../components";
import { getFullResUrl } from "../../utils";

const UserScreen = () => {

    const user = useSelector(getUserSelector);
    const isLoggedIn = useSelector(getIsLoggedInSelector);
    const isFetchingUser = useSelector(getIsFetchingUserSelector);
    const AnimatedHeaderValue = new Animated.Value(0);
    const AnimatedHeaderLeft = new Animated.Value(0);
    const AnimatedNameWidth = new Animated.Value(0);
    const AnimatedNameTop = new Animated.Value(0);
    const AnimatedNameRight = new Animated.Value(0);
    const AnimatedNameFontSize = new Animated.Value(0);
    const AnimatedVisibleBtnName = new Animated.Value(0);

    const [randomProduct, setRandomProduct] = useState([]);

    const animateHeaderHeight = AnimatedHeaderValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const animateAvatarLeft = AnimatedHeaderLeft.interpolate({
        inputRange: [0, AVATAR_MAX_LEFT - AVATAR_MIM_LEFT],
        outputRange: [AVATAR_MAX_LEFT, AVATAR_MIM_LEFT],
        extrapolate: 'clamp',
    });

    const animateNameTop = AnimatedNameTop.interpolate({
        inputRange: [0, NAME_MAX_TOP - NAME_MIN_TOP],
        outputRange: [NAME_MAX_TOP, NAME_MIN_TOP],
        extrapolate: 'clamp',
    });

    const animateNameRight = AnimatedNameRight.interpolate({
        inputRange: [0, NAME_MAX_RIGHT - NAME_MIN_RIGHT],
        outputRange: [NAME_MAX_RIGHT, NAME_MIN_RIGHT],
        extrapolate: 'clamp',
    });

    const animateNameWidth = AnimatedNameWidth.interpolate({
        inputRange: [0, NAME_MAX_WIDTH - NAME_MIN_WIDTH],
        outputRange: [NAME_MAX_WIDTH, NAME_MIN_WIDTH],
        extrapolate: 'clamp',
    });

    const animateFontSize = AnimatedNameFontSize.interpolate({
        inputRange: [0, NAME_MAX_FONT_SIZE - NAME_MIN_FONT_SIZE],
        outputRange: [NAME_MAX_FONT_SIZE, NAME_MIN_FONT_SIZE],
        extrapolate: 'clamp',
    });

    const animateVisibleBtnName = AnimatedVisibleBtnName.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });


    const listAnimatedEvent = (event) => {

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedHeaderValue }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedHeaderLeft }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedNameWidth }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedNameTop }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedNameRight }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedNameFontSize }
                }
            }],
            { useNativeDriver: false }
        )(event);

        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: { y: AnimatedVisibleBtnName }
                }
            }],
            { useNativeDriver: false }
        )(event);
    }

    useEffect(() => {
        const fetchRandomProduct = async () => {
            const result = await getRandomProduct(20);
            //console.log(result.data);
            setRandomProduct(result.data.content);
        }

        fetchRandomProduct();
    }, []);

    const onItemPress = (item) => {
        navigate(screenName.detailProduct, {
            slug: item.slug,
        })
    }

    const renderHeaderList = () => {
        const { firstName, lastName, photo, fbId } = user;

        return (
            <Animated.View style={styles.container}>
                <Animated.View
                    style={[styles.userInfoContainer, { height: animateHeaderHeight }]}
                >
                    <TouchableOpacity
                        onPress={() => navigate(screenName.settingScreen)}
                        activeOpacity={0.5}
                        style={styles.settingIcon}>
                        <AntIcon name='setting' size={30} color='black' />
                    </TouchableOpacity>

                    <Animated.View style={[styles.avatarContainer, { left: animateAvatarLeft }]}>
                        {photo ?
                            <>
                                {
                                    fbId ?
                                        <>
                                            <Image source={{ uri: photo }} style={styles.avatar} />

                                            <View style={styles.fbIconContainer}>
                                                <AwesomeIcon name="facebook" size={22} color={COLORS.white} />
                                            </View>
                                        </>
                                        :
                                        <>
                                            <Image source={{ uri: getFullResUrl('images/profiles/albert.jpg') }} style={styles.avatar} />
                                        </>
                                }
                            </> :
                            <>
                                <Text style={styles.nameLetter}>
                                    {firstName ? firstName[0] : ''}
                                </Text>
                                <Text style={styles.nameLetter}>
                                    {lastName ? lastName[0] : ''}
                                </Text>
                            </>
                        }
                    </Animated.View>

                    <Animated.View style={{
                        alignItems: 'center',
                        position: 'absolute',
                        width: animateNameWidth,
                        top: animateNameTop,
                        right: animateNameRight,
                    }}>
                        <Animated.Text
                            style={[
                                styles.textName,
                                {
                                    fontSize: animateFontSize,
                                }]}>
                            {`${firstName} ${lastName}`}
                        </Animated.Text>


                        <View style={styles.buttonCotainer}>

                            <UserButton
                                name={userButtonName.orders}
                                visibleTitleBtn={animateVisibleBtnName}
                                onPress={() => navigate(screenName.ordered)} />

                            <UserButton
                                onPress={() => navigate(screenName.favorites)}
                                visibleTitleBtn={animateVisibleBtnName}
                                name={userButtonName.favorites} />

                            <UserButton
                                visibleTitleBtn={animateVisibleBtnName}
                                name={userButtonName.saleOff} />

                        </View>

                    </Animated.View>



                </Animated.View>


                <View style={{ backgroundColor: COLORS.whiteBackground, marginHorizontal: 20, paddingTop: 10 }}>
                    <Text title>Recommend for You </Text>
                </View>

            </Animated.View>
        )
    }

    if (isFetchingUser) {
        return (
            <PlaceholderUserScreen />
        )
    }

    if (isLoggedIn) {
        const { firstName, lastName, photo } = user;

        return (
            <View style={styles.container} >

                <Animated.FlatList
                    ListHeaderComponent={renderHeaderList}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[0]}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    data={randomProduct}
                    renderItem={({ item }) =>
                        <ProductCard
                            item={item}
                            enableFavoriteBtn={false}
                            visibleBtn={false}
                            onPress={() => onItemPress(item)}
                        />
                    }
                    ListFooterComponent={<View style={{ height: 120 }} />}
                    onScroll={(event) => listAnimatedEvent(event)}
                />
            </View>
        )
    }

    return (
        <View style={[styles.container, { paddingTop: 40, alignItems: 'center' }]}>

            {/* <View style={styles.avatar}>
                <AwesomeIcon name='user' size={80} color={COLORS.white} />
            </View> */}

            <View style={{
                height: AVATAR_WIDTH,
                width: AVATAR_WIDTH,
                borderRadius: AVATAR_WIDTH / 2,
                backgroundColor: COLORS.gray,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: AVATAR_TOP,
                marginBottom: 30,
            }}>
                <AwesomeIcon name='user' size={80} color={COLORS.white} />
            </View>

            <View style={styles.optionContainer}>
                <Option
                    onPress={() => navigate(screenName.login)}
                    name={optionName.logIn}
                    text='Log In' />

                <Option
                    onPress={() => navigate(screenName.signup)}
                    name={optionName.signUp}
                    text='Sign Up' />
            </View>

        </View>
    )
}

export default UserScreen;