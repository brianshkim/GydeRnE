import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_user_posts } from "../../store/posts";

const Post = () => {
    let user = useSelector(state => state.session.user)
    let posts = useSelector(state => state.posts.userposts)

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_user_posts(user.id)) // might have to feed in user id from props or params
    }, [dispatch, user])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [posts?.content])



    return (
        <div>
            {posts?.map(post => (
                <div key={post.id} className={`post${post.id}`}>
                    <div>{post?.title}</div>
                    <div>{post?.poster_details.firstname}</div>
                    <div>{post?.poster_details.lastname}</div>
                    <div>{post?.poster_details.username}</div>
                    <div>{post?.abstract}</div>
                    <div>{post?.content}</div>
                </div>
            ))}
        </div>
    )
}

export default Post
