import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { white, gray, darkGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import {connect} from 'react-redux'
import { addNewDeck } from '../actions'
import { FormLabel, FormInput } from 'react-native-elements'

// Component for adding new Deck
class AddNewDeck extends Component {
    
    // Component state
    state = {
        title: '',
        isVisible: false,
        textFocus: false,
        isError:false,
        message:''
    }

    // Event handler when user press the submit button
    submitNewDeck=()=> {
        const title = this.state.title
        // Check if title is empty
        if (title === '')
        {
            // Inform user if empty
            this.setState({isError:true})
            this.showToast('Title should not be empty!')
            return 
        }

        // Dispatch an action for adding a Card        
        this.setState({isError:false})
        this.props.addNewDeck(title)
        
        // Show toast and cleanup
        this.showToast('New Deck successfully added!')
        this.textDeckTitle.refs.deckTitle.clear()
        this.setState({title:''})
        this.textDeckTitle.refs.deckTitle.focus()
    }

    // Show toast function
    showToast=(msg)=> {
        this.setState(()=>({isVisible: true, message:msg}))
        setTimeout(() => this.setState({
            isVisible: false
        }), 1500)
    }

    // make sure that when component mounts Title entry is on focus
    componentDidMount() {
        this.textDeckTitle.focus()
        Keyboard.dismiss()
    }


    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20}}>
                    <FormLabel>DECK TITLE</FormLabel>
                    <FormInput 
                        placeholder="Type Deck title here"
                        style={styles.inputText} 
                        ref={input => { this.textDeckTitle = input }}
                        textInputRef='deckTitle'
                        onChangeText={(title) => this.setState({title:title})}
                    />
                </View>
                <View style={{flex:6, paddingTop:60}}>                                
                    <TouchableOpacity onPress={this.submitNewDeck} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2, marginBottom:200, marginLeft:60}}>
                    {this.state.isVisible && 
                        <Text style={[{color:white,backgroundColor:(this.state.isError?'red':darkGray)},styles.toastSave]}>
                            {this.state.message}
                        </Text>
                    }
                </View>
            </View>            
        )
    }

}

const styles = StyleSheet.create({
    inputText: {
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
        addNewDeck: (title) => dispatch(addNewDeck(title)),
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewDeck)