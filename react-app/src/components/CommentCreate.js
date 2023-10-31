import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create_post} from '../store/posts'
const PostCreate = ({ resp_id }) => {
    let user = useSelector(state => state.session.user)
    let posts = useSelector(state => state.posts.list)
    let dispatch = useDispatch()
    const [title, setTitle] = useState('')
    let [content, setContent] = useState('')
    let [research, setResearch] = useState(false)



    useEffect(() => {
        console.log(typeof window?.MathJax)
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [title, content])



    const handleSubmit = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(create_post(user.id, title,content,research, null, "", true))


    }
    return (
        <div>
            <form
            onSubmit={handleSubmit}
            >
            <div>
            <label>Create Post</label>

            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} />
            </div>
            <div>
            <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content} />
            <p>{content}</p>
            </div>

            <div>
                <input type="radio" id="isResearch" name='isResearch'
                    onClick={(e) => setResearch(!research)} value="research"
                    checked={research === true ? true : false} />
                <label for="isResearch">Consider for research</label>
            </div>
            </form>
            <button type="Submit" >Create Post</button>




        </div>


    )
}

export default PostCreate
