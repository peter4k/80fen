import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import { ThemeColors } from '../../constant/color';
import FriendItem from '../components/friendItem';

export default function Game({ route, navigation }: any) {

  const game = route.params.game;
  const [participants, setParticipants] = React.useState<Parse.User[]>([]);
  const [rows, setRows] = React.useState<Parse.Object[]>([]);

  useEffect(() => { loadParticipants() }, []);

  return (
    <SafeAreaView style={ContainerStyle.containerBase}>
      <View style={[styles.container, ContainerStyle.padding]}>
        {renderHeader()}
        <View style={[styles.rowsContainer]}>
          <View>
            {participants.map(participant => renderHeaderRow(participant))}
          </View>
          {renderRows()}
          {renderRows()}
        </View>
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

  function renderHeaderRow(participant: Parse.User) {
    return (
      <View style={styles.rowItem} key={participant.id}>
        <FriendItem friend={participant} />
        {rows.map(row => {
          const data = row.get("data");
        })}
      </View>
    );
  }

  function renderRows() {
    return rows.map(row => {

      const data = row.get("data");

      return (
        <View key={row.id}>
          <View>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.15)', 'transparent']}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 1
              }}
            />
            <View style={{ paddingHorizontal: 25 }}>
              {participants.map(participant => {
                const rowData = data[participant.id];
                return (
                  <View style={styles.rowItem} key={participant.id}>
                    <Text style={TextStyle.h4}>{rowData}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      );
    });
  }

  async function loadParticipants() {
    const relation = game.relation("participants");
    const participants = await relation.query().find();
    const rows = await game.relation("row").query().descending().limit(50).find();
    setParticipants(participants);
    setRows(rows);
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
  },
  rowsContainer: {
    flexDirection: 'row'
  },
  rowItem: {
    marginTop: 25,
    height: 50,
    justifyContent: 'center'
  }
})