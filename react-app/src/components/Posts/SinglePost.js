import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from 'react-router-dom'

import ProfilePageCard from "../profile/ProfilePageCard";
import SideNavMain from "../NavBars/SideNavMain";

import CommentCreate from '../CommentCreate'
import { get_post } from '../../store/posts'

import usertempimage from "../images/usertempimage.jpg"
import './SinglePost.css'


const Post = () => {

    const user = useSelector(state => state.session.user)

    const users = useSelector(state => state.users);
    const usersArray = (Object.values(users))[0].users;
    const { userId } = useParams();
    const post = useSelector(state => state.posts)
    const postuser = usersArray[userId - 1];

    const profilePicture = user?.profile_image;

    let { postId } = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_post(Number(postId)))
    },
        [dispatch, postId])

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


    // console.log('asdf', usersArray[userId-1].firstname)

    return (
        <div className='profile-page-wrapper'>

            <div className="profile-page-left">
                <ProfilePageCard userId={post.poster} />
                <SideNavMain />
            </div>

            <div className="profile-page-right">
                <div className="right-container">
                    <NavLink className="back-to-profile" to={`/users/${Number(userId)}`}>
                        ← Back to Posts
                    </NavLink>
                    <div className='post-container-top'>

                        <div className="post-container">
                            <div className="poster-info">
                                <div className='profile-picture'>
                                    {profilePicture && (
                                        <img
                                            alt="profile"
                                            className="single-post-profile-picture"
                                            src={profilePicture}
                                        ></img>
                                    )}
                                    {!profilePicture && (
                                        <img
                                            alt="unknown"
                                            className="single-post-profile-picture"
                                            src={usertempimage}
                                        ></img>
                                    )}
                                </div>
                                <div className="poster-info-text">
                                    {postuser?.firstname} {postuser?.lastname} @{postuser.username}
                                </div>
                            </div>

                            <div className="post-content-wrapper">
                                <div className="post-title">{post?.title}</div>

                                <div className="post-abstract">
                                    {post.abstract && (
                                        <>
                                            {post.abstract}
                                        </>
                                    )}
                                    {!post.abstract && (
                                        <div className="no-abstract">
                                            No abstract for this post
                                        </div>
                                    )}
                                    
                                </div>
                                <div className="post-content">{post?.content}</div>
                            </div>
                        </div>

                    </div>

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
        </div>
    )
}

export default Post
