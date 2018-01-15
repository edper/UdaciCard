import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {white, purple, blue, black, pink} from './utils/colors'
import { Constants } from 'expo'
import  CategoryCard from './components/CategoryCard'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class App extends React.Component {
  
  render() {
    
    return (
      
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={styles.container}>
            <CategoryCard />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header : {
    flex:1,
    backgroundColor: purple,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingTop:10,
  },
  headerText : {
    fontSize:16,
    fontWeight:'bold',
  },
  content: {
    flex:6,
    padding:10,
  }
});
