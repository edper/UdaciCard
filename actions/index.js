export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const GET_DECKS = 'GET_DECKS'
export const ADD_ENTRY = 'ADD_ENTRY'
import {AsyncStorage} from 'react-native'
const UDACI_CARDS_KEY = 'UdaciCards:edper'

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
    }
}


export function addEntry(decks) {
    return {
        type: ADD_ENTRY,
        decks,
    }        
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks,
    }        
}

function setInitialData() {
    AsyncStorage.setItem(UDACI_CARDS_KEY, JSON.stringify(initialData))
}
export function initializeData()
{

    setInitialData()
    return AsyncStorage.getItem(UDACI_CARDS_KEY).then((result)=>{
        result
    })
   //const res = AsyncStorage.setItem(UDACI_CARDS_KEY, JSON.stringify(initialData),
   // ()=>{ AsyncStorage.getItem(UDACI_CARDS_KEY,
   //        (err, result)=>{
   //          result
   //        })
   // })
   // console.log("res = ",res)
   // res
}

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

export function getDeck({id}) {
    AsyncStorage.getItem(UDACI_CARDS_KEY)
    .then((results)=>{
        const data = JSON.parse(results)
        data[id]
    })    
}

export function saveDeckTitle({title}) {
    AsyncStorage.mergeItem(UDACI_CARDS_KEY, JSON.stringify({
        [title]:{},
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(UDACI_CARDS_KEY, JSON.stringify({
        [title]:card,
    })).then((data)=>{ console.log("Data",data); dispatch(addEntry(data)) })
    .catch((error)=>{console.log('Adding card in a deck error : ',error)});     
}
