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

export default class PlatziMusic extends Component {

  render() {

    const artist = {
      image: 'https://lastfm-img2.akamaized.net/i/u/300x300/31a51f6e3ec647c8997150ec837891c7.png',
      name: 'David Bowie',
      likes: 200,
      comments: 140
    };
    const artists = Array(10).fill(artist);

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
