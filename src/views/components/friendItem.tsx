import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextStyle, ColorStyle } from '../../style';
import { BaseColors } from '../../constant/color';

interface IFriendItemProps {
  friend: Parse.User;
}

export default function FriendItem(props: IFriendItemProps) {

  const color: string = props.friend.get("color");
  //@ts-ignore
  let colorStyle = BaseColors[color];
  colorStyle = colorStyle || BaseColors['grey'];
  const style = [styles.container, {backgroundColor: colorStyle[500]}];
  return (
    <View style={style}>
      <Text style={[TextStyle.bold, TextStyle.h4, ColorStyle.white]}>
        {props.friend.get("nickname")[0]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
});