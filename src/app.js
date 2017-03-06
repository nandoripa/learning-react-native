/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

import LoginView from './views/loginView';
import HomeView from './views/homeView';
import ArtistDetailView from './views/artistDetailView';

export default class PlatziMusic extends Component {

  render() {
    const isAndroid = Platform.os === 'Android';

    return (
      <Router>
        <Scene key="login" component={LoginView} hideNavBar/>
        <Scene key="root">
          <Scene key="home" component={HomeView} title="PlatziMusic" hideNavBar={isAndroid}/>
          <Scene key="artistDetail" component={ArtistDetailView} backTitle="PlatziMusic" getTitle={this.props.title} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
