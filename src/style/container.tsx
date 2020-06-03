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

    alignSelfStretch: {
      alignSelf: 'stretch'
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
        shadowRadius: 15,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    shadowContainerLight: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .05,
        shadowRadius: 15,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    shadowContainerModal: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: -10
        },
        shadowOpacity: .1,
        shadowRadius: 15,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
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