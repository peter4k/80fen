import { StyleSheet, Text, View } from 'react-native';
import { ThemeColors } from '../constant/color';

export default StyleSheet.create({
    containerBase: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },

    padding: {
        padding: 12
    },

    roundedCorner: {
        borderRadius: 10
    },

    shadowContainer: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .075,
        shadowRadius: 15
    },

    backgroundWhite: {
        backgroundColor: "white",
    },
    backgroundPrimaryLite: {
        backgroundColor: ThemeColors.primaryLite
    }
});