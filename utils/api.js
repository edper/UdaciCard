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

export function getAllDecks() {
    AsyncStorage.clear()
    AsyncStorage.getItem(UDACI_CARDS_KEY)
    .then((result)=>{
        let res = result
        if (result === null)
        {
            res = initializeData()   
        }
        console.log("Result get ", res)
        result
    })

//    AsyncStorage.getItem(UDACI_CARDS_KEY,(err, result)=>{
//        const data = (result === null) ? initializeData() : result
//        console.log("Data => ",result)
//        return data
//    })
}

export function getDeck({id}) {
    AsyncStorage.getItem(UDACI_CARDS_KEY)
    .then((results)=>{
        const data = JSON.parse(results)
        data[id]
    })    
}

export function saveDeckTitle({title}) {
    AsyncStorage.mergeItem(UDACI_CARDS_KEY, json.stringify({
        [title]:{},
    }))
}

export function addCardToDeck({title, card}) {
    AsyncStorage.mergeItem(UDACI_CARDS_KEY, json.stringify({
        [title]:card,
    }))
}



