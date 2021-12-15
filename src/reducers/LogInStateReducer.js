const LogInStateReducer = (state = false, action) => {
    switch(action.type) {
        case 'Change':
            return !state
        default:
            return state
    }
}

export default LogInStateReducer