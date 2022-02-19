import { View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { BackgroundView } from "../../components";
import Header from "../../components/Header";
import { goBack, navigate } from "../../navigation/root-navigation";
import { getCategoriesByParentId } from "../../api/product";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, screenName } from "../../constants";
import ProductsTabContent from "./components/ProductsTabContent";
import Text from "../../components/Text";
import SmallButton, { smallBtnName } from "../../components/SmallButton";
import { getIsLoggedInSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";

const ProductsScreen = ({ route }) => {

    const { title, isCategory, category, gender, productCollection, isFeature, searchString } = route.params;
    const layout = useWindowDimensions();

    const [categories, setCategories] = useState(null);
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState(null);
    const [scenes, setScenes] = useState(null)

    const isLoggedIn = useSelector(getIsLoggedInSelector)

    useEffect(() => {
        console.log("gender", gender);
        console.log("category", category);


        const fetchCategories = async () => {
            try {
                const result = await getCategoriesByParentId(category);
                const resCategories = result.data.categories;
                //resCategories.shift();
                setCategories(resCategories);
            } catch (error) {
                console.log(error);
            }
        }

        if (isCategory) {
            fetchCategories();
        }

        if (productCollection) {
            console.log(productCollection);
        }

    }, [])

    useEffect(() => {

        let routeArray = [];
        let sceneObj = {};

        if (categories !== null && categories.length > 0) {
            for (const cate of categories) {
                routeArray = [...routeArray, { key: cate._id, title: cate.name }]
                sceneObj[cate._id] = () => renderTab(cate._id)
            }
            setScenes(sceneObj);
            setRoutes(routeArray);
        }

    }, [categories])

    renderHeader = () => (
        <Header
            title={title}
            btnLeft={smallBtnName.back}
            onPressLeft={() => goBack()}
            btnRight={smallBtnName.star}
            onPressRight={() => {
                if (isLoggedIn) {
                    navigate(screenName.favorites)
                } else {
                    navigate(screenName.login)
                }
            }}
        />
    );



    renderLabelProduct = ({ route, focused }) => (
        <Text style={{
            color: focused ? COLORS.black : COLORS.darkGray,
            fontSize: 18,
            fontWeight: '500'
        }}>
            {route.title}
        </Text>
    )

    renderTabBarProduct = (props) => (
        <TabBar
            {...props}
            scrollEnabled={true}
            renderLabel={renderLabelProduct}
            tabStyle={{ width: 80, height: 40 }}
            style={{ backgroundColor: COLORS.whiteBackground, shadowOpacity: 0, marginBottom: 10, elevation: 0}}
            //tabBarUnderlineStyle={{ backgroundColor: COLORS.black }}
            indicatorStyle={{
                backgroundColor: COLORS.black,
                height: 2,
                width: 40,
                left: 20,
            }}>
        </TabBar>
    )

    renderTab = (cateId) => <ProductsTabContent category={cateId} gender={gender} />


    if (isFeature) {
        return (
            <BackgroundView edges={['top']}>

                {renderHeader()}

                <ProductsTabContent isFeature={true} gender={gender} />

            </BackgroundView>)
    }

    if (searchString) {
        return (
            <BackgroundView edges={['top']}>

                {renderHeader()}

                <ProductsTabContent searchString={searchString} />

            </BackgroundView>)
    }


    if (productCollection) {
        return (
            <BackgroundView edges={['top']}>
                {renderHeader()}

                <ProductsTabContent productCollection={productCollection} gender={gender} />

            </BackgroundView>)
    }

    if (isCategory && categories !== null) {
        if (categories.length < 2) {
            return (
                <BackgroundView edges={['top']}>

                    {renderHeader()}

                    <ProductsTabContent category={category} gender={gender} />

                </BackgroundView>)
        }
        else {
            return (
                <BackgroundView edges={['top']}>
                    {renderHeader()}

                    {(routes && scenes) &&
                        (<TabView
                            scrollEnabled
                            lazy
                            navigationState={{ index, routes }}
                            renderScene={SceneMap(scenes)}
                            onIndexChange={setIndex}
                            style={{ backgroundColor: COLORS.whiteBackground }}
                            initialLayout={{ width: layout.width }}
                            renderTabBar={renderTabBarProduct}
                        />
                        )}

                </BackgroundView>
            )
        }
    }

    return (
        <BackgroundView/>
    )

}


export default ProductsScreen;
