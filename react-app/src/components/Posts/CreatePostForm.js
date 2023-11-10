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
        <div className="post-create-wrapper">
            <form onSubmit={handleSubmit} className="post-form">
                <div className="post-modal-header">
                    New Post
                </div>
                <div className='post-input-box'>
                    <textarea
                        placeholder='Title'
                        type="text"
                        className="post-title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} />
                </div>
                <div className='post-input-box'>
                    <textarea
                        placeholder='Write your post here...'
                        className="post-area"
                        onChange={(e) => setContent(e.target.value)}
                        value={content} />
                    <div className='post-preview-header'>
                        Post Preview:
                    </div>
                    <p className="post-area-preview">{content}</p>
                </div>

                <div class="post-modal-bottom">
                    <div class="bottom-left">
                        <div>
                            <input type="radio" id="isResearch" name='isResearch'
                                onClick={(e) => setResearch(!research)} value="research"
                                checked={research === true ? true : false} />
                            <label for="isResearch" className='isResearch-label' >Consider for research</label>
                        </div>
                    </div>
                    <div class="bottom-right">
                        <div className="post-char-count">
                            <span className={(content.length > 2000 || (content.length === 0)) ? "char-over" : "char-under"}>{content.length} /2000</span>
                        </div>
                        <button type="submit" >Create Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm