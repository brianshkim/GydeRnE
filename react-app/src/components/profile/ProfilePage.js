import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

const ProfilePosts = () => {

    const users = useSelector(state => state.users);
    const usersArray = (Object.values(users))[0].users;
    const { userId } = useParams();
    const user = usersArray.filter(user=>user===Number(userId))[0];
    const posts = useSelector(state => state.posts.allposts);
    const postsArr = Object.values(posts)[0]
    const userposts = postsArr.filter(post => post.poster_details.id === Number(userId) && post.root === true)
    const latestUserposts = [];
    const months = {0:"Jan", 1:"Feb", 2:"Mar", 3:"Apr", 4:"May", 5:"Jun", 6:"Jul", 7:"Aug", 8:"Sep", 9:"Oct", 10:"Nov", 11:"Dec"}



    const getDate = (date)=>{
        let d = new Date(date)
        let thisYear = new Date().getFullYear()
        let timeOfDay = d.getHours() >= 12 ? "pm":"am"
        let hours = d.getHours() === 0 ? 12 : d.getHours()%12
        let minutes = d.getMinutes()
        if(d.getFullYear()===thisYear){
            return `${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes} ${timeOfDay}`
        }
    }
    userposts.forEach(post => {
        latestUserposts.unshift(post);
    });
    console.log(posts)



    return (
        <div className="profile-posts-wrap">
            {latestUserposts?.map(post => {
                return (
                    <div key={post.id} className="profile-posts">
                        <img className='profile-posts-profile-pic' alt='' src={user?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : user?.profile_img} />
                        <div className='profile-posts-everything-minus-pic'>
                            <div className="profile-feed-post-username-and-edit-btn">
                                <NavLink className="profile-post-link" to={`/posts/${post.id}`}>
                                    <div className="profile-feed-post-names">
                                        <div className="feed-post-display-name">{`${post.poster_details.firstname} ${post.poster_details.firstname} at ${getDate(post.created_at)} ${post.updated_at !==null ? getDate(post.updated_at) : ""}`}</div>
                                        <div>{post.title}</div>
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
