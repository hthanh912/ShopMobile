import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { BackgroundView, Button, TextInput } from "../../components";
import Header, { headerBtnName, headerTitleName } from "../../components/Header";
import { type } from "../../components/TextInput";
import { goBack, navigate } from "../../navigation/root-navigation";
import { styles } from "./styles.SignUpScreen";
import { Formik } from "formik";
import * as Yup from 'yup';
import { getUserSelector } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { getRequestEditProfile, getRequestSignUp } from "../../redux/thunk/userThunkAction";
import { screenName } from "../../constants";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from "react-native-picker-select";
import { COLORS } from "../../constants";
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { signUp } from "../../api/user";
import { smallBtnName } from "../../components/SmallButton";


const validateSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email không hợp lệ'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    password: Yup.string()
        .min(8, 'Password tối thiểu 8 kí tự')
        .max(15, 'Password tối đa 15 kí tự')
        .required('Bắt buộc nhập password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

});

const SignUpScreen = () => {

    const [inputUser, setInputUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        gender: true,
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch()

    useEffect(() => {
        //setInputUser(user)
        // return () => {
        //     console.log('cleaned up');
        // };
    }, [inputUser])

    onSubmit = async (values) => {
        console.log(values);
        const result = await signUp({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            gender: values.gender,
            password: values.password,
        });
        navigate(screenName.login);
    }

    return (
        <BackgroundView edges={['top']}>
            <Header
                title={headerTitleName.signup}
                btnLeft={smallBtnName.back}
                onPressLeft={() => goBack()} />
            <Formik
                enableReinitialize
                initialValues={{
                    email: inputUser.email,
                    firstName: inputUser.firstName,
                    lastName: inputUser.lastName,
                    gender: inputUser.gender,
                    password: inputUser.password,
                    confirmPassword: inputUser.confirmPassword,
                }}
                validationSchema={validateSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <View style={styles.container}>

                        <TextInput
                            style={styles.inputStyle}
                            leftIcon={type.text}
                            title='First Name'
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            touched={touched.firstName}
                            errorText={errors.firstName}
                        />

                        <TextInput
                            style={styles.inputStyle}
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
                            style={styles.inputStyle}
                            leftIcon={type.emailLeft}
                            title='Email'
                            autoCapitalize='none'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            touched={touched.email}
                            errorText={errors.email}
                        />

                        <TextInput
                            style={styles.inputStyle}
                            rightIcon={type.password}
                            title='Password'
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            touched={touched.password}
                            errorText={errors.password}
                        />

                        <TextInput
                            style={styles.inputStyle}
                            rightIcon={type.password}
                            title='Confirm password'
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            touched={touched.confirmPassword}
                            errorText={errors.confirmPassword}
                        />

                        <Button
                            style={styles.btnSave}
                            onPress={handleSubmit}
                            title='Sign Up'
                        />
                    </View>
                )}
            </Formik>

        </BackgroundView>
    )
}

export default SignUpScreen;
