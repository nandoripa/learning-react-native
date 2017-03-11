/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import ArtistList from '../components/artistList'
import {getArtists} from '../apiClient'

export default class HomeView extends Component {

  state = {
    artists: null
  }

  componentDidMount() {
    getArtists().then(data => this.setState({artists: data}));
  }

  render() {

    const artists = this.state.artists;

    return (
      <View style={styles.container}>
        {artists && <ArtistList artists={artists}/>}
        {!artists && <ActivityIndicator size="large"/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.select({
      ios: 70,
      android:60
    }),
  }
});
