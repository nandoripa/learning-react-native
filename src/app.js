/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import ArtistList from './artistList'
import {getArtists} from './apiClient'

export default class PlatziMusic extends Component {

  state = {
    artists: []
  }

  componentDidMount() {
    getArtists().then(data => this.setState({artists: data}));
  }

  render() {

    const artists = this.state.artists;
    
    return (
      <View style={styles.container}>
        <ArtistList artists={artists}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 20,
  }
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
