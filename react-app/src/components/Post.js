import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {get_posts} from '../store/posts'
const Post = () => {
    let user = useSelector(state=>state.session.user)
    let posts = useSelector(state=>state.posts.list)

    let dispatch = useDispatch()

    useEffect(()=>{

        dispatch(get_posts(id))
    },[dispatch,user,posts])
}

export default Post
