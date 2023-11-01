import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create_comments} from '../store/singlepost'
const CommentCreate = ({postid}) => {
    let user = useSelector(state => state.session.user)

    let dispatch = useDispatch()

    let [content, setContent] = useState('')



    useEffect(() => {
        console.log(typeof window?.MathJax)
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [])



    const handleSubmit = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(create_comments(postid,user.id,  content))


    }
    return (
        <div>
            <label>Create Comment</label>
            <form
            onSubmit={handleSubmit}
            >

            <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content} />
            <p>{content}</p>


            <div>
            </div>
            <button type="submit" >Create Post</button>
            </form>





        </div>


    )
}

export default CommentCreate
