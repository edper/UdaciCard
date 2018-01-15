import { GET_DECKS } from '../actions'

function decks(state={}, action) {
    switch(action.type) {
        case GET_DECKS:
          return action.decks
        default:
          return state
    }
}

export default decks