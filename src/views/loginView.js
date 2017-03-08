/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase, {firebaseAuth} from '../firebase';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

const {FacebookAuthProvider} = firebase.auth;

export default class LoginView extends Component {

  state = {
    credentials: null
  }

  componentWillMount() {
    this.authenticateUser();
  }

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const {accessToken} = data;
      const credential = FacebookAuthProvider.credential(accessToken);

      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        Actions.root();
      }, function(error) {
        console.log("Sign In Error", error);
      });
    })
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      console.error(error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.authenticateUser();
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
        <LoginButton
          readPermissions={['public_profile','email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20
  }
});
