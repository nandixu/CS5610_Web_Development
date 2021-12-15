

const UserNameReducer = (state = '', action) => {
    switch(action.type) {
        case 'SaveUserName':
            state = action.username
            return state
        default:
            return state
    }
}

export default UserNameReducer