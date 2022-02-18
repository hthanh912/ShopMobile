import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Text from "../../../../components/Text";
import { FlatList, ScrollView, View } from "react-native";
import { getCategoriesByParentId, getCollectionsByGender } from "../../../../api/product";
import Card, { typeName } from "../Card";
import { shuffle } from "../../../../utils";
import FeaturesCard from "../FeaturesCard";
import { getCategoriesSelector } from "../../../../redux/selectors";
import { getRequestCategories } from "../../../../redux/thunk/productsThunkAction";
import { useDispatch } from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const TabContent = (gender) => {

    const [listCollection, setListCollection] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    const categories = useSelector(getCategoriesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {

            try {

                if (!Array.isArray(categories) && !categories.length) {
                    console.log("dispatch getRequestCategories");
                    dispatch(getRequestCategories());
                }

                const resultCollections = await getCollectionsByGender(gender);

                const collections = resultCollections.data.productCollections;
                setListCollection(shuffle(collections).slice(0, 1));

                setIsFetching(false);

            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])

    const renderListCollection = () => {
        return listCollection.map(
            (item) => <Card
                key={item._id}
                type={typeName.collection}
                isBig={true}
                gender={gender}
                item={item} />)
    }

    const renderSubCategories = (category) => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20, justifyContent: 'space-between' }}>
                {category &&
                    category.subCategories.map(item =>
                        <Card type={typeName.category}
                            key={item._id}
                            isBig={false}
                            gender={gender}
                            item={item} />)
                }
            </View>
        )
    }

    const renderCategories = () => {
        return (
            <View>
                <Card
                    type={typeName.category}
                    isBig={true}
                    gender={gender}
                    item={categories.find(({ _id }) => _id === 'clothes')} />

                {renderSubCategories(categories.find(({ _id }) => _id === 'clothes'))}

                <Card
                    type={typeName.category}
                    isBig={true}
                    gender={gender}
                    item={categories.find(({ _id }) => _id === 'shoes')} />

                <Card
                    type={typeName.category}
                    isBig={true}
                    gender={gender}
                    item={categories.find(({ _id }) => _id === 'accessories')} />

                {renderSubCategories(categories.find(({ _id }) => _id === 'accessories'))}
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>

            {isFetching ?
                <>
                    <Card isPlaceholder={true} />
                    <Card isPlaceholder={true} />
                    <Card isPlaceholder={true} />
                </> :
                <>
                    <FeaturesCard category={gender} />

                    {listCollection && renderListCollection()}

                    {(Array.isArray(categories) && categories.length > 0) &&
                        renderCategories()
                    }
                </>
            }
        </ScrollView>
    );

}

export default TabContent;