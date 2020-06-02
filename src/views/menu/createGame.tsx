import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { ContainerStyle, ColorStyle, TextStyle } from '../../style';
import { BaseColors, ThemeColors } from '../../constant/color';

export default function CreateGame({ navigation }: any) {
  return (
    <TouchableOpacity style={[styles.container, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner, ContainerStyle.padding, ContainerStyle.shadowContainerLight]}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons name="cards" size={45} color={ThemeColors.primary} />
        <Text style={[styles.text, TextStyle.bold, TextStyle.h5, ColorStyle.textColorLight]}>创建找朋友游戏</Text>
      </View>
      <AntDesign name="right" size={30} color={ThemeColors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: 8
  }
});