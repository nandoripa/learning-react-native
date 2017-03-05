/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';

import ArtistBox from './artistBox'

export default class ArtistList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }

  componentDidMount() {
    this.updateDataSource(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.artists !== this.props.artists) {
      this.updateDataSource(newProps);
    }
  }

  updateDataSource(data) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data.artists)})
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(artist) => <ArtistBox artist={artist}/>}
        />
    );
  }
}
