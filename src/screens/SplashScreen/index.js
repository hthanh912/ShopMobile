
import React from 'react'
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserSelector } from "../../redux/selectors";
import { screenName } from "../../constants";
import { navigateReplace } from "../../navigation/root-navigation";
import { getRequestUser } from '../../redux/thunk/userThunkAction';
import { getRequestCategories } from '../../redux/thunk/productsThunkAction';


const SplashScreen = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        dispatch(getRequestUser());
        dispatch(getRequestCategories());

        setIsLoading(false);

    }, [])

    useEffect(() => {
        navigateReplace(screenName.mainStack);
    }, [isLoading])

    return (
        <View/>
    )
}

export default SplashScreen;