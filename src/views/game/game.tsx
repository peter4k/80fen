import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import { ThemeColors } from '../../constant/color';
import FriendItem from '../components/friendItem';
import GameRows from './gameRows';

export default function Game({ route, navigation }: any) {

  const game = route.params.game;

  return (
    <SafeAreaView style={ContainerStyle.containerBase}>
      <View style={[styles.container, ContainerStyle.padding]}>
        {renderHeader()}
        <GameRows game={game} />
        <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
          <TouchableOpacity
            style={[{ width: 200, marginTop: 25, alignItems: 'center' }, ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimaryExtraLite, ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.roundedCorner]}
            onPress={() => navigation.navigate("newgamerow", { game })}
          >
            <Text style={[ColorStyle.primary, TextStyle.h5, TextStyle.bold]}>开始新的一局</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )

  function renderHeader() {
    return (
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.navigate("mainmenu")}>
          <AntDesign name="left" size={30} color={ThemeColors.primary} />
        </TouchableOpacity>
        <Text style={[TextStyle.h3, { marginLeft: 25 }]}>找朋友 · {game.get("levelUpScore")}分升级</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
  }
})