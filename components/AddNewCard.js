import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { addCardToDeck } from '../actions'

class AddNewCard extends Component {
    state = {
        question: '',
        answer: '',
        visible: true,
    }
    submit=()=> {
        if (this.state.question === '' || this.state.answer==='')
            {
                this.setState({visible:true})
                return
            }
        const card = {answer:this.state.answer, question:this.state.question}
        let deck = this.props.navigation.state.params
        let title = deck.deck.title
        deck.deck.questions.push(card)
        console.log("Deck = ",deck.deck)
        console.log("Deck Title ", deck.deck.title)
        this.props.addCardToDeck(deck.deck.title, deck.deck)
        this.textQuestion.clear()
        this.textAnswer.clear()
    }

    render() {

        const deck = typeof this.props.deck === 'string' ? Object.values(JSON.parse(this.props.deck)) : ''

        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20}}>
                    <Text style={{fontWeight:'bold'}}>Question</Text>
                    <TextInput
                        autoFocus
                        style={styles.input}
                        placeholder="Type Question here!"
                        ref={input => { this.textQuestion = input }}
                        onChangeText={(question) => this.setState({question})}
                    />
                </View>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20}}>
                    <Text style={{fontWeight:'bold'}}>Answer</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type Answer here here!"
                        ref={input => { this.textAnswer = input }}
                        onChangeText={(answer) => this.setState({answer})}
                    />
                </View>
                <View style={{flex:8, paddingTop:40}}>                                
                    <TouchableOpacity onPress={this.submit} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        )
    }

}

const styles = StyleSheet.create({
    input: {
        height:60,
        fontSize:22,
        borderRadius:7,
        padding:20,
        borderWidth:1,
        borderColor:black,
    },
    button:{
        backgroundColor: purple,
        padding: 10,
        borderRadius:5,
        margin:20,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color: white,
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
    },
})

function mapStateToProps(deck) {
    return {
        deck: deck,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (title,card) => dispatch(addCardToDeck(title,card)),
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewCard)