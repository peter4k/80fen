import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FriendItem from '../components/friendItem';
import { LinearGradient } from 'expo-linear-gradient';
import { TextStyle } from '../../style';
import Level from '../components/level';

export default forwardRef(({ game }: any, ref) => {
  const [rows, setRows] = React.useState<Parse.Object[]>([]);
  const [participants, setParticipants] = React.useState<Parse.User[]>([]);
  const [shouldScrollToEnd, setShouldScrollToEnd] = React.useState(false);

  const scrollViewRef: any = useRef();

  useEffect(() => { loadData() }, []);
  useEffect(() => {
    if(shouldScrollToEnd && scrollViewRef.current){
      scrollViewRef.current.scrollToEnd({animated: false});
      setShouldScrollToEnd(false);
    }});

  useImperativeHandle(ref, () => ({
    load() {
      loadData();
    }
  }));

  async function loadData() {
    const relation = game.relation("participants");
    const participants = await relation.query().find();
    const rows = await game.relation("row").query().descending("createdAt").limit(50).find();
    setParticipants(participants);
    setRows(rows);
    setShouldScrollToEnd(true);
  }

  return (
    <View style={[styles.rowsContainer]}>
      <View>
        {participants.map(participant => renderHeaderRow(participant))}
      </View>
      <ScrollView horizontal={true} snapToEnd={true} ref={scrollViewRef}>
        <View style={{ flexDirection: "row-reverse", paddingBottom: 15 }}>
          {renderRows()}
        </View>
      </ScrollView>
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
    return rows.map((row, index) => {

      const data = row.get("data");

      return (
        <View key={row.id}>
          <View>
            {index === 0 ? undefined :
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.038)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.038)', 'transparent']}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 1
                }}
              />}
            <View style={{ paddingHorizontal: 25, alignItems: 'center' }}>
              {participants.map(participant => {
                const rowData = data[participant.id];
                return (
                  <View style={styles.rowItem} key={participant.id}>
                    <Level level={rowData} />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      );
    });
  }
});

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