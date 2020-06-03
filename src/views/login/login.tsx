import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Parse from 'parse/react-native';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import LoadingOverlay from '../components/loadingOverlay';
import AuthContext from '../../authContext';

export default function App({ navigation }: any) {

  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const setIsSignedIn = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[ContainerStyle.containerBase, styles.container]}>
        <Text style={[TextStyle.h1, TextStyle.bold, ColorStyle.primary, styles.title]}>登录</Text>
        <View style={[{ marginBottom: 20 }, inputContainerStyle]}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangeUsername(text)}
            value={username}
            placeholder="用户名"
            autoCapitalize="none"
            autoCompleteType="username"
          />
        </View>
        <View style={inputContainerStyle}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="密码"
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, ContainerStyle.shadowContainer, ContainerStyle.backgroundPrimaryExtraLite, ContainerStyle.shadowContainerLight, ContainerStyle.paddingSmall, ContainerStyle.roundedCorner]}
          onPress={login}
        >
          <View style={{ height: 40, justifyContent: 'center' }}>
            <Text style={[ColorStyle.primary, TextStyle.h5, TextStyle.bold]}>登录</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.navigate('signup')}>
          <Text style={ColorStyle.demoted}>还没有账户？</Text>
          <Text style={ColorStyle.primary}>注册</Text>
          <Text style={ColorStyle.demoted}>新账户</Text>
        </TouchableOpacity>
        <LoadingOverlay show={isLoading} />
      </View>
    </TouchableWithoutFeedback>
  );

  async function login() {
    if (!password || !username) {
      Alert.alert("请输入所有内容");
      return false;
    }

    setIsLoading(true);

    try {
      await Parse.User.logIn(username, password);
      console.log("login success");
      setIsSignedIn(true);
    } catch (error) {
      if (error.code === 101) {
        Alert.alert("用户名密码错误");
      } else {
        Alert.alert("出错了，请联系王总。错误码: " + error.code);
      }

      console.log(error.code, error.message);
    }


    setIsLoading(false);
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 50
  },
  container: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  inputContainer: {
    alignSelf: 'stretch'
  },
  loginButton: {
    marginTop: 100,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  signUpContainer: {
    marginTop: 20,
    flexDirection: "row"
  }
});

const inputContainerStyle = [ContainerStyle.shadowContainerLight, ContainerStyle.paddingSmall, ContainerStyle.backgroundWhite, ContainerStyle.roundedCorner, styles.inputContainer];
