import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Parse, { User } from 'parse/react-native';
import { AntDesign } from '@expo/vector-icons';

import { ContainerStyle, TextStyle, ColorStyle } from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../constant/color';

export default function MainMenu({ navigation }: any) {

  const [user, setUser] = React.useState<User | null>(null);
  Parse.User.currentAsync().then(user => setUser(user));

  return (
    <View style={[ContainerStyle.containerBase, ContainerStyle.paddingLarge, styles.container]}>
      <View style={[styles.userContainer, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner, ContainerStyle.padding, ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimary]}>
        <View>
          <Text style={[ColorStyle.white]}>Welcome</Text>
          <Text style={[TextStyle.h4, styles.username]}>{user && user.get("username")}</Text>
        </View>
        <TouchableOpacity style={styles.logoutContainer}>
          <AntDesign name="logout" size={24} color="white" />
          <Text style={[ColorStyle.white, TextStyle.s1, {marginTop: 5}]}>登出</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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