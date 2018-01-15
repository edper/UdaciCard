import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'
import QuizStack from './QuizStack'
import {connect} from 'react-redux'
import {getAllDecks} from '../actions'
import {List, ListItem} from 'react-native-elements'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


const Quiz = () => {
    <QuizStack />
}

const Home = ({ navigation }) => (
    <List>
    {typeof this.state.decks === 'string' && 
        <FlatList
            data={Object.values(JSON.parse(this.props.decks))}
            renderItem={({item,index}) => (
                <ListItem
                roundAvatar
                title={`${item.title}`}
                titleStyle={{fontWeight:'bold', color:white}}
                chevronColor={black}
                containerStyle={{ borderTopColor:white, height:65, paddingTop:18, marginTop:10, backgroundColor:'#3d36b2'}}
                key={index}
                badge={{value:item.questions.length, textStyle:{color:white}, containerStyle:{backgroundColor:lightPurp, marginTop:3} }}
                rightIcon={{style:{fontSize:28, color:white}}}
                onPress={this.props.navigation.navigate('Quiz')}
                onPressRightIcon={this.props.navigation.navigate('Quiz')}
                />
            )}
            keyExtractor={deck => deck.title}
        />
    }
</List>

)

const Stack = StackNavigator({
    Home: {
        screen: Home
    },
    Quiz: {
        screen: Quiz
    }
})


class CategoryCard extends Component {

    componentDidMount(){
        this.setState({ decks : this.props.getAllDecks() })
    }

    render() {

        const decks = typeof this.props.decks === 'string' ? Object.values(JSON.parse(this.props.decks)) : ''
        //const categories = typeof this.props.decks === 'string' ? Object.keys(JSON.parse(this.props.decks)) : ''
        //let folderCtr = 0, direction = 'row'    
        return(
            
            <Stack />
            //<View style={styles.containerCol}>
            //    {decks !== '' && categories.map((category)=>(
            //        <View style={styles.containerRow} key={category}>        
            //            <View style={styles.folderRow} key={category}>
            //                <View style={{flex:1,flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            //                    <Text style={{fontSize:18, color:black}}>{category}</Text>
            //                    <Text style={{fontSize:14, color:gray}}>{`Questions ${decks[category].questions.length}`}</Text>
            //                </View>                            
            //            </View>                
            //        </View>
            //        ))
            //    }
            //</View>
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
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryCard)

