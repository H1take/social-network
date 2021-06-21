const SEND_MESSAGE = "first-app/dialogs/SEND-MESSAGE";

let initialState = {
    dialogs: [
        {id: "1", name: "Dima"},
        {id: "2", name: "Sasha"},
        {id: "3", name: "Petya"},
        {id: "4", name: "Vasaya"}
    ],
    messages: [
        {id: "1", message: "hi"},
        {id: "2", message: "How are you ?"},
        {id: "3", message: "Yoyo"},
        {id: "4", message: "Yo"},
        {id: "5", message: "Yeeeet"}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE: 
        let body = action.newMessageBody
        return {
            ...state,
            messages: [...state.messages, {id: 6, message: body}]
        }
        default:
            return state
}
}



export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;