const LOAD_ACCOMPLISHMENTS = 'ACCOMPLISHMENTS/GET_ACCOMPLISHMENTS'
const CREATE_ACCOMPLISHMENTS = 'ACCOMPLISHMENTS/CREATE_ACCOMPLISHMENTS'
const UPDATE_ACCOMPLISHMENTS = 'ACCOMPLISHMENTS/UPDATE_ACCOMPLISHMENTS'
const DELETE_ACCOMPLISHMENTS = 'ACCOMPLISHMENTS/DELETE_ACCOMPLISHMENTS'
const UNLOAD_ACCOMPLISHMENTS = 'ACCOMPLISHMENTS/UNLOAD_ACCOMPLISHMENTS'


const getAccomplishments = (accomplishment) => ({
    type: LOAD_ACCOMPLISHMENTS,
    accomplishment
});

const createAccomplishments = (accomplishment) => ({
    type: CREATE_ACCOMPLISHMENTS,
    accomplishment
})

const editAccomplishments = (accomplishment) => ({
    type: UPDATE_ACCOMPLISHMENTS,
    accomplishment
})

const deleteAccomplishments = (accomplishment ) => ({
    type: DELETE_ACCOMPLISHMENTS,
    accomplishment

})

const unloadAccomplishments = ()=>({
    type: UNLOAD_ACCOMPLISHMENTS
})

export const unload_accomplishments = () => async(dispatch)=>{
    dispatch(unloadAccomplishments())
}

export const get_accomplishments= (id) => async (dispatch) => {
    const response = await fetch(`/api/accomplishments`);
    const data = await response.json()

    dispatch(getAccomplishments(data));

}
export const create_accomplishment = (
    bio,
    publications,
    awards
       ) => async (dispatch) => {
    const response = await fetch(`/api/accomplishments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "bio": bio,
            "publications": publications,
            "awards": awards,

        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createAccomplishments(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const update_accomplishments = (
    id,
    bio,
    publications,
    awards,

    ) => async (dispatch) => {
    const response = await fetch(`/api/accomplishments/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "bio": bio,
            "publications": publications,
            "awards": awards,

        })
    });

    const data = await response.json()


    dispatch(editAccomplishments(data));


};


export const delete_accomplishments = (accomplishmentsId) => async (dispatch) => {

    const response = await fetch(`/api/accomplishments/${accomplishmentsId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteAccomplishments(Number(data)));
}






let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOMPLISHMENTS:


            return {...state, ...action.accomplishments}
        case CREATE_ACCOMPLISHMENTS:

            state.list.push(action.accomplishments)
            return {...state}
        case UPDATE_ACCOMPLISHMENTS:
            let newstate = action.accomplishments

            return newstate
        case DELETE_ACCOMPLISHMENTS:
            return initialState

        case UNLOAD_ACCOMPLISHMENTS:

            return initialState


        default:
            return state;
    }
}
