import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { white, gray, darkGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import {connect} from 'react-redux'
import { addNewDeck } from '../actions'

class AddNewDeck extends Component {
    
    state = {
        title: '',
        isVisible: false,
        textFocus: false,
        isError:false,
        message:''
    }

    submitNewDeck=()=> {
        const title = this.state.title
        if (title === '')
           {
               this.setState({isError:true})
               this.showToast('Title should not be empty!')
               return 
           }
        this.setState({isError:false})
        this.props.addNewDeck(title)
        //this.showToast('New Deck successfully added!')
        this.textDeckTitle.clear()
        this.setState({title:''})
        this.textDeckTitle.focus()
    }

    showToast=(msg)=> {
        this.setState(()=>({isVisible: true, message:msg}))
        setTimeout(() => this.setState({
            isVisible: false
        }), 1500)
    }

    componentDidMount() {
        this.textDeckTitle.focus()
        Keyboard.dismiss()
    }


    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, paddingLeft:20, paddingTop:40, paddingRight:20}}>
                    <Text style={{fontWeight:'bold', paddingBottom:10}}>Deck Title</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Type Deck title here"
                        ref={input => { this.textDeckTitle = input }}
                        onPress={()=>this.textDeckTitle.focus()}
                        onSubmitEditing={Keyboard.dismiss}
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