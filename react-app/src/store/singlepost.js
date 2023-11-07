const LOAD_POST = 'POSTS/GET_POST'
const CREATE_POST = 'POSTS/CREATE_POST'
const UPDATE_POST = 'POSTS/UPDATE_POST'
const DELETE_POST = 'POSTS/DELETE_POST'
const DELETE_COMMENTS = 'POSTS/DELETE_COMMENTS'
const UNLOAD_POST = 'POSTS/UNLOAD_POST'




const getPost = (post) => ({
    type: LOAD_POST,
    post
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const editPosts = (post, postid) => ({
    type: UPDATE_POST,
    post, postid
})

const deletePost = (post) => ({
    type: DELETE_POST,
    post

})

const deleteComments = (post) => ({
    type: DELETE_COMMENTS,
    post
})


const unloadPosts = () => ({
    type: UNLOAD_POST
})

export const unload_posts = () => async (dispatch) => {
    dispatch(unloadPosts())
}

export const get_post = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(getPost(data));

}

export const create_post = (
    user_id,
    title,
    content,
    research,
    research_paper,
    root,
) => async (dispatch) => {
    console.log(title)
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": user_id,
            "title": title,
            "content": content,
            "research": research,
            "research_paper": research_paper,
            "root": root,

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
    title,
    comment,
    research,
    research_paper,
    tex,
    root,
    resp_id,

) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": content,
            "title": title,
            "comment": comment,
            "research": research,
            "research_paper": research_paper,
            'tex': tex,
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

export const create_comments = (id, userid, content, originalid) => async (dispatch) => {
    console.log(originalid)
    const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userid,
            "content": content,
            "originalid": originalid,


        })
    });

    const data = await response.json()


    dispatch(editPosts(data, id));

}

export const delete_comments = (id, originalid) => async (dispatch) => {
    console.log(originalid)
    const response = await fetch(`/api/posts/${id}/comments/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            "originalid": originalid,


        })
    });

    const data = await response.json()


    dispatch(deleteComments(data));

}







let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POST:


            return { ...state, ...action.post }
        case CREATE_POST:


            return action.post
        case UPDATE_POST:

            return action.post
        case DELETE_POST:

            return initialState
        case DELETE_COMMENTS:
            return action.post

        case UNLOAD_POST:

            return initialState


        default:
            return state;
    }
}
