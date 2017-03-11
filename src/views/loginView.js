/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
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
      <Image style={styles.container} source={require('../../resources/background.jpg')}>
        <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
        <Image style={styles.logo} source={require('../../resources/logo.png')} />
        <LoginButton
          readPermissions={['public_profile','email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  welcome: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20
  }
});
