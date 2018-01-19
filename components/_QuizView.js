import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue, purple } from '../utils/colors'
import { Button } from 'react-native-elements'


class QuizView extends Component {
    state = {
        deck:null,
        currentCard:0,
        totalCards:0,
        flipSide:false,
        endOfQue:false,
        correctCard:0,
    }

    componentDidMount() {
        this.setState(()=>({totalCards:this.props.navigation.state.params.length, deck:this.props.navigation.state.params}))
    }

    flipCard=()=> (
        this.setState({flipSide:true})
    )

    scoreCorrect=()=>{
        this.setState({correctCard:this.state.correctCard+1})
        this.goNextCard()
    }

    goNextCard=()=> {
        if ((this.state.currentCard+1)===this.state.totalCards)
            this.setState({endOfQue:true})
        else
            this.setState({currentCard:this.state.currentCard+1, flipSide:false})
    }

    frontCard=()=> {
        <View style={{flex:10}}>
            { this.state.deck !== null &&
                <View style={{flex:9, marginTop:5, marginBottom:40, backgroundColor:gray}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:22, color:purple, fontWeight:'bold'}}>Hello there</Text>
                        {/*<Text style={{fontSize:22, color:gray, fontWeight:'bold'}}></Text>*/}
                    </View>
                    <View style={{flex:8}}>
                        <Text style={{fontSize:28, color:purple, fontWeight:'bold'}}>{this.state.deck.deck.questions[this.state.currentCard].question}</Text>
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
         </View>
    }
    

    backCard=()=> (
        <View style={{flex:10}}>
            <View style={{flex:8, marginTop:5, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}}>
                <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-start'}}>
                    <Text style={{fontSize:22, color:gray, fontWeight:'bold'}}>{this.state.currentCard+1} of {this.state.deck.questions.length}</Text>
                </View>
                <View style={{flex:5, justifyContent:'center'}}>
                    <Text style={{fontSize:28, color:black, fontWeight:'bold'}}>{this.state.deck.questions[this.state.currentCard].answer}</Text>
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
        </View>

    )

    summaryReport=()=>(
        <View style={{flex:10, backgroundColor:lightBlue}}>
            <View style={{flex:8}}>
                <Text style={{fontSize:28, fontWeight:'bold'}}>{this.state.correctCard} of {this.state.totalCards} of your answers is correct.</Text>
            </View>
            <View style={{flex:2}}>
                <Button
                    raised
                    backgroundColor={purple}
                    title='Go Back Home' 
                />
            </View>
        </View>
    )

    render() {
        const flipSide = this.state.flipSide
        const endOfQue = this.state.endOfQue
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                {
                    !endOfQue ?
                        (!flipSide 
                         
                        //this.frontCard()
                        ?         
                            <View style={{flex:10}}>
                            { this.state.deck !== null &&
                                <View style={{flex:9, marginTop:5, marginBottom:40, backgroundColor:lightBlue}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:22, color:gray, fontWeight:'bold'}}>{this.state.currentCard} of {this.state.totalCards}</Text>
                                    </View>
                                    <View style={{flex:8}}>
                                        <Text style={{fontSize:28, color:purple, fontWeight:'bold'}}>{this.state.deck.deck.questions[this.state.currentCard].question}</Text>
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
                            </View>
            
                        //: this.backCard())
                        :
                        <View style={{flex:10}}>
                            <View style={{flex:8, marginTop:5, marginBottom:40, alignItems:'center', justifyContent:'center', backgroundColor:lightBlue}}>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-start'}}>
                                    <Text style={{fontSize:22, color:gray, fontWeight:'bold'}}>{this.state.currentCard+1} of {this.state.deck.deck.questions.length}</Text>
                                </View>
                                <View style={{flex:5, justifyContent:'center'}}>
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
                        </View>
                        )
                    :
                        //this.summaryReport() 
                        <View style={{flex:10, backgroundColor:lightBlue}}>
                            <View style={{flex:8}}>
                                <Text style={{fontSize:28, fontWeight:'bold'}}>{this.state.correctCard} of {this.state.totalCards} of your answers is correct.</Text>
                            </View>
                            <View style={{flex:2}}>
                                <Button
                                    raised
                                    backgroundColor={purple}
                                    title='Go Back Home' 
                                />
                            </View>
                        </View>   
                }
            </View>            
        )
    }
}

export default QuizView
