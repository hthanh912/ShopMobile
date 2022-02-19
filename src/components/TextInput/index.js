import React, { Component, useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { TextInput as RNTextInput } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants'
import Text from '../Text'

const useForwardedRef = (ref) =>{
    const innerRef = useRef(null);
 
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(innerRef.current);
      } else {
        ref.current = innerRef.current;
      }
    });
  
    return innerRef;
 }
 

const TextInput = React.forwardRef((props, ref) => {

    const forwardedRef = useForwardedRef(ref);
    const [isHidden, setIsHidden] = useState(props.secureTextEntry);

    const toggleHidePassword = () => {
        //this.setState({ isHidden: !this.state.isHidden })
        setIsHidden(!isHidden)
    }

    renderIconRight = (inputType, onPressRight) => {
        switch (inputType) {
            case type.email:
                return (<EntypoIcon style={styles.icon} name='mail' size={15} color={COLORS.black} />)
            case type.password:
                return (
                    <TouchableOpacity
                        onPress={toggleHidePassword}
                        style={{ height: 50, justifyContent: 'center' }}
                    >
                        {isHidden ?
                            <EntypoIcon style={styles.icon} isHidden name='eye-with-line' size={15} color={COLORS.black} />
                            : <EntypoIcon style={styles.icon} isHidden name='eye' size={15} color={COLORS.black} />}
                    </TouchableOpacity>
                )
            case type.search:
                return (
                    <TouchableOpacity
                        onPress={onPressRight}>
                        <FeatherIcon style={{ marginRight: 5 }} name='search' size={25} color={COLORS.darkGray} />
                    </TouchableOpacity>
                );
            default:
                return <View />
        }
    }

    renderIconLeft = (inputType) => {
        //const { isHidden } = this.state;
        switch (inputType) {
            case type.text:
                return (<EntypoIcon style={styles.icon} name='edit' size={15} color={COLORS.black} />)
            default:
                return (<EntypoIcon style={styles.icon} name='mail' size={15} color={COLORS.black} />)
        }
    }

    const { title, touched, leftIcon, rightIcon, errorText, capitalize, style, onPressRight, onSubmitEditing } = props;
    return (
        <View style={[styles.conatainer, style]}>
            {title && <Text style={styles.title} titleTextInput>{title}</Text>}
            <View style={[styles.inputcontainer, (touched && errorText) ? styles.errorStyle : styles.defaultStyle]}>
                {leftIcon && this.renderIconLeft(leftIcon)}
                <RNTextInput
                    {...props}
                    ref={forwardedRef}
                    style={styles.inputStyle}
                    secureTextEntry={isHidden}
                    onSubmitEditing={onSubmitEditing}
                />
                {rightIcon && this.renderIconRight(rightIcon, onPressRight)}
            </View>

            <Text style={styles.textError}>{(touched && errorText) ? errorText : ' '}</Text>

        </View>
    )

});

export default TextInput;

export const type = {
    text: 'text',
    email: 'email',
    emailLeft: 'emailLeft',
    password: 'password',
    search: 'search'
}

export const styles = StyleSheet.create({
    conatainer: {
        //backgroundColor: 'red'
    },
    inputcontainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 1,
        marginTop: 5,
        paddingLeft: 10,
    },
    errorStyle: {
        borderColor: 'red',
        borderWidth: 1,
    },
    defaultStyle: {
        borderColor: '#E8E8E8',
        borderWidth: 1,
    },
    inputStyle: {
        flex: 1,
        height: 50,
        fontSize: 18,
        marginLeft: 10,
        color: COLORS.black,
    },
    icon: {
        paddingHorizontal: 10,
    },
    textError: {
        marginLeft: 0,
        marginBottom: 5,
        color: 'red',
    },
    title: {
        marginLeft: 10,
    }
})

