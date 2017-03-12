import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
var TimeAgo = require('react-native-timeago');
require('moment/locale/es');

const DEFAULT_AVATAR = 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png';
const AVATAR_SIZE = 32;

const Comment = (props) =>
  <View style={styles.container}>
    <View style={styles.comment}>
      {
        props.avatar ?
          <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
          <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
      }
      <Text style={styles.text}>{props.text}</Text>
    </View>
    <TimeAgo style={styles.date} time={props.date} />
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    padding: 10,
    margin: 5,
    marginHorizontal: 7,
    borderRadius: 10
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE/2,
  },
  text: {
    fontSize: 16,
    marginLeft: 10
  },
  date: {
    fontSize: 13,
    textAlign: 'right'
  }
});

export default Comment
