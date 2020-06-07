import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { ContainerStyle, TextStyle } from '../../style';
import Timer from './timer';
import FriendItem from '../components/friendItem';
import { ThemeColors } from '../../constant/color';
import GameRows from './gameRows';

export default function NewGameRow({ route, navigation }: any) {

  const { game } = route.params;
  const [lastRow, setLastRow] = React.useState<Parse.Object | undefined>(undefined);
  const [participants, setParticipants] = React.useState<Parse.User[]>([]);

  const [count, setCount] = React.useState(0);
  const [reBanker, setReBanker] = React.useState(false);
  const [bankerId, setBankerId] = React.useState("");
  const [friendId, setFriend] = React.useState("");
  const [score, setScore] = React.useState("");
  const relation = game.relation("row");

  useEffect(() => {
    (async function () {
      const count = await relation.query().count();
      setCount(count);
    })();
    (async function () {
      const relation = game.relation("participants");
      const participants = await relation.query().find();
      setParticipants(participants);
      if (participants.length > 0) setBankerId(participants[0].id);
    })();
    (async function () {
      const rows = await game.relation("row").query().descending().limit(1).find();
      if (rows[0]) {
        setLastRow(rows[0]);
      }
    })();
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: ThemeColors.greyExtraLight, flex: 1 }}>
      <View style={ContainerStyle.padding}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[TextStyle.h3]}>
            第{count}局游戏 · <Timer />
          </Text>
        </View>
        <ScrollView>
          {renderGetBankerSelect()}
          {reBanker ? renderSelectBanker() : undefined}
          {renderLevel()}
          {renderSelectFriend()}
          <Text style={[TextStyle.sectionTitle]}>庄下分数</Text>
          <View style={[ContainerStyle.shadowContainerLight, ContainerStyle.paddingSmall, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner]}>
            <TextInput
              style={[{ height: 40, borderColor: 'gray' }]}
              onChangeText={text => setScore(text)}
              value={score}
              placeholder="分数"
              keyboardType="number-pad"
            />
          </View>
          <Text style={[TextStyle.sectionTitle]}>历史等级</Text>
          <GameRows game={game} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )

  function renderGetBankerSelect() {
    const buttonBaseStyle = [ContainerStyle.padding, ContainerStyle.roundedCorner]
    return (
      <View>
        <Text style={[TextStyle.sectionTitle]}>抢庄</Text>
        <View style={[ContainerStyle.roundedCorner, ContainerStyle.shadowContainer, styles.bankerSelectorContainer]}>
          <TouchableWithoutFeedback onPress={() => setReBanker(false)}>
            <View style={[...buttonBaseStyle, reBanker ? {} : ContainerStyle.backgroundPrimary]}>
              <Text style={[TextStyle.h4, reBanker ? {} : { color: 'white' }]}>不抢庄</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setReBanker(true)}>
            <View style={[...buttonBaseStyle, reBanker ? ContainerStyle.backgroundPrimary : {}]}>
              <Text style={[TextStyle.h4, reBanker ? { color: 'white' } : {}]}>重新抢庄</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  function renderSelectBanker() {
    return (
      <View>
        <Text style={[TextStyle.sectionTitle]}>选择新庄家</Text>
        <View style={{ flexDirection: 'row' }}>
          {participants.map((participant: Parse.User) => {
            return (
              <TouchableOpacity key={participant.id}
                onPress={() => setBankerId(participant.id)}>
                <FriendItem friend={participant} />
                {bankerId === participant.id
                  ? undefined :
                  <View style={styles.friendOverlay}></View>}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    );
  }

  function renderSelectFriend() {
    return (
      <View>
        <Text style={[TextStyle.sectionTitle]}>选择朋友</Text>
        <View style={{ flexDirection: 'row' }}>
          {participants.map((participant: Parse.User) => {
            if (participant.id === bankerId) {
              return undefined;
            }

            return (
              <TouchableOpacity key={participant.id}
                onPress={() => setFriend(participant.id)}>
                <FriendItem friend={participant} />
                {friendId === participant.id
                  ? undefined :
                  <View style={styles.friendOverlay}></View>}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    );
  }

  function renderLevel() {
    if (!lastRow) {
      return undefined;
    }

    const data = lastRow.get('data');

    return (
      <View>
        <Text style={[TextStyle.sectionTitle]}>当前等级</Text>
        <View style={{ flexDirection: 'row' }}>
          {participants.map((participant: Parse.User) => {
            return (
              <View key={participant.id} style={{ alignItems: 'center' }}>
                <FriendItem friend={participant} />
                <Text style={[{ marginTop: 15 }, TextStyle.h4]}>{data[participant.id]}</Text>
                {bankerId === participant.id
                  ? undefined :
                  <View style={styles.friendOverlay}></View>}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bankerSelectorContainer: {
    flexDirection: 'row',
    alignSelf: "flex-start",
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  friendOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ThemeColors.greyExtraLight,
    opacity: 0.75
  }
})