import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FriendItem from '../components/friendItem';
import { LinearGradient } from 'expo-linear-gradient';
import { TextStyle } from '../../style';

export default function GameRows({ game }: any) {
  const [rows, setRows] = React.useState<Parse.Object[]>([]);
  const [participants, setParticipants] = React.useState<Parse.User[]>([]);

  useEffect(() => { loadData() }, []);

  async function loadData() {
    const relation = game.relation("participants");
    const participants = await relation.query().find();
    const rows = await game.relation("row").query().descending("createdAt").limit(50).find();
    setParticipants(participants);
    setRows(rows);
  }

  return (
    <View style={[styles.rowsContainer]}>
      <View>
        {participants.map(participant => renderHeaderRow(participant))}
      </View>
      {renderRows()}
      {renderRows()}
    </View>
  )

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