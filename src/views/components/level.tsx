import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextStyle } from '../../style';

export default function ({ level }: any) {
  const levelInt = parseInt(level);
  if (levelInt >= 10) {
    switch (levelInt) {
      case 11:
        level = "J";
        break;
      case 12:
        level = "Q";
        break;
      case 13:
        level = "K";
        break;
      case 14:
        level = "A";
        break;
      default:
        level = levelInt.toString();
        break;
    }
  }
  return (
    <Text style={TextStyle.h4}>{level}</Text>
  )
}