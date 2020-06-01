import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { ThemeColors } from '../constant/color';

interface IProps {
    show: boolean;
}
const LoadingOverlay: FunctionComponent<IProps> = (props: IProps) => {
    if(!props.show){
        return null;
    }
    
    return (
        <View style={styles.container}>
            <View style={[styles.container, styles.background]}></View>
            <MaterialIndicator color={ThemeColors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    background: {
        backgroundColor: 'white',
        opacity: .75
    }
});

export default LoadingOverlay;