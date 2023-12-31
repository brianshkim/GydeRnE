const LOAD_COURSES = 'COURSES/GET_COURSES'
const LOAD_SINGLE_COURSE = 'COURSES/LOAD_SINGLE_COURSE'
const CREATE_COURSE = 'COURSES/CREATE_COURSE'
const UPDATE_COURSES = 'COURSES/UPDATE_COURSE'
const DELETE_COURSE = 'COURSES/DELETE_COURSE'
const UNLOAD_COURSES = 'COURSES/UNLOAD_COURSES'

const loadCourses = (course) => ({
    type: LOAD_COURSES,
    course
});

const loadSingleCourse =(course)=>({
    type:LOAD_SINGLE_COURSE,
    course
})

const createCourse = (course) => ({
    type: CREATE_COURSE,
    course
})

const updateCourses = (course) => ({
    type: UPDATE_COURSES,
    course
})

const deleteCourse = (course) => ({
    type: DELETE_COURSE,
    course

})

const unloadCourses = () => ({
    type: UNLOAD_COURSES
})


export const unload_courses = () => async(dispatch)=>{
    dispatch(unloadCourses())
}

export const load_courses = (id) => async (dispatch) => {
    const response = await fetch(`/api/courses`);
    const data = await response.json()

    dispatch(loadCourses(data.allcourses));


}

export const get_single_course=(id)=>async(dispatch)=>{
    const response = await fetch(`/api/courses/${id}`);
    const data = await response.json()
    dispatch(loadSingleCourse(data))


}



export const get_courses = (id) => async (dispatch) => {
    const response = await fetch(`/api/courses/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(loadCourses(data));

}

export const create_course = (
    professor_id,
    title,
    subject,

       ) => async (dispatch) => {
    const response = await fetch(`/api/courses/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'professor_id':professor_id,
            'title':title,
            'subject':subject,

        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createCourse(data))
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

export const update_course = (
    id,
    professor_id,
    title,
    subject,
) => async (dispatch) => {
    const response = await fetch(`/api/courses/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'professor_id':professor_id,
            'title':title,
            'subject':subject,

        })
    });

    const data = await response.json()


    dispatch(updateCourses(data));


};

export const delete_course = (id) => async (dispatch) => {

    const response = await fetch(`/api/courses/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteCourse(Number(data)));
}

let initialState = {list:[], studentlist:[]};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SINGLE_COURSE:
            return action.course
        case LOAD_COURSES:
            let courselist = []
            action.courses.forEach(course => {
                courselist.push(course)
            })
            courselist.sort((a, b)=>{
                return a.title.localeCompare(b.name)
            })
            return {...state, list: courselist}
        case CREATE_COURSE:

            state.list.push(action.course)
            state.list.sort((a, b)=>{
                return a.title.localeCompare(b.name)
            })
            return {...state}
        case UPDATE_COURSES:
            let newstate = state.list.map((course)=>{
                if( course.id === action.course.id){
                    course.title = action.course.title
                }
                return course

            })

            return newstate
        case DELETE_COURSE:

            return state.list.filter(course=>(
                course.id !== action.course

            ))
        case UNLOAD_COURSES:

            return initialState


        default:
            return state;
    }
}
