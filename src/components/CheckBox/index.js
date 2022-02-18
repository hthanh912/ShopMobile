import RNCheckBox from '@react-native-community/checkbox';
import React from 'react';
import { Platform } from 'react-native';
import { COLORS } from '../../constants';

const CheckBox = ({value, onChange}) => {

    if (Platform.OS === 'ios') {
        return (
            <RNCheckBox
                style={{ width: 18, height: 18 }}
                onTintColor={COLORS.black}
                tintColor={COLORS.black}
                onCheckColor={COLORS.white}
                onFillColor={COLORS.black}
                boxType="square"
                value={value}
                onChange={onChange}
            />

        )
    } else {
        return (
            <RNCheckBox
                value={agree}
                onChange={() => setToggleCheckBox(!toggleCheckBox)} />
        )
    }

}

export default CheckBox;