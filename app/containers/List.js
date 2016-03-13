'use strict'

import React, {
  Component,
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  PropTypes
  } from 'react-native'

import configs from '../configs';

export default class List extends Component {

  constructor(props) {
    super(props)

  }

  onLogOut(){
    this.props.authActions.logout();
  }

  render() {
    let listItem = [];
    for (let i = 0; i < 80; i++) {
      listItem.push('text item ' + i + ' oasjfodhw');
    }
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.navBg} ref="navBg"></View>
          <Text>Your Position</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {listItem.map((item, key)=> {
            return (
              <Text key={key}>Scroll View {item}</Text>
            )
          })}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.onLogOut.bind(this)}
            >
            <Text style={styles.submit}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  nav: {
    height: 36,
    backgroundColor: 'rgb(255,200,80)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBg: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'rgb(118,134,165)',
  },
  footer: {
    height: 40,
    backgroundColor: 'rgb(225,134,177)',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  submit: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
  }
});