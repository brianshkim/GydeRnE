import './UsersPosts.css';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { getUsers } from '../store/users';
import { authenticate } from '../store/session';
import EditPostModal from './Posts/EditPostModal';

const UsersPosts = ({ userId }) => {

    const users = useSelector(state => state.user); //good 
    const usersArr = Object.values(users); // good
    const userInfo = usersArr[userId - 1] // good
    const posts = useSelector(state => state.post);
    const postsArr = Object.values(posts);
    const userPosts = postsArr.filter(post => post.user_id === Number(userId))
    const latestUserPosts = [];
    userPosts.forEach(post => {
        latestUserPosts.unshift(post);
    });

    return (
        <div className="profile-posts-wrap">
            {latestUserPosts?.map(post => {
                return (
                    <div key={post.id} className="profile-posts">
                        <img className='profile-posts-profile-pic' alt='' src={userInfo?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : userInfo?.profile_img} />
                        <div className='profile-posts-everything-minus-pic'>
                            <div className="profile-feed-post-username-and-edit-btn">
                                <NavLink className="profile-post-link" to={`/posts/${post.id}`}>
                                    <div className="profile-feed-post-names">
                                        <div className="feed-post-display-name">{userInfo?.name}</div>
                                        <div className="feed-post-username">@{userInfo?.username}<p className="dot">·</p></div>
                                        <div className="timestamp-container">
                                            <TimeAgo
                                                className="timestamp"
                                                date={post.created_at}
                                                locale='en-US'
                                                timestyle="twitter-first-minute"
                                            />
                                        </div>
                                    </div>
                                </NavLink>
                                {post.user_id === userInfo.id &&
                                    <EditPostModal postId={post.id} className="profile-page-posts-edit-btn" />
                                }
                            </div>
                            <div className="profile-feed-post-container">
                                <NavLink className="post-link" to={`/posts/${post.id}`}>
                                    <div className="profile-feed-post">
                                        {post.content.split('\n').map(line => (<p className="profile-feed-post-content-lines">{line}</p>))}
                                    </div>
                                    {post.image_url &&
                                        <div className='profile-feed-post-img-container'>
                                            <img className='profile-feed-post-img' src={post.image_url} alt='' />
                                        </div>
                                    }
                                </NavLink>
                            </div>
                            <NavLink className="post-link" to={`/posts/${post.id}`}>
                                <div className="profile-feed-post-icons">
                                    <div className='profile-feed-post-icon-and-stat'>
                                        <AddCommentIcon />
                                        {/* Comment amount */}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                )
            })}
        </div >
    )

}

export default UsersPosts