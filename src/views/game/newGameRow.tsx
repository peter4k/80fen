import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView, Alert } from 'react-native';
import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import Timer from './timer';
import FriendItem from '../components/friendItem';
import { ThemeColors } from '../../constant/color';
import GameRows from './gameRows';
import Parse from 'parse/react-native';
import Level from '../components/level';

export default function NewGameRow({ route, navigation }: any) {

  const { game } = route.params;
  const [lastRow, setLastRow] = React.useState<Parse.Object | undefined>(undefined);
  const [participants, setParticipants] = React.useState<Parse.User[]>([]);

  const [count, setCount] = React.useState(0);
  const [reBanker, setReBanker] = React.useState(false);
  const [bankerId, setBankerId] = React.useState(game.get("bankerId"));
  const [friendId, setFriend] = React.useState("");
  const [nextBankerId, setNextBankerId] = React.useState("");
  const [score, setScore] = React.useState("0");
  const relation = game.relation("row");

  const timerRef: any = useRef();

  useEffect(() => {
    (async function () {
      const count = await relation.query().count();
      setCount(count);
    })();
    (async function () {
      const relation = game.relation("participants");
      const participants = await relation.query().find();
      setParticipants(participants);
    })();
    (async function () {
      const rows = await game.relation("row").query().descending("createdAt").limit(1).find();
      if (rows[0]) {
        setLastRow(rows[0]);
      }
    })();
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: ThemeColors.greyExtraLight, flex: 1 }}>
      <View style={[{ flexDirection: 'row', zIndex: 10, backgroundColor: ThemeColors.greyExtraLight }, ContainerStyle.padding]}>
        <Text style={[TextStyle.h3]}>
          第{count}局游戏 · <Timer ref={timerRef} />
        </Text>
      </View>
      <ScrollView style={[{ paddingTop: 0 }, ContainerStyle.padding]}>
        {renderGetBankerSelect()}
        {reBanker ? renderSelectBanker() : undefined}
        {renderLevel()}
        {renderSelectFriend()}
        <Text style={[TextStyle.sectionTitle]}>庄下分数</Text>
        <View style={[{ width: 100 }, ContainerStyle.shadowContainerLight, ContainerStyle.paddingSmall, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner]}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => setScore(text)}
            value={score}
            placeholder="分数"
            keyboardType="number-pad"
          />
        </View>
        {renderSelectNextBanker()}
        <View style={{ alignSelf: 'stretch', alignItems: "flex-start", flexDirection: "row", marginVertical: 30 }}>
          <TouchableOpacity
            style={[{ marginTop: 25, alignItems: 'center' }, ContainerStyle.shadowContainer, ContainerStyle.shadowContainerLight, ContainerStyle.backgroundPrimary, ContainerStyle.padding, ContainerStyle.roundedCorner]}
            onPress={onFinish}
          >
            <Text style={[ColorStyle.white, TextStyle.h5, TextStyle.bold]}>结束这一局</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ marginTop: 25, alignItems: 'center', marginLeft: 15 }, ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimaryExtraLite, ContainerStyle.shadowContainerLight, ContainerStyle.padding, ContainerStyle.roundedCorner]}
            onPress={() => navigation.navigate("game", { game })}
          >
            <Text style={[ColorStyle.primary, TextStyle.h5, TextStyle.bold]}>取消</Text>
          </TouchableOpacity>
        </View>
        <Text style={[TextStyle.sectionTitle]}>历史等级</Text>
        <GameRows game={game} />
      </ScrollView>
    </SafeAreaView>
  )

  function renderGetBankerSelect() {
    const buttonBaseStyle = [ContainerStyle.padding, ContainerStyle.roundedCorner]
    return (
      <View style={{ overflow: 'visible' }}>
        <Text style={[TextStyle.sectionTitle, { marginTop: 10 }]}>抢庄</Text>
        <View style={[ContainerStyle.roundedCorner, ContainerStyle.shadowContainerLight, styles.bankerSelectorContainer]}>
          <TouchableWithoutFeedback onPress={() => setReBanker(false)}>
            <View style={[...buttonBaseStyle, reBanker ? {} : ContainerStyle.backgroundPrimary]}>
              <Text style={[TextStyle.h5, reBanker ? {} : { color: 'white' }]}>不抢庄</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setReBanker(true)}>
            <View style={[...buttonBaseStyle, reBanker ? ContainerStyle.backgroundPrimary : {}]}>
              <Text style={[TextStyle.h5, reBanker ? { color: 'white' } : {}]}>重新抢庄</Text>
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
            const isSelected = friendId === participant.id;
            return (
              <TouchableOpacity key={participant.id}
                onPress={() => (
                  isSelected
                    ? setFriend("")
                    : setFriend(participant.id)
                )}>
                <FriendItem friend={participant} />
                {isSelected
                  ? undefined :
                  <View style={styles.friendOverlay}></View>}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    );
  }

  function renderSelectNextBanker() {
    let scoreInt = parseInt(score);
    if (isNaN(scoreInt) || scoreInt < 80) {
      return undefined;
    }

    return (
      <View>
        <Text style={[TextStyle.sectionTitle]}>选择下一庄家</Text>
        <View style={{ flexDirection: 'row' }}>
          {participants.map((participant: Parse.User) => {
            if (participant.id === bankerId || participant.id === friendId) {
              return undefined;
            }

            return (
              <TouchableOpacity key={participant.id}
                onPress={() => setNextBankerId(participant.id)}>
                <FriendItem friend={participant} />
                {nextBankerId === participant.id
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
      return (
        <View style={{ height: 155 }}>
          <Text style={[TextStyle.sectionTitle]}>当前等级</Text>
        </View>
      );
    }

    const data = lastRow.get('data');

    return (
      <View style={{ height: 155 }}>
        <Text style={[TextStyle.sectionTitle]}>当前等级</Text>
        <View style={{ flexDirection: 'row' }}>
          {participants.map((participant: Parse.User) => {
            return (
              <View key={participant.id} style={{ alignItems: 'center' }}>
                <FriendItem friend={participant} />
                <View style={{ marginTop: 15 }}>
                  <Level level={data[participant.id]} />
                </View>
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

  async function onFinish() {
    const scoreInt = parseInt(score);
    const levelUpScore = game.get("levelUpScore");
    let levelUp = 0;
    if (isNaN(scoreInt)) {
      Alert.alert("请输入分数");
      return;
    }
    if (!friendId) {
      Alert.alert("请选择朋友，如果是庄家自己打就选庄家自己 :)");
      return;
    }

    let levelUpPpl = [bankerId];
    if (friendId) levelUpPpl.push(friendId);

    if (scoreInt >= 80) {
      if (!nextBankerId) {
        Alert.alert("请选择下一个庄家");
        return;
      }

      levelUpPpl = participants.map(participant => participant.id).filter(id => levelUpPpl.indexOf(id) === -1);
      levelUp = Math.floor((scoreInt - 80) / levelUpScore);
      game.set("bankerId", nextBankerId);
    } else {
      levelUp = Math.ceil((80 - scoreInt) / levelUpScore);
      if (scoreInt === 0) levelUp = levelUp + 1;
      game.set("bankerId", friendId);
    }

    if (lastRow) {
      lastRow.set("bankerId", bankerId);
      if (timerRef.current) {
        const time = timerRef.current.getTime();
        lastRow.set("time", time);
      }

      await lastRow.save();
    }

    const GameRow = Parse.Object.extend("GameRow");
    const gameRow = new GameRow();
    gameRow.set("index", count + 1);
    const data = lastRow ? lastRow.get("data") : {};
    let roundData = lastRow ? lastRow.get("roundData") : {};
    roundData = roundData || {};
    const newData: any = {};
    const newRoundData: any = {};
    for (const participant of participants) {
      const currLevel = data[participant.id] || 2;
      const currRound = roundData[participant.id] || 1;
      let nextLevel = currLevel;
      let nextRound = currRound;
      if (levelUpPpl.includes(participant.id)) nextLevel += levelUp;
      if (nextLevel > 14) {
        nextLevel = nextLevel - 13;
        nextRound ++;
      }
      newData[participant.id] = nextLevel;
      newRoundData[participant.id] = nextRound;
    }

    gameRow.set("data", newData);
    gameRow.set("roundData", newRoundData);

    await gameRow.save();
    const relation = game.relation("row");
    relation.add(gameRow);

    await game.save();
    navigation.navigate("game", { game });
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
    opacity: 0.65
  }
})