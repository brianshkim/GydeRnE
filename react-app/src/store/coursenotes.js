const LOAD_COURSENOTES = 'COURSES/GET_COURSENOTES'
const CREATE_COURSENOTE = 'COURSES/CREATE_COURSENOTE'
const UPDATE_COURSENOTE = 'COURSES/UPDATE_COURSENOTE'
const DELETE_COURSENOTE = 'COURSES/DELETE_COURSENOTE'
const UNLOAD_COURSENOTES = 'COURSES/UNLOAD_COURSENOTES'

const loadCoursenotes = (coursenote) => ({
    type: LOAD_COURSENOTES,
    coursenote
});

const createCoursenote = (coursenote) => ({
    type: CREATE_COURSENOTE,
    coursenote
})

const updateCoursenote = (coursenote) => ({
    type: UPDATE_COURSENOTE,
    coursenote
})

const deleteCoursenote = (coursenote) => ({
    type: DELETE_COURSENOTE,
    coursenote

})

const unloadCourses = () => ({
    type: UNLOAD_COURSENOTES
})


export const unload_coursenotes = () => async(dispatch)=>{
    dispatch(unloadCourses())
}

export const load_coursenotes = () => async (dispatch) => {
    const response = await fetch(`/api/coursenotes`);
    const data = await response.json()

    dispatch(loadCoursenotes(data.allcourses));


}



export const get_coursenotes = (id) => async (dispatch) => {
    const response = await fetch(`/api/coursenotes/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(loadCoursenotes(data));

}

export const create_coursenote = (
    course_id,
    content,
    tex,
    comment,
    root,
    resp_id

       ) => async (dispatch) => {
    const response = await fetch(`/api/coursenotes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'course_id':course_id,
            'content':content,
            'tex':tex,
            'comment':comment,
            'root': root,
            'resp_id':resp_id

        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createCoursenote(data))
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

export const update_coursenote = (
    id,
    course_id,
    content,
    tex,
    comment,
    root,
    resp_id
) => async (dispatch) => {
    const response = await fetch(`/api/coursenotes/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'course_id':course_id,
            'content':content,
            'tex':tex,
            'comment':comment,
            'root': root,
            'resp_id':resp_id

        })
    });

    const data = await response.json()


    dispatch(updateCoursenote(data));


};

export const delete_coursenote = (id) => async (dispatch) => {

    const response = await fetch(`/api/coursenotes/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteCoursenote(Number(data)));
}

let initialState = {list:[], studentlist:[]};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_COURSENOTES:
            let coursenotelist = []
            action.courses.forEach(course => {
                coursenotelist.push(course)
            })
            coursenotelist.sort((a, b)=>{
                return a.title.localeCompare(b.name)
            })
            return {...state, list: coursenotelist}
        case CREATE_COURSENOTE:

            state.list.push(action.coursenote)
            state.list.sort((a, b)=>{
                return a.title.localeCompare(b.name)
            })
            return {...state}
        case UPDATE_COURSENOTE:
            let newstate = state.list.map((coursenote)=>{
                if( coursenote.id === action.coursenote.id){
                    coursenote.title = action.coursenote.title
                }
                return coursenote

            })

            return newstate
        case DELETE_COURSENOTE:

            return state.list.filter(coursenote=>(
                coursenote.id !== action.coursenote

            ))
        case UNLOAD_COURSENOTES:

            return initialState


        default:
            return state;
    }
}
