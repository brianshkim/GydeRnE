import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get_user_posts} from '../../store/posts'

const Post = () => {
    let user = useSelector(state => state.users.)
    let post = useSelector(state => state.posts)
    let userposts = post?.userposts



    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_user_posts())
    }, [dispatch, user])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [post.userposts])


    return (
        <div>
            <div>{post?.title}</div>
            <div>{post?.content}</div>
            <div>
                <div>Posts</div>
                {userposts?.map(post =>
                <div>
                    <div>{post.title}</div>
                    <div>{post.abstract}</div>
                    <div>{post.content}</div>

                </div>
                )}</div>

            <div>


            </div>
        </div>
    )
}

export default Post
