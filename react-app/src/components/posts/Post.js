import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCreate from "./PostCreate";
import CommentCreate from '../CommentCreate'
import { get_post } from '../../store/posts'
import { checkPropTypes } from "prop-types";

import CommentCreate from '../CommentCreate'
import { get_post, delete_comments } from '../../store/posts'

const Post = () => {
    let user = useSelector(state => state.session.user)
    let post = useSelector(state => state.posts)

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_post(11))
    }, [dispatch, user])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [post?.content])

    const deleteComment = (e, commentid) =>{
        e.preventDefault()
        dispatch(delete_comments(commentid, post.id))
    }

    const nestedComments = (comments)=>{
        if(comments.length===0) return

        return (
            <div>{
                comments.map((comment)=>(
                    <div>
                    <div>{comment.content}</div>
                    <button onClick={e=>deleteComment(e,comment.id)}>Delete</button>
                    <div><CommentCreate originalpost={post.id} postid={comment.id} /></div>
                    <div>{comment.comments.length>0 ? nestedComments(comment.comments): null}</div>
                    </div>

                ))
            }</div>
        )
    }

    return (
        <div>
            <div>{post?.title}</div>
            <div>{post?.content}</div>
            <div>
                <div>Comments</div>
                {post?.comments?.map(comment =>
                <div>
                    <div>{comment.content}</div>
                    <button onClick={e=>deleteComment(e,comment.id)}>Delete</button>
                    <CommentCreate originalpost={post.id} postid={comment.id}/>
                    <div>{comment.comments.length>0 ? nestedComments(comment.comments): null}</div>


                </div>
                )}</div>

            <div>

                <CommentCreate originalpost={post.id} postid={post.id}/>
            </div>
        </div>
    )
}

export default Post
