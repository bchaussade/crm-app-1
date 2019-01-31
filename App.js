/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

 import firebase from 'firebase';
import Login from './src/Login';
import Loader from './src/Loader';
 import {Provider} from 'react-redux';
 import { createStore} from 'redux';
 import reducers from './src/reducers/PeopleReducer';
import MainNavigator from './src/Navigation';


const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());





export default class App extends Component {

  state = {loggedIn: null};


  componentWillMount(){
    firebase.initializeApp(
      {
        apiKey: "AIzaSyAE9XIFxAON1UrkQx4Miw_3cXy6fSm7CtQ",
        authDomain: "crmapp-d2efb.firebaseapp.com",
        databaseURL: "https://crmapp-d2efb.firebaseio.com",
        projectId: "crmapp-d2efb",
        storageBucket: "crmapp-d2efb.appspot.com",
        messagingSenderId: "766221982242"
      }
    );  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });

      } else {
        this.setState({
          loggedIn:false
        })
      }
    });
  }
  renderInitialView(){
    switch (this.state.loggedIn) {
      case true:
      return <MainNavigator />
      case false:
      return <Login/>
     default:
     return <Loader size="large" />;

    }
  }
  render() {
    return (
      <Provider store={store}>

           
         {this.renderInitialView()}
         
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
 
});