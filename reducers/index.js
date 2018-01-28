import { GET_DECKS, ADD_CARD, GET_DECK, ADD_DECK, CLICK_ADD } from '../actions'

function decks(state={}, action) {
    switch(action.type) {
        case GET_DECKS:
        case ADD_CARD:
        case ADD_DECK:
        case GET_DECK:
          return action.decks
        case CLICK_ADD:
          console.log("Dispatch success")
          return 1
        default:
          return state
    }
}


export default decks