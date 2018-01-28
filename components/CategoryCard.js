import React, {Component} from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {connect} from 'react-redux'
import {getAllDecks, initializeData} from '../actions'
import {List, ListItem} from 'react-native-elements'
import { StyleSheet, Text, View, FlatList, StatusBar  } from 'react-native'
import { white, gray, lightGray, lightPurp, black, purple, lightBlue } from '../utils/colors'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import ListViewCards from './ListViewCards'
import QuizStack from './QuizStack'
import QuizView from './QuizView'
import AddNewCard from './AddNewCard'
import AddNewDeck from './AddNewDeck'
import { setLocalNotification } from '../utils/helper'


const Quiz = ({ navigation }) => (
    <QuizStack navigation={navigation}/>
)

const QuizShow = ({ navigation }) => (
    <QuizView navigation={navigation}/>
)

const HomeView = ({ navigation }) => (
    <ListViewCards navigation={navigation}/>
)

const AddCard = ({ navigation }) => (
    <AddNewCard navigation={navigation}/>
)

const AddDeck = ({ navigation }) => (
    <AddNewDeck navigation={navigation} hasFocus={true}/>
)

const headerLogo = () => (
    <View style={[styles.header,{marginTop:1}]}>
        <View>
            <StatusBar translucent barStyle='light-content' backgroundColor='#ffebcd'/>
        </View>          
        <View style={{alignItems:'flex-start'}}>
            <MaterialCommunityIcons 
            name='cards-outline'
            size={70}
            style={{color:white, marginLeft:20, marginTop:-20}}
            />
        </View>
        <View style={{marginLeft:150, marginTop:-40}}>
            <Text style={{color:white, fontSize:20 }}>Udaci Cards</Text>
        </View>
    </View>
)

const Tabs = TabNavigator({
    HomeView : {
      screen: HomeView,
      navigationOptions : {
        tabBarLabel: 'Home',
        header: headerLogo,
        tabBarIcon: ({tintColor}) => <Ionicons name='md-home' size={30} color={tintColor} />,
    },
    },
    AddDeck : {
        screen: AddDeck,
        navigationOptions : {
          tabBarLabel: 'Add Deck',
          header: headerLogo,
          tabBarIcon: ({tintColor}) => <Ionicons name='md-add-circle' size={30} color={tintColor} />,
        },
      },
})

const Stack = StackNavigator({
    Home: {
        screen: Tabs,
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Udaci Cards',
            headerStyle:{backgroundColor:purple},
            headerTitleStyle:{color:white}
        },
    },
    QuizShow: {
        screen: QuizShow,
        navigationOptions: {
            title: 'Udaci Cards - Quiz View',
            headerStyle:{backgroundColor:purple},
            headerTitleStyle:{color:white}
        },
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Udaci Cards - Adding card',
            headerStyle:{backgroundColor:purple},
            headerTitleStyle:{color:white}
        },
    },
})


class CategoryCard extends Component {

    componentDidMount(){
        //this.props.initializeData()
        this.setState({ decks : this.props.getAllDecks() })
        setLocalNotification()
    }

    render() {

        const decks = typeof this.props.decks === 'string' ? Object.values(JSON.parse(this.props.decks)) : ''
        return(
            <Stack />
        )
    
    }
  

}

function mapStateToProps(decks) {
    return {
        decks: decks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDecks: () => dispatch(getAllDecks()),
        //initializeData: () => dispatch(initializeData())
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryCard)


const styles = StyleSheet.create({
    header : {
      flex:0.17,
      backgroundColor: purple,
      justifyContent:'center',
      alignItems:'flex-start',
    },
});
  
