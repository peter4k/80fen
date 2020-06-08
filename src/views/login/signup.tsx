import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Parse from 'parse/react-native';

import { ContainerStyle, TextStyle, ColorStyle } from '../../style';
import LoadingOverlay from '../components/loadingOverlay';
import AuthContext from '../../authContext';

export default function App({ navigation }: any) {

  const [username, onChangeUsername] = React.useState("");
  const [nickname, onChangeNickname] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [password2, onChangePassword2] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const setIsSignedIn = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[ContainerStyle.containerBase, styles.container]}>
        <Text style={[TextStyle.h1, TextStyle.bold, ColorStyle.primary, styles.title]}>注册新账户</Text>
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
        <View style={[{ marginBottom: 20 }, inputContainerStyle]}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangeNickname(text)}
            value={nickname}
            placeholder="中文昵称"
          />
        </View>
        <View style={[{ marginBottom: 20 }, inputContainerStyle]}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangeEmail(text)}
            value={email}
            placeholder="邮箱"
            autoCapitalize="none"
            autoCompleteType="email"
          />
        </View>
        <View style={[{ marginBottom: 20 }, inputContainerStyle]}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="密码"
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
        <View style={inputContainerStyle}>
          <TextInput
            style={[{ height: 40, borderColor: 'gray' }]}
            onChangeText={text => onChangePassword2(text)}
            value={password2}
            placeholder="确认密码"
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, ContainerStyle.shadowContainerLight, ContainerStyle.shadowContainerLight, ContainerStyle.backgroundPrimaryExtraLite, ContainerStyle.paddingSmall, ContainerStyle.roundedCorner]}
          onPress={signUp}
        >
          <View style={{ height: 40, justifyContent: 'center' }}>
            <Text style={[ColorStyle.primary, TextStyle.h5, TextStyle.bold]}>注册</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.navigate('login')}>
          <Text style={ColorStyle.demoted}>已有账户？</Text>
          <Text style={ColorStyle.primary}>登录</Text>
        </TouchableOpacity>
        <LoadingOverlay show={isLoading} />
      </View>
    </TouchableWithoutFeedback>
  );

  async function signUp() {
    if (!verifyInput()) {
      return;
    }

    setIsLoading(true);

    let user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("nickname", nickname);
    user.set("color", assignColor());

    try {
      await user.signUp();
      console.log("registration succes");
      setIsSignedIn(true);
    } catch (error) {

      console.log(error.message)

      //处理invalid token
      if (error.code === 209) {
        Parse.User.logOut();
        signUp();
        return;
      }

      Alert.alert("出错了，请联系王总。错误码: " + error.code);
    }

    setIsLoading(false);
  }

  function verifyInput(): boolean {
    if (!password || !password2 || !username || !email) {
      Alert.alert("请输入所有内容");
      return false;
    }

    if (password !== password2) {
      Alert.alert("密码不匹配");
      return false;
    }

    return true;
  }

  function assignColor() {
    const colors = ["red", "pink", "purple", "green", "indigo", "blue", "cyan", "teal", "lime", "yellow", "amber", "orange"]
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
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
