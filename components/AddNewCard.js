import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { white, gray, darkGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import { addCardToDeck } from '../actions'

class AddNewCard extends Component {
    
    state = {
        question: '',
        answer: '',
        visible: false,
        hasError:false,
        toastMessage:'',
    }

    submit=()=> {
        const answer = this.state.answer 
        const question = this.state.question
        if (answer==='' || question === '') {
            this.setState({hasError:true})
            this.showToast('Entry should not be empty!')
            return
        }
        this.setState({hasError:false})
        const card = {answer:this.state.answer, question:this.state.question}
        let deck = this.props.navigation.state.params
        let title = deck.deck.title
        deck.deck.questions.push(card)
        const item = deck.deck
        this.props.addCardToDeck({title, item})
        this.showToast('New Card successfully added!')
        this.textQuestion.clear()
        this.textAnswer.clear()
        this.setState({answer:'', question:''})
        this.textQuestion.focus()
    }

    showToast=(msg)=> {
        this.setState({visible: true, toastMessage:msg})
        setTimeout(() => this.setState({
            visible: false
        }), 1500)
    }

    render() {

        const deck = typeof this.props.deck === 'string' ? Object.values(JSON.parse(this.props.deck)) : ''

        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20, paddingBottom:15}}>
                    <Text style={{fontWeight:'bold'}}>Question</Text>
                    <TextInput
                        autoFocus
                        style={styles.input}
                        placeholder="Type Question here!"
                        ref={input => { this.textQuestion = input }}
                        onBlur={() => this.textAnswer.focus()}
                        onSubmitEditing={() => this.textAnswer.focus()}
                        onChangeText={(question) => this.setState({question})}
                    />
                </View>
                <View style={{flex:1, paddingLeft:20, paddingTop:60, paddingRight:20}}>
                    <Text style={{fontWeight:'bold'}}>Answer</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type Answer here here!"
                        onBlur={() => this.submitButton.focus()}
                        onSubmitEditing={() => this.submitButton.focus()}
                        ref={input => { this.textAnswer = input }}
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