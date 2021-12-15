export const Change = () => {
    return {
        type: "Change"
    }
}

export const SaveUserName = (username) => {
    return {
        type: "SaveUserName",
        username: username
    }
}