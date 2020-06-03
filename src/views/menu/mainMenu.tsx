import React, { useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Parse, { User } from 'parse/react-native';
import { AntDesign } from '@expo/vector-icons';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors, BaseColors } from '../../constant/color';
import AuthContext from '../../authContext';
import LoadingOverlay from '../components/loadingOverlay';

import UserView from './user'
import CreateGame from './createGame';

export default function MainMenu({ navigation }: any) {
  return (
    <View style={[ContainerStyle.containerBase, ContainerStyle.padding, styles.container]}>
      <UserView />
      <Text style={[TextStyle.bold, TextStyle.h5, TextStyle.sectionTitle]}>创建新游戏</Text>
      <CreateGame navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 60,
    alignItems: 'stretch'
  }
});