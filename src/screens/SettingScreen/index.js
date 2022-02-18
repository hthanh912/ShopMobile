import React, { useState } from "react"
import { View, Pressable, TouchableWithoutFeedback } from "react-native"
import { BackgroundView } from "../../components"
import Text from "../../components/Text"
import { styles } from './styles.settingScreen'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from "../../constants"
import Option, { optionName } from "./components/Option";
import { navigate, goBack } from "../../navigation/root-navigation"
import { useDispatch } from "react-redux"
import { getRequestUserLogOut } from "../../redux/thunk/userThunkAction"
import { screenName } from "../../constants"
import Header, { headerBtnName, headerTitleName } from "../../components/Header"
import { smallBtnName } from "../../components/SmallButton"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import { Button } from "../../components"

const SettingScreen = () => {

    const dispatch = useDispatch();

    const logOut = () => {
        console.log('Log Out .... ');
        dispatch(getRequestUserLogOut());
        goBack();
    }

    const [isModalVisible, setModalVisible] = useState(true);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    return (
        <BackgroundView edges={['top']}>

            <Header
                title={headerTitleName.settings}
                btnLeft={smallBtnName.back}
                onPressLeft={() => goBack()}
            />

            <View style={styles.container}>
                <View style={styles.optionContainer}>
                    <Option
                        text='Edit Profile'
                        name={optionName.editProfile}
                        onPress={() => navigate(screenName.editProfile)}
                    />
                    <View style={{ height: 20 }} />
                    <Option
                        text='Log Out'
                        name={optionName.logOut}
                        onPress={logOut} />

                </View>
            </View>

        </BackgroundView>

    )

}

export default SettingScreen;