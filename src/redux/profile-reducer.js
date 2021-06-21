import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "first-app/profile/ADD-POST";
const SET_USER_PROFILE = "first-app/profile/SET_USER_PROFILE";
const SET_STATUS = "first-app/profile/SET_STATUS";
const DELETE_POST = "first-app/profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "first-app/profile/SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id: "1", message: "Hi, how are you", likesCount: 36},
        {id: "2", message: "It's my first post", likesCount: 25},
        {id: "3", message: "Blablabal", likesCount: 150},
        {id: "4", message: "Dadadada", likesCount: 178}
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST : {
            let body = action.newPost
            return {
                ...state,
                posts: [...state.posts, {id:5, message: body, likesCount: 0}], 
            }
        }
        case SET_USER_PROFILE : 
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS :
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS: 
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
} 

export const addPostCreator = (newPost) => ( {type: ADD_POST, newPost} );
export const setUserProfile = (profile) => ( {type: SET_USER_PROFILE, profile} );
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)

        dispatch(setUserProfile(response.data)) 
}


export const getStatus = (status) => async (dispatch) => {
    const response = await profileAPI.getStatus(status)

        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)

        if (response.resultCode === 0) {
            dispatch(setStatus(response.data))
        }
} 

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userId

        if (response.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {    
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
}

export default profileReducer;