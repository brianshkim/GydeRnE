import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'

import CommentCreate from '../CommentCreate'
import { get_post } from '../../store/posts'

import './Post.css'



const Post = () => {
    let user = useSelector(state => state.session.user)
    let post = useSelector(state => state.posts)

    let { postId } = useParams()

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_post(Number(postId)))
    }, [dispatch, postId])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [post?.content])

    const nestedComments = (comments) => {
        if (comments.length === 0) return

        return (
            <li>

            <div className="comment-box">{
                comments.map((comment) => (
                    <div>
                        <div>{comment.content}</div>
                        <div><CommentCreate originalpost={Number(postId)} postid={comment.id} /></div>
                        <div>{comment.comments.length > 0 ? nestedComments(comment.comments) : null}</div>
                    </div>

                ))
            }</div>
            </li>
        )
    }

    return (
        <div className="post-container">
            <div>

                <div className="post-title">{post?.title}</div>
                <div className="post-abstract">
                    <h4>Abstract</h4>
                    {post.abstract}
                </div>
                <div className="post-content">{post?.content}</div>


            </div>
            <div>
                <div className="comment-container">
                    <ul className="nested-comments">
                    <div>Comments</div>

                    {post?.comments?.map(comment =>
                    <li>
                        <div id={comment.id} className="comment-box">
                            <div>{comment.content}</div>
                            <CommentCreate originalpost={Number(postId)} postid={comment.id} />
                            <div className="nested-comment">{comment.comments.length > 0 ? nestedComments(comment.comments) : null}</div>

                        </div>
                        </li>
                    )}
                    </ul>
                </div>




                <CommentCreate postid={Number(postId)} originalpost={(Number(postId))} />
            </div>
        </div>
    )
}

export default Post
