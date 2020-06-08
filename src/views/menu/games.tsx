import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Parse from 'parse/react-native';

import { TextStyle, ContainerStyle, ColorStyle } from '../../style';
import LoadingOverlay from '../components/loadingOverlay';
import GameParticipants from './gamesParticipants';
import { ThemeColors } from '../../constant/color';

interface IGameProps {
  navigation: any;
}

export default function Games({ navigation }: IGameProps) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [games, setGames] = React.useState<Parse.Object[]>([]);

  useEffect(() => { getGames() }, []);

  return (
    <View>
      <Text style={[TextStyle.sectionTitle]}>
        继续游戏
      </Text>
      {games.length === 0 ? renderEmpty() : renderGames()}
      <LoadingOverlay show={isLoading} />
    </View>
  );

  function renderEmpty() {
    return (
      <View style={[ContainerStyle.shadowContainerLight]}>
        <Text style={[TextStyle.h4, ColorStyle.demoted, { marginVertical: 10 }]}>
          还没有游戏
        </Text>
      </View>
    );
  }

  function renderGames() {
    return games.map(game => {
      const relation = game.relation("participants");
      return (
        <TouchableOpacity
          style={[ContainerStyle.shadowContainerLight, ContainerStyle.padding, styles.gameContainer]}
          onPress={() => navigation.navigate("game", { game })}
          key={game.id}
        >
          <View>
            <Text style={[TextStyle.bold, TextStyle.h5, ColorStyle.textColorLight, {}]}>
              找朋友 · {game.get("levelUpScore")}分升级
            </Text>
            <GameParticipants game={game} />
          </View>

          <AntDesign name="right" size={30} color={ThemeColors.primary} />
        </TouchableOpacity>
      );
    })
  }

  async function getGames() {
    const game = Parse.Object.extend("Game")
    const query = new Parse.Query(game);
    const games = await query.find();
    setIsLoading(false);
    setGames(games);
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})