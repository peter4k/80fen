import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Parse from 'parse/react-native';

import { ContainerStyle, ColorStyle, TextStyle } from '../../style';
import { BaseColors, ThemeColors } from '../../constant/color';
import { } from 'react-native-safe-area-context';
import LoadingOverlay from '../components/loadingOverlay';
import FriendItem from '../components/friendItem';

export default function CreateGame({ navigation }: any) {

  const [levelUpScore, setLevelUpScore] = React.useState(20);
  const [friends, setFriends] = React.useState<Parse.User[]>([]);
  const [selectedfriends, setSelectedFriends] = React.useState<Parse.User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    getFriends();
  }, [])

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
        <View style={[styles.friendContainer, ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.alignSelfStretch]}>
          {selectedfriends.map(friend =>
            <TouchableOpacity key={friend.get("username")}>
              <FriendItem friend={friend} />
            </TouchableOpacity>
            )}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.friendItem, { backgroundColor: BaseColors.grey[200] }]}>
              <AntDesign name="plus" size={30} color={ThemeColors.textColor} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'stretch' }}>
          <View style={[{ alignSelf: 'stretch', flexDirection: 'row', marginVertical: 12 }]}>
            <TouchableOpacity
              style={[{ flex: 1, alignItems: 'center' }, ContainerStyle.shadowContainer, ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.roundedCorner, ContainerStyle.backgroundPrimary]}
              onPress={createGame}
            >
              <Text style={[ColorStyle.white, TextStyle.h5, TextStyle.bold]}>创建游戏</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ flex: 1, alignItems: 'center', marginLeft: 20 }, ContainerStyle.shadowContainer, ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.roundedCorner, ContainerStyle.backgroundWhite]}
              onPress={() => { navigation.navigate("mainmenu") }}
            >
              <Text style={[ColorStyle.textColor, TextStyle.h5, TextStyle.bold]}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderUserModal()}
        <LoadingOverlay show={isLoading} />
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

  function renderUserModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[ContainerStyle.shadowContainerModal, styles.modalContainer]}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[TextStyle.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>添加朋友到游戏</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={35} color={ThemeColors.textColor} />
              </TouchableOpacity>
            </View>
            {friends.map(friend => {
              if (selectedfriends.map(selectedfriend => selectedfriend.id).includes(friend.id)) {
                return;
              }
              const color: string = friend.get("color");
              //@ts-ignore
              const style = [styles.friendItem, { backgroundColor: BaseColors[color][500] }];
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFriends([...selectedfriends, friend]);
                  }}
                  style={[ContainerStyle.shadowContainer, { marginVertical: 8, flexDirection: "row", alignItems: "center" }]} key={friend.get("username")}>
                  <FriendItem friend={friend} />
                  <Text style={[TextStyle.h4, ColorStyle.textColor, { marginLeft: 10 }]}>
                    {friend.get("nickname")}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  async function getFriends() {
    const query = new Parse.Query(Parse.User);
    const friends = await query.find();
    setIsLoading(false);
    setFriends(friends);
  }

  async function createGame() {
    if (selectedfriends.length < 5) {
      Alert.alert("找朋友游戏需要至少5人");
      return;
    }

    setIsLoading(true);

    // create game
    const Game = Parse.Object.extend("Game");
    const game = new Game();
    game.set("levelUpScore", levelUpScore);
    const relation = game.relation("participants");

    const GameRow = Parse.Object.extend("GameRow");
    const firstRow = new GameRow();
    const data: {[key: string]: number} = {};

    // link user to game
    for (const friend of selectedfriends) {
      relation.add(friend);
      data[friend.id] = 2;
    }

    firstRow.set("data", data);
    firstRow.set("index", 1);
    await firstRow.save();

    const rowRelation = game.relation("row");
    rowRelation.add(firstRow);

    await game.save();

    setIsLoading(false);
    navigation.navigate("mainmenu");
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
    flexDirection: 'row'
  },
  friendItem: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  modalContainer: {
    marginTop: 100,
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});