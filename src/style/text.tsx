import { StyleSheet} from 'react-native';
import { BaseColors } from '../constant/color';

export default StyleSheet.create({
    h1: {
        fontSize: 48
    },
    h4: {
        fontSize: 20
    },
    h5: {
        fontSize: 18
    },
    sectionTitle: {
      color: BaseColors.grey[700], 
      marginTop: 30,
      marginBottom: 12,
      marginLeft:5
    },
    s1: {
        fontSize: 12
    },
    bold: {
        fontWeight: 'bold'
    }
});