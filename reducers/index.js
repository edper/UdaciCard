import { GET_DECKS, ADD_CARD, GET_DECK, ADD_DECK, CLICK_ADD } from '../actions'

// Reducer index
function decks(state={}, action) {
    switch(action.type) {
        case GET_DECKS:
        case ADD_CARD:
        case ADD_DECK:
        case GET_DECK:
          return action.decks
        default:
          return state
    }
}


export default decks