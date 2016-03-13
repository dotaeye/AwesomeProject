'use strict'

import React, {
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PropTypes
  } from 'react-native'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '123@qq.com',
      password: 'Shj880101~'
    }
  }

  componentDidMount() {
  }

  onLogin() {
    const {authActions}=this.props;
    let data=Object.assign({}, {'grant_type': 'password'}, this.state);
    authActions.login(data);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            />

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />

          <TouchableOpacity
            onPress={this.onLogin.bind(this)}
            >
            <Text style={styles.submit}>Submit</Text>
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
  form: {
    padding: 10
  },
  input: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 4,
    padding: 3
  },

  submit: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 4,
  }

});
