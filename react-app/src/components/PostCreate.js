import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create_post} from '../store/singlepost'
const PostCreate = ({ resp_id }) => {
    let user = useSelector(state => state.session.user)
    let dispatch = useDispatch()
    const [title, setTitle] = useState('')
    let [content, setContent] = useState('')
    let [research, setResearch] = useState(false)



    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [title, content])



    const handleSubmit = (e) => {

        e.stopPropagation()
        e.preventDefault()
        dispatch(create_post(user.id, content,  "", true))


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
            <button type="submit" >Create Post</button>
            </form>





        </div>


    )
}

export default PostCreate
