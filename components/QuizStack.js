import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue } from '../utils/colors'
import { Button } from 'react-native-elements'


class QuizStack extends Component {
    state = {
        currentCard:0,
        totalCards:0,
    }
    render() {
        const {title, count} = this.props.navigation.state.params
        return (
            <View style={{flex:1, flexDirection:'column', justifyContent:'center', backgroundColor:lightBlue}}>
                <View style={{flex:4, marginTop:40, marginBottom:40, alignItems:'center'}}>
                    <Text style={{fontSize:36, color:black, fontWeight:'bold'}}>{title}</Text>
                    <Text style={{fontSize:28, color:gray, fontStyle:'italic'}}>{count} {count>1?'cards':'card'}</Text>
                </View>
                <View style={{flex:4}}>
                    <Button
                        raised
                        backgroundColor={white}
                        color={black}
                        icon={{name: 'add-circle-outline', color:black}}
                        title='Add Card' />

                </View>
                <View style={{flex:28}}>
                    <Button
                        raised
                        backgroundColor={lightPurp}
                        icon={{name: 'play-circle-outline'}}
                        title='Start Quiz' />
                </View>
            </View>            
        )
    }
}

export default QuizStack
