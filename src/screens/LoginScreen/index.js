import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from './styles.LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { BackgroundView, Button, LoadingView, Text, TextInput, TextInputType, Header, headerTitleName, smallBtnName } from '../../components'
import { getRequestUser, getRequestUserLogin } from '../../redux/thunk/userThunkAction';
import { navigate, goBack } from '../../navigation/root-navigation';
import { COLORS, screenName } from '../../constants';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { getEmail, storeToken, storeRefreshToken } from '../../utils';
import { facebookLogin } from '../../api/user';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { getIsFetchingUserSelector } from '../../redux/selectors';

const validateSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Passwords must be at least 8 characters')
        .max(15, 'Password must be maximum 15 characters')
        .required('Password is required')
});


const LoginScreen = () => {

    const isFetchingUser = useSelector(getIsFetchingUserSelector);

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const inputPasswordRef = useRef(null);

    onSubmit = async (values) => {
        console.log('submit', values);
        try {
            dispatch(getRequestUserLogin(values.email, values.password));
        } catch (error) {
            console.log(error);
            console.log("sai pass");
        }
    }

    saveEmailToInput = async () => {
        console.log("saveEmailToInput");
        const Useremail = await getEmail();
        if (Useremail) {
            setEmail(Useremail);
        }
    }

    useEffect(() => {
        console.log('email to input');
        saveEmailToInput();
        return () => {
            console.log('cleaned up');
            setEmail({});
        };
    }, [])

    const loginWithFb = async () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        async (data) => {
                            try {

                                const result = await facebookLogin(data.accessToken.toString());

                                if (result.data) {
                                    await storeToken(result.data.token);
                                    await storeRefreshToken(result.data.refreshToken);

                                    dispatch(getRequestUser());
                                }

                            } catch (error) {
                                console.log('error', error);
                            }
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    if (isFetchingUser) {
        return (
            <LoadingView />
        )
    }

    return (
        <BackgroundView edges={['top']}>

            <Header
                title={headerTitleName.login}
                btnLeft={smallBtnName.back}
                onPressLeft={() => goBack()}
            />

            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <AwesomeIcon name='user' size={80} color={COLORS.white} />
                </View>
            </View>


            <Formik
                enableReinitialize
                validationSchema={validateSchema}
                initialValues={{ email: email, password: "" }}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (

                    <View style={styles.formContainer}>

                        <TextInput
                            onSubmitEditing={() => inputPasswordRef.current.focus()}
                            style={{ width: '80%' }}
                            returnKeyType="next"
                            rightIcon={TextInputType.email}
                            value={values.email}
                            secureTextEntry={false}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            autoCapitalize='none'
                            placeholder='Email'
                            touched={touched.email}
                            errorText={errors.email} />

                        <TextInput
                            ref={inputPasswordRef}
                            onSubmitEditing={handleSubmit}
                            style={{ width: '80%' }}
                            rightIcon={TextInputType.password}
                            secureTextEntry={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            autoCapitalize='none'
                            placeholder='Password'
                            touched={touched.password}
                            errorText={errors.password} />

                        <TouchableOpacity style={styles.textForgotPw}>
                            <Text>Forgot your password?</Text>
                        </TouchableOpacity>

                        <View style={styles.btnContainer}>
                            <Button
                                style={styles.btnLoginStyle}
                                title='Login'
                                color={COLORS.black}
                                onPress={handleSubmit} />

                            <View style={{ alignItems: 'center' }}>
                                <Text>OR</Text>
                            </View>

                            <Button
                                onPress={() => loginWithFb()}
                                style={styles.btnLoginStyle}
                                color={COLORS.facebook}
                                title='Connect with Facebook' />
                        </View>

                        <View style={styles.textSignUpContainer}>
                            <Text style={styles.textBtn}>Don't have an account?  </Text>
                            <TouchableOpacity onPress={() => navigate(screenName.signup)}>
                                <Text style={styles.textSignUp}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}

            </Formik>

        </BackgroundView>
    )
}

export default LoginScreen;
