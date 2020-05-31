import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ContainerStyle, TextStyle, ColorStyle } from '../style';
import { ThemeColors } from '../constant/color';

export default function App() {

  const [value, onChangeText] = React.useState("");

  return (
    <View style={[ContainerStyle.containerBase, styles.container]}>
      <Text style={[TextStyle.h1, TextStyle.bold, ColorStyle.primary, styles.title]}>登录</Text>
      <View style={[{ marginBottom: 20 }, inputContainerStyle]}>
        <TextInput
          style={[{ height: 40, borderColor: 'gray' }, ContainerStyle.shadowContainer]}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="用户名"
        />
      </View>
      <View style={inputContainerStyle}>
        <TextInput
          style={[{ height: 40, borderColor: 'gray' }, ContainerStyle.shadowContainer]}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="密码"
        />
      </View>
      <TouchableOpacity
        style={[
          ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimaryLite, ContainerStyle.shadowContainer, ContainerStyle.padding, ContainerStyle.roundedCorner,
          { marginTop: 70 }]}
        onPress={() => { }}
      >
        <View style={{height:40, justifyContent: 'center'}}>
          <Text style={ColorStyle.white}>Press Here</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 50
  },
  container: {
    paddingLeft: 50,
    paddingRight: 50
  },
  inputContainer: {
    alignSelf: 'stretch'
  }
});

const inputContainerStyle = [ContainerStyle.shadowContainer, ContainerStyle.padding, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner, styles.inputContainer];
