import React, { useState, useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BackgroundView, Text, SmallButton, smallBtnName, TextInput, Button, TextInputType } from "../../components";
import { COLORS } from "../../constants";
import TabContent from "./components/TabContent";
import { navigate } from "../../navigation/root-navigation";
import { screenName } from "../../constants";
import { useSelector } from "react-redux";
import { getIsLoggedInSelector } from "../../redux/selectors";
import Modal from 'react-native-modal'
import { useRef } from "react";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";


const renderScene = SceneMap({
    men: () => TabContent('men'),
    women: () => TabContent('women'),
    kids: () => TabContent('kids'),
});

const HomeScreen = () => {

    const layout = useWindowDimensions();
    const isLoggedIn = useSelector(getIsLoggedInSelector);

    const searchInputRef = useRef(null);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'men', title: 'Men' },
        { key: 'women', title: 'Women' },
        { key: 'kids', title: 'Kids' },
    ]);

    useEffect(() => {
        setSearchValue(searchValue);
    }, []);


    renderLabelHome = ({ route, focused }) => (
        <Text
            style={{
                color: focused ? COLORS.black : COLORS.darkGray,
                fontSize: 19,
                fontWeight: '800'
            }}>
            {route.title}
        </Text>
    )

    renderTabBarHome = (props) => (
        <View style={{ flexDirection: 'row' }}>
            <TabBar {...props}
                style={{ borderWidth: 0 }}
                renderLabel={renderLabelHome}
                tabStyle={{ width: 90, height: 40 }}
                style={{ flex: 1, backgroundColor: COLORS.whiteBackground, shadowOpacity: 0, marginBottom: 10, elevation: 0 }}
                //tabBarUnderlineStyle={{ backgroundColor: COLORS.black }}
                indicatorStyle={{
                    backgroundColor: COLORS.black,
                    height: 2,
                    width: 45,
                    left: 22.5,
                }}
            />

            <View style={{ flexDirection: 'row', marginRight: 20 }}>

                <SmallButton
                    onPress={() => {
                        isLoggedIn ?
                            navigate(screenName.favorites) :
                            navigate(screenName.login)
                    }}
                    name={smallBtnName.star}
                />

                <SmallButton
                    name={smallBtnName.search}
                    onPress={() => {
                        setIsSearchVisible(true);
                        //searchInputRef.current?.focus();
                        //console.log(searchValue);
                        //setSearchValue(searchValue);
                    }}
                />

            </View>

        </View>

    )

    const onPressSearch = () => {
        if (searchValue) {
            setIsSearchVisible(false);
            navigate(screenName.products, {
                title: searchValue,
                searchString: searchValue,
            });
        }
    }

    return (
        <BackgroundView edges={['top']}>                

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    style={{ backgroundColor: COLORS.whiteBackground }}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBarHome}
                />

                <Modal
                    style={{ justifyContent: 'flex-start', marginHorizontal: 20, marginTop: 40 }}
                    isVisible={isSearchVisible}
                    onBackdropPress={() => setIsSearchVisible(false)}
                    onBackButtonPress={() => setIsSearchVisible(false)}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    onShow={() => {
                        setTimeout(() => {
                            searchInputRef.current.focus();
                        }, 100)
                    }}
                >
                    <TextInput
                        ref={searchInputRef}
                        returnKeyType='search'
                        type={TextInputType.text}
                        rightIcon={TextInputType.search}
                        onPressRight={onPressSearch}
                        onChangeText={newText => setSearchValue(newText)}
                        value={searchValue}
                        onSubmitEditing={onPressSearch}
                    />

                </Modal>

        </BackgroundView>

    );

}

export default HomeScreen;