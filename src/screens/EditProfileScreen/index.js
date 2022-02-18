import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { BackgroundView, Button, TextInput } from "../../components";
import Header, { headerBtnName, headerTitleName } from "../../components/Header";
import { type } from "../../components/TextInput";
import { goBack, navigate } from "../../navigation/root-navigation";
import { styles } from "./styles.EditProfile";
import { Formik } from "formik";
import * as Yup from 'yup';
import { getUserSelector } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { getRequestEditProfile } from "../../redux/thunk/userThunkAction";
import { screenName } from "../../constants";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from "react-native-picker-select";
import { COLORS } from "../../constants";
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { smallBtnName } from "../../components/SmallButton";


const validateSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email không hợp lệ'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
});

const EditProfileScreen = () => {

    const [inputUser, setInputUser] = useState('');

    const dispatch = useDispatch()

    const user = useSelector(getUserSelector);

    useEffect(() => {
        setInputUser(user)
    }, [])

    onSubmit = (values) => {
        console.log("dispatch getRequestEditProfile");
        dispatch(getRequestEditProfile({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            gender: values.gender,
        }));
        navigate(screenName.user);
    }

    return (
        <BackgroundView edges={['top']}>
            <Header
                title={headerTitleName.editProfile}
                btnLeft={smallBtnName.back}
                onPressLeft={() => goBack()} />
            <Formik
                enableReinitialize
                initialValues={{
                    email: inputUser.email,
                    firstName: inputUser.firstName,
                    lastName: inputUser.lastName,
                    gender: inputUser.gender,
                }}
                validationSchema={validateSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <View style={styles.container}>

                        <TextInput
                            style={{ width: '80%' }}
                            leftIcon={type.text}
                            title='First Name'
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            touched={touched.firstName}
                            errorText={errors.firstName}
                        />

                        <TextInput
                            style={{ width: '80%' }}
                            leftIcon={type.text}
                            title='Last Name'
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            touched={touched.lastName}
                            errorText={errors.lastName}
                        />

                        <View>
                            <Text style={styles.labelGender}>Gender</Text>
                            <View style={styles.pickerGenderContainer}>
                                <FoundationIcon name="torsos-male-female" size={20} color={COLORS.black} />
                                <RNPickerSelect
                                    placeholder={{}}
                                    style={styles.pickerGender}
                                    onValueChange={value => setInputUser({ ...inputUser, gender: value })}
                                    value={values.gender}
                                    items={[
                                        { label: 'Male', value: true },
                                        { label: 'Female', value: false },
                                    ]}
                                />
                            </View>
                        </View>

                        <TextInput
                            style={{ width: '80%' }}
                            leftIcon={type.emailLeft}
                            title='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            touched={touched.email}
                            errorText={errors.email}
                        />


                        <Button
                            style={styles.btnSave}
                            onPress={handleSubmit}
                            title='Save Changes'
                        />
                    </View>
                )}
            </Formik>

        </BackgroundView>
    )
}

export default EditProfileScreen;
