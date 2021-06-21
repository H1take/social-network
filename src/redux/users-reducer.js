import {usersAPI} from "../api/api";
import {updateNewObjInArray} from "../utils/validators/object-helpers";

const FOLLOW = "first-app/user/FOLLOW";
const UNFOLLOW = "first-app/user/UNFOLLOW";
const SET_USERS = "first-app/user/SET_USERS";
const SET_CURRENT_PAGE = "first-app/user/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "first-app/user/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "first-app/user/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "first-app/user/TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: updateNewObjInArray(state.users, action.userId, {followed: true}, "id")
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateNewObjInArray(state.users, action.userId, {followed: false}, "id")
            }
        case SET_USERS: 
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage : action.currentPage
            }
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state,
                totalUsersCount : action.count
            }
        case TOGGLE_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: 
            return {
                ...state,
                followingInProgress: action.isFetching 
                                     ? [...state.followingInProgress, action.userId]
                                     : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
} 

export const followSuccess = (userId) => ( {type: FOLLOW, userId} )
export const unfollowSuccess = (userId) => ( {type: UNFOLLOW, userId} )
export const setUsers = (users) => ( {type: SET_USERS, users} )
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type:SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


const followUnfollowFlow = async (dispatch,userId, apiMethod, actionCreator) => {

        dispatch(toggleFollowingProgress(true, userId))
            let response = await apiMethod(userId)

                if (response.data.resultCode === 0) {
                    dispatch(actionCreator(userId))
                }
        dispatch(toggleFollowingProgress(false, userId))
}


export const requestUsers = (page, pageSize) => { 

    return async (dispatch) => {
            dispatch(toggleIsFetching(true))
            dispatch(setCurrentPage(page))
            let data = await usersAPI.getUsers(page, pageSize)
                dispatch(setUsers(data.items))
                dispatch(toggleIsFetching(false))
                dispatch(setTotalUsersCount(data.totalCount)) 
    }
}

export const follow = (userId) => { 
    return async (dispatch) => {
            followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => { 
    return async (dispatch) => {
            followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;