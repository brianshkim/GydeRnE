import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCreate from "./PostCreate";
import CommentCreate from './CommentCreate'
import { get_post } from '../../store/posts'


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

    const nestedComments = (comments)=>{
        if(comments.length===0) return

        return (
            <div>{
                comments.map((comment)=>(
                    <div>
                    <div>{comment.content}</div>
                    <div><CommentCreate postid={comment.id} /></div>
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
                    <CommentCreate postid={comment.id}/>
                    <div>{comment.comments.length>0 ? nestedComments(comment.comments): null}</div>

                </div>
                )}</div>
            <div>
                <PostCreate />
            </div>
            <div>

                <CommentCreate />
            </div>
        </div>
    )
}

export default Post
