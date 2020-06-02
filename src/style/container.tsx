import { StyleSheet, Text, View } from 'react-native';
import { ThemeColors } from '../constant/color';

export default StyleSheet.create({
    containerBase: {
        flex: 1,
        backgroundColor: ThemeColors.greyExtraLight,
        alignItems: 'center',
        justifyContent: 'center'
    },

    paddingSmall: {
        paddingVertical: 8,
        paddingHorizontal: 16
    },

    padding: {
        paddingVertical: 16,
        paddingHorizontal: 24
    },

    paddingLarge: {
        paddingVertical: 15,
        paddingHorizontal: 30
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
        shadowOpacity: .15,
        shadowRadius: 15
    },

    shadowContainerLight: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .05,
        shadowRadius: 15
    },

    backgroundWhite: {
        backgroundColor: "white",
    },
    backgroundPrimary: {
        backgroundColor: ThemeColors.primary
    },
    backgroundPrimaryLite: {
        backgroundColor: ThemeColors.primaryLite
    },
    backgroundPrimaryExtraLite: {
        backgroundColor: ThemeColors.primaryExtraLite
    }
});