import profileReducer from "./redux/profile-reducer"
import dialogsReducer from "./redux/dialogs-reducer"
import sidebarReducer from "./redux/sidebar-reducer"

let store = {
    _state : {
        profilePage: {
            posts: [
                {id: "1", message: "Hi, how are you", likesCount: 36},
                {id: "2", message: "It's my first post", likesCount: 25},
                {id: "3", message: "Blablabal", likesCount: 150},
                {id: "4", message: "Dadadada", likesCount: 178}
            ],
            newPostText: "IT"
        },
        dialogsPage: {
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
            ],
            newMessageBody: ""
        },
        sidebar: {
            
        }
    },
    _callSubscriber() {  // rerenderEntireTree in index.js
        console.log("State changed")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) { // {type: "ADD-POST"}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

        this._callSubscriber(this._state);
    }
}


window.state = store
export default store;
