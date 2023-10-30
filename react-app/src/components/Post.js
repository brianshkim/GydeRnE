import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Post = () => {
    let user = useSelector(state=>state.session.user)
    let posts = useSelector(state=>state.posts.list)
}

export default Post
