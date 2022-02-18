import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { BackgroundView, Header } from '../../components';
import { styles } from './styles.OrderdScreen';
import { useDispatch } from 'react-redux';
import { getOrdered } from '../../api/user';
import OrderedItem from './components/OrderedItem';
import { smallBtnName } from '../../components/SmallButton';
import { goBack } from '../../navigation/root-navigation'

const OrderedScreen = () => {

    const dispatch = useDispatch();
    const [listOrdered, setListOrdered] = useState([]);

    useEffect(() => {
        const fetchListOrdered = async () => {
            try {

                const result = await getOrdered();
                setListOrdered(result.data.content);

            } catch (error) {
                console.log(error);
            }
        }

        fetchListOrdered();

    }, [])

    if (listOrdered.length > 0) {
        return (
            <BackgroundView edges={['top']}>
                <View style={styles.container}>
                    <Header
                        title='Ordered'
                        btnLeft={smallBtnName.back}
                        onPressLeft={goBack}
                    />

                    <FlatList
                        style={{ marginTop: 10 }}
                        data={listOrdered}
                        renderItem={({ item }) => <OrderedItem item={item} />}
                        ListFooterComponent={<View style={{ height: 40 }} />}
                    />

                </View>
            </BackgroundView>
        )
    }

    return (
        <BackgroundView>
            <View style={styles.container}>
                <Header
                    title='Ordered'
                    btnLeft={smallBtnName.back}
                    onPressLeft={goBack}
                />
            </View>
        </BackgroundView>
    )
}

export default OrderedScreen;