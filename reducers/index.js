import { GET_DECKS, ADD_ENTRY } from '../actions'

function decks(state={}, action) {
    switch(action.type) {
        case GET_DECKS:
        case ADD_ENTRY:
          return action.decks
        default:
          return state
    }
}

export default decks