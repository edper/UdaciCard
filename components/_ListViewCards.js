import React, {Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { white, gray, lightGray, lightPurp, black, lightBlue } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {connect} from 'react-redux'
import {getAllDecks} from '../actions'
import {List, ListItem} from 'react-native-elements'

class ListViewCards extends Component {

    componentDidMount(){
        this.setState({ decks : this.props.getAllDecks() })
    }

    render() {

        const decks = typeof this.props.decks === 'string' ? Object.values(JSON.parse(this.props.decks)) : ''
        //const categories = typeof this.props.decks === 'string' ? Object.keys(JSON.parse(this.props.decks)) : ''
        let folderCtr = 0, direction = 'row'

        return(
            <List>
                {decks !== '' && 
                    <FlatList
                        data={decks}
                        renderItem={({item,index}) => (
                            <ListItem
                            roundAvatar
                            title={`${item.title}`}
                            titleStyle={{fontWeight:'bold', color:white}}
                            chevronColor={black}
                            containerStyle={{ borderTopColor:white, height:65, paddingTop:18, marginTop:10, backgroundColor:'#3d36b2'}}
                            key={index}
                            badge={{value:item.questions.length, textStyle:{color:white}, containerStyle:{backgroundColor:lightPurp, marginTop:3} }}
                            rightIcon={{style:{fontSize:28, color:white}}}
                            onPress={this.props.navigation.navigate('Quiz')}
                            onPressRightIcon={this.props.navigation.navigate('Quiz')}
                            />
                        )}
                        keyExtractor={deck => deck.title}
                    />
                }
            </List>
        )
    }
}


const styles = StyleSheet.create({
    containerRow: {
      flex: 6,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-start',
    },
    containerCol: {
        flex: 6,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
      },      
    folderRow : {
        flex:2,
        flexDirection:'row',
        backgroundColor:'yellow',
        height:110,
        justifyContent:'center', 
        alignItems:'center'
    },
    folderCol : {
        flex:2,
        flexDirection:'column',
        backgroundColor:'yellow',
        justifyContent:'center', 
        alignItems:'center'
    }
}) 

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
)(ListViewCards)
    