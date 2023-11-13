const LOAD_POST = 'POSTS/GET_POST'
const CREATE_POST = 'POSTS/CREATE_POST'
const UPDATE_POST = 'POSTS/UPDATE_POST'
const DELETE_POST = 'POSTS/DELETE_POST'
// const GET_ALL_COMMENTS = 'POSTS/GET_ALL_COMMENTS'
const DELETE_COMMENTS = 'POSTS/DELETE_COMMENTS'
const UNLOAD_POST = 'POSTS/UNLOAD_POST'
const GET_ALL_POSTS = 'POSTS/GET_ALL_POSTS'
const LOAD_USER_POSTS = 'POSTS/LOAD_USER_POSTS'

const getPost = (post) => ({
    type: LOAD_POST,
    post
});

const getUserPosts = (posts)=>({
    type: LOAD_USER_POSTS,
    posts
})

const getAllPosts = (posts)=>({
    type: GET_ALL_POSTS,
    posts
})

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

// const loadComments = (comments) => ({
// 	type: GET_ALL_COMMENTS,
// 	comments,
// });

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

export const get_all_posts = () => async (dispatch) => {
	const response = await fetch("/api/posts/");

	if (response.ok) {
		const postList = await response.json();
		dispatch(getAllPosts(postList));
		return postList;
	}
};

export const get_post = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/`);
    const data = await response.json()
    console.log(data)
    dispatch(getPost(data.userposts));

}

export const get_user_posts = (userid) => async (dispatch) => {
    const response = await fetch(`/api/posts/user/${userid}`)
    const data = await response.json()
    dispatch(getUserPosts(data));
}

export const create_post = (
    title,
    abstract,
    content,
    research,
    research_paper,
    created_at
) => async (dispatch) => {
    console.log(title)
    const response = await fetch(`/api/posts/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            'abstract': abstract,
            "content": content,
            "research": research,
            "research_paper": research_paper,
            'created_at': created_at

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
    abstract,
    title,
    comment,
    research,
    research_paper,
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
            "abstract": abstract,
            "research": research,
            "research_paper": research_paper,

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

// export const get_comments = () => async (dispatch) => {
// 	const response = await fetch("/api/comments");

// 	if (response.ok) {
// 		const commentList = await response.json();
// 		dispatch(loadComments(commentList));
// 		return commentList;
// 	}
// };

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







let initialState = {userposts:[], allposts:[]};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POST:
            return action.post
        case LOAD_USER_POSTS:
            let posts = []
            action.posts.userposts.forEach((post)=>{
                posts.push(post)
            })
           return{...state, userposts:posts}
        case GET_ALL_POSTS:
			return {...state, allposts:action.posts};
        case CREATE_POST:

            state.allposts.posts.push(action.post)
            let newarr = {posts:state.allposts.posts}
            return {...state, allposts:newarr}
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
