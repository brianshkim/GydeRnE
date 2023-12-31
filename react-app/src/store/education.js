const LOAD_EDUCATION = 'EDUCATION/GET_EDUCATION'
const CREATE_EDUCATION = 'EDUCATION/CREATE_EDUCATION'
const UPDATE_EDUCATION = 'EDUCATION/UPDATE_EDUCATION'
const DELETE_EDUCATION = 'EDUCATION/DELETE_EDUCATION'
const UNLOAD_EDUCATION = 'EDUCATION/UNLOAD_EDUCATION'


const getEducation = (education) => ({
    type: LOAD_EDUCATION,
    education
});

const createEducation = (education) => ({
    type: CREATE_EDUCATION,
    education
})

const editEducation = (education) => ({
    type: UPDATE_EDUCATION,
    education
})

const deleteEducation = (education) => ({
    type: DELETE_EDUCATION,
    education

})

const unloadEducation = ()=>({
    type: UNLOAD_EDUCATION
})

export const unload_education = () => async(dispatch)=>{
    dispatch(unloadEducation())
}

export const get_education= (id) => async (dispatch) => {
    const response = await fetch(`/api/education/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(getEducation(data));

}

export const create_education = (
    undergrad,
    masters,
    postdoc
       ) => async (dispatch) => {
    const response = await fetch(`/api/education/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "undergrad":undergrad,
            "masters": masters,
            "postdoc": postdoc
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createEducation(data))
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

export const update_education = (
    id,
    undergrad,
    masters,
    postdoc
    ) => async (dispatch) => {
    const response = await fetch(`/api/education/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "undergrad":undergrad,
            "masters": masters,
            "postdoc": postdoc
        })
    });

    const data = await response.json()


    dispatch(editEducation(data));


};


export const delete_education = (educationId) => async (dispatch) => {

    const response = await fetch(`/api/education/${educationId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteEducation(Number(data)));
}





let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_EDUCATION:


            return {...state, ...action.education}
        case CREATE_EDUCATION:


            return action.education
        case UPDATE_EDUCATION:
            let newstate = action.education

            return newstate
        case DELETE_EDUCATION:

            return state.list.filter(education=>(
                education.id !== action.education

            ))
        case UNLOAD_EDUCATION:

            return initialState


        default:
            return state;
    }
}
