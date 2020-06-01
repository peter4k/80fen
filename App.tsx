import React from 'react';

import { appConfig } from './src/config';
import BaseNavigation from './src/baseNavigation';

var Parse = require('parse/react-native.js');
import { AsyncStorage } from 'react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(appConfig.appId, appConfig.key, appConfig.key);
Parse.serverURL = appConfig.serverUrl;

export default function App() {
  return <BaseNavigation />
};

async function test() {
  let user = new Parse.User();
  user.set("username", "test");
  user.set("password", "test");
  user.set("email", "yiwang27@outlook.com");

  try {
    await user.signUp();
    // Hooray! Let them use the app now.
    console.log("success");
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    console.log("Error: " + error.code + " " + error.message);
  }
}