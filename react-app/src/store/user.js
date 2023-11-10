// constants
const LOAD_USER = 'USERS/LOAD_USER';
const LOAD_ALL_USERS = 'USERS/LOAD_ALL_USERS';
const UNLOAD_USER = 'USERS/UNLOAD_USER';
const UNLOAD_ALL_USERS = 'USERS/UNLOAD_ALL_USERS';

const loadUser = (user) => ({
    type: LOAD_USER,
    user
});

const loadAllUsers = (users) => ({
    type: LOAD_ALL_USERS,
    users
})

const unloadAllUsers=() =>({
    type:UNLOAD_ALL_USERS
})


export const load_user = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(loadUser(data));
    }
}


export const unload_user = () => async(dispatch) =>{
    dispatch(unloadAllUsers)
}
//export const load_all_users = () => async (dispatch) => {
//    const response = await fetch(`/api/users/${id}`, {
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    });
//    if (response.ok) {
//        const data = await response.json();
//        if (data.errors) {
//            return;
//        }
//
//        dispatch(loadAllUsers(data));
//    }
//}
//




const initialState = { users: [] };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            return { user: action.user }
        case LOAD_ALL_USERS:
            return { users: action.users }
        case UNLOAD_ALL_USERS:
            return initialState
        default:
            return state;
    }
}
