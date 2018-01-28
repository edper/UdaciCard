import React, {Component} from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import { Button } from 'react-native-elements'
import { 
    clearLocalNotification,
    setLocalNotification } from '../utils/helper'

class QuizView extends Component {
    state = {
        deck:null,
        currentCard:0,
        flipSide:false,
        endOfQue:false,
        correctCard:0,
        animatedValue: new Animated.Value(0),
        spinValue: new Animated.Value(0),
    }

    componentWillMount() {
        this.setState(()=>({deck:this.props.navigation.state.params}))
        clearLocalNotification()
        setLocalNotification()       
    }

    animateFlip=()=> {
        this.state.animatedValue.setValue(0)
        Animated.timing(
            this.state.animatedValue,
            {
              toValue: 1,
              duration: 1500,
              easing: Easing.bounce
            }
          ).start()
    }

    animateSpin=()=> {
        this.state.spinValue.setValue(0)
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }

    flipCard=()=> {
        this.animateFlip()
        this.setState({flipSide:true})
    }

    scoreCorrect=()=>{
        this.setState({correctCard:this.state.correctCard+1})
        this.goNextCard()
    }

    goNextCard=()=> {
        this.animateFlip()
        if ((this.state.currentCard+1)===this.state.deck.deck.questions.length)
             {
                 this.setState({endOfQue:true})
                 this.animateSpin()
             }
        else
            this.setState({currentCard:this.state.currentCard+1, flipSide:false})
    }

    goBack=()=> {
        this.props.navigation.navigate('Home')
    }

    goReplay=()=> {
        this.setState({
            currentCard:0,
            flipSide:false,
            endOfQue:false,
            correctCard:0,
        })
    }
    
    render() {
        const flipSide = this.state.flipSide
        const endOfQue = this.state.endOfQue
        const rotateX = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '90deg', '0deg']
        })
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={{flex:1, flexDirection:'row'}}>
                {
                    !endOfQue ?
                        (!flipSide 
                        // Front side of the card/deck
                        ?         
                            <Animated.View style={[{flex:10}, {transform: [{rotateX}]}]}>
                            { this.state.deck !== null &&
                                <View style={{flex:9, marginTop:5, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}}>
                                    <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-start'}}>
                                        <Text style={{fontSize:22, color:gray, fontWeight:'bold'}}>{this.state.currentCard+1} of {this.state.deck.deck.questions.length}</Text>
                                    </View>
                                    <View style={{flex:8, justifyContent:'center', alignItems:'center' , paddingLeft:20,paddingRight:20}}>
                                        <Text style={{fontSize:28, color:purple, fontWeight:'bold'}}>{this.state.currentCard < this.state.deck.deck.questions.length && this.state.deck.deck.questions[this.state.currentCard].question}</Text>
                                    </View>
                                </View>
                            }
                                <View style={{flex:1}}>
                                    <Button
                                        raised
                                        backgroundColor={lightPurp}
                                        icon={{name: 'play-circle-outline'}}
                                        title='Show answer' 
                                        onPress={this.flipCard}
                                        />
                                </View>
                            </Animated.View>
            
                        // Back side of the card/deck
                        :
                        <Animated.View style={[{flex:10}, {transform: [{rotateX}]}]}>
                            <View style={{flex:8, marginTop:5, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}}>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-start'}}>
                                    <Text style={{fontSize:22, color:gray, fontWeight:'bold'}}>{this.state.currentCard+1} of {this.state.deck.deck.questions.length}</Text>
                                </View>
                                <View style={{flex:5, justifyContent:'center', paddingLeft:20,paddingRight:20}}>
                                    <Text style={{fontSize:28, color:black, fontWeight:'bold'}}>{this.state.deck.deck.questions[this.state.currentCard].answer}</Text>
                                </View>
                                <View style={{flex:2, justifyContent:'center'}}>
                                    <Text style={{fontSize:22, color:'red', fontWeight:'bold'}}>Answer</Text>
                                </View>
                            </View>
                            <View style={{flex:2, justifyContent:'flex-start'}}>
                                <View style={{flex:1}}>
                                    <Button
                                        raised
                                        backgroundColor='green'
                                        onPress={this.scoreCorrect}
                                        title='Correct' 
                                        />
                                </View>
                                <View style={{flex:1}}>
                                    <Button
                                        raised
                                        backgroundColor='red'
                                        title='Incorrect' 
                                        onPress={this.goNextCard}
                                        />
                                </View>
                            </View>
                        </Animated.View>
                        )
                    :
                        //Summary Report
                        <Animated.View style={[{flex:10, marginTop:5, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}, {transform: [{rotate: spin}]} ]}>
                            <View style={{flex:8, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize:28, fontWeight:'bold'}}>{this.state.correctCard} of {this.state.deck.deck.questions.length}</Text>
                                <Text style={{fontSize:28, fontWeight:'bold'}}>of your {this.state.correctCard > 1 ? 'answers are' : 'answer is'} correct.</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Button
                                    raised
                                    backgroundColor={purple}
                                    title='Redo Quiz' 
                                    onPress={this.goReplay}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Button
                                    raised
                                    backgroundColor={purple}
                                    title='Goto Main' 
                                    onPress={this.goBack}
                                />
                            </View>
                        </Animated.View>   
                }
            </View>            
        )
    }
}

export default QuizView
