const LOAD_POSTS = 'POSTS/GET_POSTS'
const CREATE_POST = 'POSTS/CREATE_POST'
const UPDATE_POST = 'POSTS/UPDATE_POST'
const DELETE_POST = 'POSTS/DELETE_POST'
const UNLOAD_POSTS = 'POSTS/UNLOAD_POSTS'


const getPosts = (post) => ({
    type: LOAD_POSTS,
    post
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const editPosts = (post) => ({
    type: UPDATE_POST,
    post
})

const deletePost = (post) => ({
    type: DELETE_POST,
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

export const create_post = (
    user_id,
    content,
    comment,
    research,
    root,
    resp_id
       ) => async (dispatch) => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": user_id,
            "content": content,
            "comment": comment,
            "research": research,
            "root": root,
            "resp_id": resp_id

        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createPost(data))
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

export const update_post = (
    id,
    content,
    comment,
    research,
    root,
    resp_id

    ) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": content,
            "comment": comment,
            "research": research,
            "root": root,
            "resp_id": resp_id

        })
    });

    const data = await response.json()


    dispatch(editPosts(data));


};


export const delete_post = (id) => async (dispatch) => {

    const response = await fetch(`/api/posts/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deletePost(Number(data)));
}






let initialState = {list:[]};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POSTS:


            return {...state, ...action.posts}
        case CREATE_POST:

            state.list.push(action.posts)
            return {...state}
        case UPDATE_POST:
            let newstate = action.posts

            return newstate
        case DELETE_POST:

            return state.list.filter(post=>(
                post.id !== action.post

            ))
        case UNLOAD_POSTS:

            return initialState


        default:
            return state;
    }
}
