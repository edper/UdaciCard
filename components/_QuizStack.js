import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue } from '../utils/colors'
import { Button } from 'react-native-elements'


class QuizStack extends Component {
    state = {
        currentCard:0,
        totalCards:0,
    }
    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text>Want to start the Quiz?</Text>
                <Button
                    raised
                    icon={{name: 'play-circle-outline'}}
                    title='Start Quiz' />
            </View>
        )
    }
}

export default QuizStack
