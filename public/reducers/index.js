import {combineReducers} from 'redux'


const useReducer = (user = null , action) =>{

    //check action
    if (action.type === 'CHAMGE_USER') {
        return action.payload
    }



    return user
}


export default combineReducers({
    user: useReducer
})