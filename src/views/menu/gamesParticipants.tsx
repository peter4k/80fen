import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Parse from 'parse/react-native';

import { TextStyle, ContainerStyle, ColorStyle } from '../../style';
import LoadingOverlay from '../components/loadingOverlay';
import FriendItem from '../components/friendItem';

interface IGrameParticipantsProps {
  game: Parse.Object;
}

export default function GameParticipants(props: IGrameParticipantsProps) {

  const [participants, setParticipants] = React.useState<Parse.User[]>([]);

  useEffect(() => { getParticipants() }, []);

  return (
    <View style={styles.container}>
      {participants.map(participant => <FriendItem friend={participant} />)}
    </View>
  );

  async function getParticipants() {
    const relation = props.game.relation("participants");
    const participants = await relation.query().find() as Parse.User[];
    setParticipants(participants);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: -5
  }
})