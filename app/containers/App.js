'use strict'

import React, {
  Component,
  Navigator,
  View,
  AsyncStorage,
  Text,
  StyleSheet,
  PropTypes
  } from 'react-native'


import {connect} from 'react-redux/native'
import configs from '../configs';
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/auth'
import SplashScreen from '@remobile/react-native-splashscreen';
import Login from './Login'
import List from './List';


class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    SplashScreen.hide();
  }

  componentWillMount() {
    console.log(configs.authToken);
    AsyncStorage.getItem(configs.authToken).then(res=>JSON.parse(res)).then(token=> {
      this.props.authActions.loadAuthToken(token)
    });
  }

  componentWillReceiveProps(newProps) {
    //login
    if (!this.props.auth.token && newProps.auth.token) {
      this.navigator.push({
        name: 'List',
        component: List
      })
    }
    //logout
    if (this.props.auth.token && !newProps.auth.token) {
      this.navigator.push({
        name: 'Login',
        component: Login
      })
    }
  }

  renderScene(route, navigator) {
    if (route.component) {
      const Component = route.component
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  }

  render() {
    const {auth}=this.props;
    let pageComponent = {
      name: 'Login',
      component: Login
    };
    return (
      <Navigator
        ref={view=>this.navigator=view}
        initialRoute={pageComponent}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
        renderScene={this.renderScene.bind(this)}
        />
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
    backgroundColor: 'rgb(225,134,177)'
  }
});

App.propTypes = {
  auth: PropTypes.object,
  authActions: PropTypes.object
};


export default connect(state => {
  return {
    auth: state.auth
  }
}, dispatch => {
  return {
    authActions: bindActionCreators(Object.assign({}, authActions), dispatch)
  }
})(App)