import { StyleSheet} from 'react-native';
import { BaseColors, ThemeColors } from '../constant/color';

export default StyleSheet.create({
    h1: {
        fontSize: 48
    },
    h3: {
        fontSize: 28,
        fontWeight: 'bold',
        color: ThemeColors.textColor
    },
    h4: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ThemeColors.textColor
    },
    h5: {
        fontSize: 18
    },
    sectionTitle: {
      color: BaseColors.grey[700], 
      marginTop: 30,
      marginBottom: 12,
      marginLeft:5,
      fontWeight: 'bold',
      fontSize: 18
    },
    s1: {
        fontSize: 12
    },
    bold: {
        fontWeight: 'bold'
    }
});