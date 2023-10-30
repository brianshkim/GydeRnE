import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {get_posts} from '../store/posts'
const Post = () => {
    let user = useSelector(state=>state.session.user)
    let posts = useSelector(state=>state.posts.list)
    let dispatch = useDispatch()

    return(
        <div>
            <form
            onSubmit={}
            >
                <label>Title</label>
                <input>
                </input>
                <label>Content</label>
                <input>
                </input>
                <label>Research?</label>


            </form>


        </div>


    )
}

export default Post
