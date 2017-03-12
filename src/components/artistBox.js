/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Share,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import {firebaseDatabase, firebaseAuth} from '../firebase'

export default class ArtistBox extends Component {

  state = {
    liked: false,
    likeCount: 0,
    commentCount: 0
  }

  componentWillMount() {
    const {uid} = firebaseAuth.currentUser;

    this.getArtistRef().on('value', snapshot => {
      const artist = snapshot.val();
      if(artist) {
        this.setState({
          likeCount: artist.likeCount ? artist.likeCount : 0,
          liked: artist.likes && artist.likes[uid],
          commentCount: artist.commentCount
        })
      }
    })
  }

  handlePress = () => {
    this.toggleLike()
  }

  getArtistRef = () => {
    const {id} = this.props.artist;
    return firebaseDatabase.ref(`artist/${id}`);
  }

  toggleLike = () => {
    const {uid} = firebaseAuth.currentUser;
    this.getArtistRef().transaction(function(artist) {
      if (artist) {
        if (artist.likes && artist.likes[uid]) {
          artist.likeCount--;
          artist.likes[uid] = null;
        } else {
          artist.likeCount++;
          if (!artist.likes) {
            artist.likes = {};
          }
          artist.likes[uid] = true;
        }
      }
      return artist || {
        likeCount: 1,
        commentCount: 0,
        likes: {
          [uid]: true
        }
      };
    });
  }

  shareArtist = () => {

    const { name, url } = this.props.artist

    Share.share({
      message: `Escucha a ${name}`,
      url: url,
      title: {name}
    }, {
      dialogTitle: {name},
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .catch((error) => console.log(error.message));
  }

  render() {
    const { image, name, comments } = this.props.artist
    const likeIcon = this.state.liked ?
      <Icon name="ios-heart" size={30} color="#e74c3c" /> :
      <Icon name="ios-heart-outline" size={30} color="gray" />

    const { likeCount, commentCount } = this.state;

    return (
      <View style={styles.artistBox}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.info}>
          <TouchableOpacity style={styles.share} onPress={this.shareArtist}>
            <Icon name="ios-share-outline" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.handlePress}>
                {likeIcon}
              </TouchableOpacity>
              <Text style={styles.count}>{likeCount}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="ios-chatboxes-outline" size={30} color="gray" />
              <Text style={styles.count}>{commentCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistBox: {
    backgroundColor: 'white',
    elevation: 4,
    flexDirection: 'row',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: .5,
    shadowOffset: {
      height: 4,
      width: 4
    }
  },
  image: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  share: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 15
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  count: {
    color: 'gray'
  }
});
