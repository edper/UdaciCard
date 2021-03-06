export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const GET_DECKS = 'GET_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'
export const CLICK_ADD = 'CLICK_ADD'
import {AsyncStorage} from 'react-native'
const UDACI_CARDS_KEY = 'UdaciCards:John316'

// Dummy Initial Data
const initialData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    HTML: {
        title: 'HTML',
        questions: [
        ]
    },  
}

// Action for adding a Card to a Deck
export function addEntry(decks) {
    return {
        type: ADD_CARD,
        decks,
    }        
}

// Action for adding a Deck
export function addDeck(decks) {
    return {
        type: ADD_DECK,
        decks,
    }        
}

// Action for getting multiple Decks
export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks,
    }        
}

// Action for getting a single Deck
export function getSingleDeck(deck) {
    return {
        type: GET_DECK,
        deck,
    }        
}

// Actual function for initializing dummy data
function setInitialData() {
    AsyncStorage.setItem(UDACI_CARDS_KEY, JSON.stringify(initialData))
}

// Wrapper for data initialization
export function initializeData()
{

    setInitialData()
    return AsyncStorage.getItem(UDACI_CARDS_KEY).then((result)=>{
        result
    })
}

// Async storage data initializer
export function get() {
    AsyncStorage.getItem(UDACI_CARDS_KEY)
    .then((result)=>{
        let res = result
        if (result === null)
        {
            AsyncStorage.setItem(UDACI_CARDS_KEY, JSON.stringify(initialData))
            .then(()=>
                AsyncStorage.getItem(UDACI_CARDS_KEY).then((result)=>
                   res = result
                )
            )
            .catch((error)=>{console.log('Initializing data error : ',error)});          
        }
        console.log("res=>",res)
        result
    })
    .then((data)=>{
        dispatch(getDecks(data))
    })
    .catch((error)=>{console.log('Fetching all decks error : ',error)});          
}

// dispatcher for fetching all Decks of cards
export function getAllDecks() {
    return (dispatch) => {
        let first = AsyncStorage.getItem(UDACI_CARDS_KEY)
        let second = first.then(
            (result)=>{
                if (result === null)
                {
                    AsyncStorage.setItem(UDACI_CARDS_KEY, JSON.stringify(initialData))
                }
                result
            }
        )
        let third = second.then(()=>
            AsyncStorage.getItem(UDACI_CARDS_KEY)
            .then((result)=> result)
        )
        const resAll = Promise.all([first, second, third]).then(function([resultA, resultB, resultC]) {
            (resultA!==null) ? dispatch(getDecks(resultA)) : dispatch(getDecks(resultC))
        });
    }
}

// dispatcher for fetching a single Deck
export function getDeck(title) {
    return (dispatch)=> {
        AsyncStorage.getItem(UDACI_CARDS_KEY)
        .then((decks)=>
           dispatch(getSingleDeck(decks))
        )    
    }
}

// dispatcher for saving a Deck/Title
export function saveDeckTitle({title}) {
    AsyncStorage.mergeItem(UDACI_CARDS_KEY, JSON.stringify({
        [title]:{},
    }))
}

// dispatcher for adding a card to a Deck
export function addCardToDeck({title, item}) {
    return (dispatch) => 
    { 
        AsyncStorage.mergeItem(UDACI_CARDS_KEY, JSON.stringify({
           [title]:item
        }),
            ()=>
             AsyncStorage.getItem(UDACI_CARDS_KEY,(error, result)=>
               dispatch(addEntry(result))
             )
        ).catch((error)=>{console.log('Adding card in a deck error : ',error)});  
    }   
}

// // dispatcher for adding a new Deck with no cards yet
export function addNewDeck(title) {
    return (dispatch) => 
    { 
        
        const emptyDeck = {'title':title, questions:[]};

        AsyncStorage.mergeItem(UDACI_CARDS_KEY, JSON.stringify({
           [title]:emptyDeck
        }),
            ()=>
             AsyncStorage.getItem(UDACI_CARDS_KEY,(error, result)=>
               dispatch(addDeck(result))
             )
        ).catch((error)=>{console.log('Adding a new deck error : ',error)});  
    }   
}
