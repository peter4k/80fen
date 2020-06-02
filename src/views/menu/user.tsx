import React, { useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Parse, { User } from 'parse/react-native';
import { AntDesign } from '@expo/vector-icons';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../constant/color';
import AuthContext from '../../authContext';
import LoadingOverlay from '../components/loadingOverlay';

export default function MainMenu({ navigation }: any) {

  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const setIsSignedIn = useContext(AuthContext);

  Parse.User.currentAsync().then(user => setUser(user));

  return (
      <View style={[styles.userContainer, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner, ContainerStyle.padding, ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimary]}>
        <View>
          <Text style={[ColorStyle.primaryExtraLite]}>Welcome</Text>
          <Text style={[TextStyle.h4, styles.username]}>{user && user.get("nickname")}</Text>
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <AntDesign name="logout" size={24} color="white" />
          <Text style={[ColorStyle.white, TextStyle.s1, { marginTop: 5 }]}>登出</Text>
        </TouchableOpacity>
      <LoadingOverlay show={isLoading} />
      </View>
  );

  async function logout() {
    setIsLoading(true);
    try {
      await Parse.User.logOut();
      setIsSignedIn(false);
    } catch (error) {
      Alert.alert("出错了，请联系王总。错误码: " + error.code);
      console.log(error.code, error.message);
    }
    setIsLoading(false);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 60,
    alignItems: 'stretch'
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: ThemeColors.primaryLite
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8
  }
});