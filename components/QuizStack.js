import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue } from '../utils/colors'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { getAllDecks } from '../actions'

// Component for Showing a specific Deck ready for Quiz or Adding a Card
class QuizStack extends Component {

    // Navigate to Quiz proper when user press Start Quiz
    gotoQuizView=(deck)=>(
        this.props.navigation.navigate('QuizShow',{deck:deck})
    )

    // Navigate to adding a Card to a Deck when user press Add Card
    gotoAddCard=(deck)=> (
        this.props.navigation.navigate('AddCard',{deck:deck})        
    )

    // Make sure state for all decks is updated
    componentDidMount() {
        this.props.getAllDecks()
    }
    
    render() {
        const {title} = this.props.navigation.state.params
        const deck = JSON.parse(this.props.decks)[title]
        return (
            <View style={{flex:10, flexDirection:'column', justifyContent:'center'}}>
                <View style={{flex:8, marginTop:40, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}}>
                    <Text style={{fontSize:36, color:black, fontWeight:'bold'}}>{deck.title}</Text>
                    <Text style={{fontSize:24, color:gray, fontStyle:'italic'}}>{deck.questions.length} {deck.questions.length>1?'cards':'card'}</Text>
                </View>
                <View style={{flex:1, justifyContent:'flex-start'}}>
                    <Button
                        raised
                        backgroundColor={white}
                        color={black}
                        icon={{name: 'add-circle-outline', color:black}}
                        onPress={()=>this.gotoAddCard(deck)}
                        title='Add Card' />

                </View>
                { deck.questions.length >0  && 
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                        <Button
                            raised
                            backgroundColor={lightPurp}
                            icon={{name: 'play-circle-outline'}}
                            onPress={()=>this.gotoQuizView(deck)}
                            title='Start Quiz' 
                            />
                    </View>
                }
            </View>            
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
)(QuizStack)


