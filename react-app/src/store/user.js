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

export const load_all_users = () => async (dispatch) => {
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

        dispatch(loadAllUsers(data));
    }
}

if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
} else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
        return data.errors;
    }
} else {
    return ['An error occurred. Please try again.']
}

}



const initialState = { users: [] };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            return { user: action.user }
        case LOAD_ALL_USERS:
            return { users: action.users }
        case UNLOAD_USERS:
            return initialState
        default:
            return state;
    }
}
