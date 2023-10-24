const LOAD_ALL_COURSES = 'allCOURSES/GET_ALL_COURSES'
const CREATE_COURSES = 'allCOURSES/JOIN_SERVER'
const EDIT_COURSES = 'allCOURSES/JOIN_SERVER'
const UNLOAD_ALL_COURSES = 'allCOURSES/UNLOAD_ALL_COURSES'


const loadCourses = (COURSES) => ({
    type: LOAD_ALL_COURSES,
    COURSES
});

const unloadallCourses = () => ({
    type: UNLOAD_ALL_COURSES
})


export const unload_allCourses = () => async(dispatch)=>{
    dispatch(unloadallCourses())
}

export const load_courses = (id) => async (dispatch) => {
    const response = await fetch(`/api/courses`);
    const data = await response.json()

    dispatch(loadCourses(data.allcourses));


}


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
    degree_undergrad=[],
    university_undergrad=[],
    degree_masters=[],
    university_masters=[],
    degree_postdoc=[],
    university_postdoc=[],
    doctoral_advisor="",
    subject="",
    date="",
    thesis="",
       ) => async (dispatch) => {
    const response = await fetch(`/api/education/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "degree_undergrad": degree_undergrad,
            "university_undergrad": university_undergrad,
            "degree_masters": degree_masters,
            "university_masters": university_masters,
            "degree_postdoc": degree_postdoc,
            "university_postdoc": university_postdoc,
            "doctoral_advisor": doctoral_advisor,
            "subject": subject,
            "date": date,
            "thesis": thesis,
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

let initialState = {list:{}, userlist:{}};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_COURSES:
            let courselist = []

            action.COURSES.forEach(server => {
                serverlist.push(server)
                let COURSES = {}
                let users=[]

                server.users.forEach(user=>{
                    users.push(user.id)

            })
                userlists[server.id]=users

            })
            serverlist.sort((a, b)=>{
                return a.id - b.id
            })
            return {...state, list: serverlist, userlist:userlists}
        case UNLOAD_ALL_COURSES:
            return initialState = {list:[]};


        default:
            return state;
    }
}
