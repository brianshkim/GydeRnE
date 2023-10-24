const LOAD_POSTS = 'ACCOMPLISHMENTS/GET_POSTS'
const CREATE_POSTS = 'POSTS/CREATE_POSTS'
const UPDATE_POSTS = 'POSTS/UPDATE_POSTS'
const DELETE_POSTS = 'POSTS/DELETE_POSTS'
const UNLOAD_POSTS = 'ACCOMPLISHMENTS/UNLOAD_POSTS'


const getPosts = (post) => ({
    type: LOAD_POSTS,
    post
});

const createPosts = (post) => ({
    type: CREATE_POSTS,
    post
})

const editPosts = (post) => ({
    type: UPDATE_POSTS,
    post
})

const deletePosts = (post) => ({
    type: DELETE_POSTS,
    post

})

const unloadPosts = ()=>({
    type: UNLOAD_POSTS
})

export const unload_posts = () => async(dispatch)=>{
    dispatch(unloadPosts())
}

export const get_posts= (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(getPosts(data));

}

export const create_posts = (
    firstname="",
    lastname="",
    highest_degree="",
    publications=[],
    awards=[]
       ) => async (dispatch) => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "highest_degree": highest_degree,
            "publications": publications,
            "awards": awards,


        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createPosts(data))
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

export const update_posts = (
    id,
    firstname,
    lastname,
    highest_degree,
    publications,
    awards,

    ) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "highest_degree": highest_degree,
            "publications": publications,
            "awards": awards,

        })
    });

    const data = await response.json()


    dispatch(editPosts(data));


};


export const delete_posts = (postsId) => async (dispatch) => {

    const response = await fetch(`/api/posts/${postsId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deletePosts(Number(data)));
}






let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POSTS:


            return {...state, ...action.posts}
        case CREATE_POSTS:

            state.list.push(action.posts)
            return {...state}
        case UPDATE_POSTS:
            let newstate = action.posts

            return newstate
        case DELETE_POSTS:

            return state.list.filter(post=>(
                post.id !== action.post

            ))
        case UNLOAD_POSTS:

            return initialState


        default:
            return state;
    }
}
