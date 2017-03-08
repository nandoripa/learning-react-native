/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import {firebaseDatabase, firebaseAuth} from '../firebase'

import ArtistBox from '../components/artistBox'
import CommentList from '../components/commentList'

export default class ArtistDetailView extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment);
  }

  addComment = (data) => {
    const comment = data.val();
    this.setState({
      comments: this.state.comments.concat(comment)
    })
  }

  handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push()
    newCommentRef.set({
      text,
      userPhoto: photoURL
    });
    this.setState({ text:'' })
  }

  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text) => this.setState({text})

  render() {

    const artist = this.props.artist;
    const {comments} = this.state;

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <Text style={styles.header}>Comentarios</Text>
        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 70,
  },
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  }
});
