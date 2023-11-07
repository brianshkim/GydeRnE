import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create_post } from '../../store/singlepost';
import './CreatePostModal.css'


const CreatePostForm = ({ resp_id }) => {

    let user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // const [image, setImage] = useState("");
    let [title, setTitle] = useState('')
    let [content, setContent] = useState('');
    let [research, setResearch] = useState(false)

    // const contentHandler = (e) => setContent(e.target.value);

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }
    }, [title, content])

    // const removeImage = (e) => setImage(null);

    const reset = () => setContent('');


    // const handleSubmit = (e) => {

    //     e.stopPropagation()
    //     e.preventDefault()
    //     dispatch(create_post(user.id, content,  "", true))
    // }

    const handleSubmit = async (e) => {
        e.stopPropagation()
        e.preventDefault();
        const newPost = {
            user_id: user.id,
            title,
            content,
            research: true
            // image_url: image
        }
        const post = await dispatch(create_post(newPost))

        if (post) {
            reset();
            // removeImage();
        }
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

export default CreatePostForm