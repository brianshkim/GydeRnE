const LOAD_ALL_COURSES = 'allCOURSES/GET_ALL_COURSES'
const JOIN_SERVER = 'allCOURSES/JOIN_SERVER'
const UNLOAD_ALL_COURSES = 'allCOURSES/UNLOAD_ALL_COURSES'


const loadCOURSES = (COURSES) => ({
    type: LOAD_ALL_COURSES,
    COURSES
});

const unloadallCOURSES = () => ({
    type: UNLOAD_ALL_COURSES
})


export const unload_allCOURSES = () => async(dispatch)=>{
    dispatch(unloadallCOURSES())
}

export const load_COURSES = (id) => async (dispatch) => {
    const response = await fetch(`/api/COURSES/COURSES`);
    const data = await response.json()

    dispatch(loadCOURSES(data.allCOURSES));


}

let initialState = {list:{}, userlist:{}};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_COURSES:
            let serverlist = []
            let userlists = {}
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
