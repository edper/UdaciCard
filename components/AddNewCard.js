import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { white, gray, darkGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { addCardToDeck } from '../actions'
import { FormLabel, FormInput } from 'react-native-elements'

// Component for adding new card in a deck
class AddNewCard extends Component {
    
    // Component state
    state = {
        question: '',
        answer: '',
        visible: false,
        hasError:false,
        toastMessage:'',
    }

    // Event handler when user press the submit button
    submit=()=> {
        const answer = this.state.answer 
        const question = this.state.question
        // Check if answer or question is empty
        if (answer==='' || question === '') {
            // Inform user if empty
            this.setState({hasError:true})
            this.showToast('Entry should not be empty!')
            return
        }
        // Prepare data
        this.setState({hasError:false})
        const card = {answer:this.state.answer, question:this.state.question}
        let deck = this.props.navigation.state.params
        let title = deck.deck.title

        // Update array of questions
        deck.deck.questions.push(card)
        
        // Dispatch an action for adding a Card to a Deck         
        const item = deck.deck
        this.props.addCardToDeck({title, item})

        // Show toast and cleanup
        this.showToast('New Card successfully added!')
        this.textQuestion.refs.deckQuestion.clear()
        this.textAnswer.refs.deckAnswer.clear()
        this.setState({answer:'', question:''})
        this.textQuestion.refs.deckQuestion.focus()
    }

    // Show toast function
    showToast=(msg)=> {
        this.setState({visible: true, toastMessage:msg})
        setTimeout(() => this.setState({
            visible: false
        }), 1500)
    }

    // make sure that when component mounts Question entry is on focus
    componentDidMount() {
        this.textQuestion.refs.deckQuestion.focus()
    }

    render() {

        const deck = typeof this.props.deck === 'string' ? Object.values(JSON.parse(this.props.deck)) : ''

        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20, paddingBottom:15}}>
                    <FormLabel>QUESTION</FormLabel>
                    <FormInput 
                        placeholder="Type Question here"
                        style={styles.input}                        
                        ref={input => { this.textQuestion = input }}
                        textInputRef='deckQuestion'
                        onBlur={() => this.textAnswer.focus()}
                        onSubmitEditing={() => this.textAnswer.focus()}
                        onChangeText={(question) => this.setState({question})}
                    />
                </View>
                <View style={{flex:1, paddingLeft:20, paddingTop:60, paddingRight:20}}>
                    <FormLabel>ANSWER</FormLabel>
                    <FormInput 
                        placeholder="Type Answer here"
                        style={styles.input}                        
                        ref={input => { this.textAnswer= input }}
                        textInputRef='deckAnswer'
                        onBlur={() => this.submitButton.focus()}
                        onSubmitEditing={() => this.submitButton.focus()}
                        onChangeText={(answer) => this.setState({answer})}
                    />
                </View>
                <View style={{flex:6, paddingTop:60}}>                                
                    <TouchableOpacity onPress={this.submit} style={styles.button} 
                     ref={input => { this.submitButton = input }}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2, marginBottom:200, marginLeft:60}}>
                    {this.state.visible && 
                        <Text style={[{color:white,backgroundColor:(this.state.hasError?'red':darkGray)},styles.toastSave]}>
                            {this.state.toastMessage}
                        </Text>
                    }
                </View>
                
            </View>            
        )
    }

}

const styles = StyleSheet.create({
    input: {
        height:70,
        fontSize:20,
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
    toastSave: {
        height:60,
        width:300,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
        paddingLeft:50
    }

})

function mapStateToProps(decks) {
    return {
        decks: decks,
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