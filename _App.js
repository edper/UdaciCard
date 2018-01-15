import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
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
          <View>
            <StatusBar translucent barStyle='light-content' backgroundColor='#ffebcd'/>
          </View>          
          <View style={styles.header}>
            {/*<Text style={[styles.headerText,{color:white}]}>Udaci Cards</Text>*/}
           {/*<Image style={{width: '100%', height: '100%'}} source={require('./utils/img/index-card.jpeg')} />*/}
              <View style={{flex:1,alignItems:'flex-start'}}>
                <MaterialCommunityIcons 
                name='cards-outline'
                size={70}
                style={{color:white, marginLeft:20, marginTop:12}}
                />
              </View>
              <View style={{flex:1, marginLeft:150, marginTop:-40}}>
                <Text style={{color:white, fontSize:20 }}>Udaci Cards</Text>
              </View>
          </View>
          <View style={styles.content}>
              <CategoryCard />
          </View>
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
