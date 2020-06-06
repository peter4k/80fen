import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ContainerStyle, TextStyle } from '../../style';

export default function NewGameRow({ route, navigation }: any) {

  const game = route.params.game;
  const [count, setCount] = React.useState(0);
  const [beginningTime] = React.useState(new Date());
  const [timeDiff, setTimeDiff] = React.useState("");
  const relation = game.relation("row");

  useEffect(() => {
    setInterval(() => getTime(), 500);
    (async function () {
      const count = await relation.query().count();
      setCount(count);
    })();
  })

  console.log(beginningTime);

  return (
    <SafeAreaView>
      <View style={ContainerStyle.padding}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[TextStyle.h3]}>
            第{count}局游戏 · {timeDiff}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )

  function getTime() {
    const currentTime = new Date();
    //@ts-ignore
    let msec = currentTime - beginningTime;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    let time = ss.toString();
    if(mm) time = mm + ":" + time;
    else time = "00:" + time;
    if(hh) time = hh + ":" + time;
    setTimeDiff(time);
  }
}