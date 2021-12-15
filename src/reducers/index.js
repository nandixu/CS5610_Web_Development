import { combineReducers } from 'redux';
import LogInStateReducer from './LogInStateReducer'
import UserNameReducer from './UserNameReducer'

const allReducers = combineReducers({
    LogInState: LogInStateReducer,
    UserNameState: UserNameReducer,
})

export default allReducers;