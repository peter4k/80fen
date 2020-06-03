import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { ContainerStyle, ColorStyle, TextStyle } from '../../style';
import { BaseColors, ThemeColors } from '../../constant/color';
import { } from 'react-native-safe-area-context';

export default function CreateGame({ navigation }: any) {

  const [levelUpScore, setLevelUpScore] = React.useState(20);

  return (
    <SafeAreaView style={ContainerStyle.containerBase}>
      <View style={[styles.container, ContainerStyle.padding]}>
        <Text style={[TextStyle.bold, TextStyle.h4, TextStyle.sectionTitle, styles.firstSetionTitle]}>升级分数</Text>
        <View style={[ContainerStyle.shadowContainerLight, styles.scoreContainer]}>
          {renderScore(5)}
          {renderScore(20)}
          {renderScore(40)}
        </View>
        <Text style={[TextStyle.bold, TextStyle.h4, TextStyle.sectionTitle]}>添加朋友</Text>
        <View style={[ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.alignSelfStretch]}>
          {renderFriend()}
          <View style={[styles.friendContainer, {backgroundColor: BaseColors.grey[200]}]}>
            <AntDesign name="plus" size={30} color={ThemeColors.textColor} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  function renderScore(score: number) {

    const containerStyles: any[] = [ContainerStyle.padding, styles.scoreSelection];
    const textStyles: any[] = [TextStyle.h4, TextStyle.bold];
    if (score === levelUpScore) {
      containerStyles.push(ContainerStyle.backgroundPrimary);
      textStyles.push(ColorStyle.white);
    } else {
      textStyles.push(ColorStyle.textColor);
    };

    return (
      <TouchableWithoutFeedback onPress={() => setLevelUpScore(score)}>
        <View style={containerStyles}>
          <Text style={textStyles}>{score}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  function renderFriend() {
    return (
      <View style={styles.friendContainer}>
        <Text style={[TextStyle.bold, TextStyle.h4, ColorStyle.textColor]}>
          王
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scoreContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  scoreSelection: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10
  },
  scoreSelectionSelected: {
    backgroundColor: ThemeColors.primaryExtraLite,
  },
  firstSetionTitle: {
    marginTop: 10
  },
  friendContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});