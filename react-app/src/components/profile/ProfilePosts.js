import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import usericon from '../images/usertempimage.jpg';
import './ProfilePosts.css';

const ProfilePosts = () => {

    const users = useSelector(state => state.users);
    const usersArray = (Object.values(users))[0].users;
    const { userId } = useParams();
    const user = usersArray.filter(user=>user===Number(userId))[0];

    const posts = useSelector(state => state.posts.allposts);

    const postsArr = Object.values(posts)[0]
    const userposts = postsArr.filter(post => post.poster_details.id === Number(userId))
    const latestUserposts = [];

    userposts.forEach(post => {
        latestUserposts.unshift(post);
    });
    console.log(posts)



    return (
        <div className="profile-posts-wrap">
            {latestUserposts?.map(post => {
                return (
                    <div key={post.id} className="profile-posts">
                        <img className='profile-posts-profile-pic' src={user?.profile_image === '' ? {usericon} : user?.profile_image} />
                        <div className='profile-posts-everything-minus-pic'>
                            <div className="profile-feed-post-username-and-edit-btn">
                                <NavLink className="profile-post-link" to={`/posts/${post.id}`}>
                                    <div className="profile-feed-post-names">
                                        <div className="feed-post-display-name">{`${post.poster_details.firstname} ${post.poster_details.firstname}`}</div>
                                        <div className="feed-post-username">@{post.poster_details.username}<p className="dot">·</p></div>

                                    </div>
                                </NavLink>
                                {/* {post.user_id === user.id &&
                                    <EditpostModal postId={post.id} className="profile-page-posts-edit-btn" />
                                } */}
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

export default ProfilePosts
