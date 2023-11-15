import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create_post } from '../../store/posts';
import { Redirect, useHistory } from 'react-router-dom'
import './CreatePostModal.css'
import DragAndDrop from './DragAndDrop';


const CreatePostForm = ({ resp_id }) => {

    let user = useSelector(state => state.session.user);
    let history = useHistory()
    const dispatch = useDispatch();
    // const [image, setImage] = useState("");
    let [title, setTitle] = useState('')
    let [content, setContent] = useState('');
    let [research, setResearch] = useState(false)
    let [abstract, setAbstract] = useState('')
    let [researchPaper, setResearchPaper] = useState(null);
    let [images, setImages] = useState([])
    let [urls, setUrls] = useState([])
    let [i, setI] = useState(0)
    let [fileLoading, setFileLoading] = useState(false)
    let [imageLoading, setImageLoading] = useState(false)
    let [imageError, setImageError] = useState({})
    const d = new Date()



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
//
//    useEffect(()=>{
//        let newimages = []
//
//        images.forEach(async (image,index) => {
//
//            const formData = new FormData();
//            formData.append("image", image);
//            const res = await fetch(`/api/posts/uploadimages`, {
//              method: "POST",
//              body: formData,
//            });
//            const data = await res.json()
//            newimages.push(data.url)
//
//
//
//    })
//
//
//    setUrls(newimages)
//
//},[images])

    // const removeImage = (e) => setImage(null);

    // const reset = () => setContent('');
    console.log(images)



    const handleSubmit = async (e) => {
        e.stopPropagation()
        e.preventDefault();




        const formData = new FormData();
        if (researchPaper) {
            formData.append("pdf", researchPaper);
            setFileLoading(true)
            const res = await fetch(`/api/posts/uploadpdf`, {
                method: "POST",
                body: formData,
            });
            if (res.ok && fileLoading) {
                let data = await res.json();
                setFileLoading(false);
                console.log(title, abstract, content, research)
                let newpost=await dispatch(create_post(title, abstract, content, research, data.url, urls,d.getTime()))
                history.push(`/users/${user.id}/posts/${newpost.id}`)
            }
            else {
                setFileLoading(false);
                console.log("error");
            }
        }
        else{
            let newpost=await dispatch(create_post(title, abstract, content, research, null, urls,d.getTime()))
            history.push(`/users/${user.id}/posts/${newpost.id}`)

        }





    }



    // const newPost = {
    //     user_id: user.id,
    //     title,
    //     content,
    //     research: true
    //     image_url: image
    // }
    // const post = await dispatch(create_post(newPost))

    // if (post) {
    //     reset();
    //     removeImage();
    // }
    //}

    const updateResearchPaper = (e) => {
        const file = e.target.files[0]
        setResearchPaper(file);

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
                        placeholder='Abstract'
                        type="text"
                        className="post-abstract"
                        onChange={(e) => setAbstract(e.target.value)}
                        value={abstract} />
                </div>


                <div className='post-input-box'>
                    <textarea
                        placeholder='Write your post here...'
                        className="post-area"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}


                    />
                    <div className='post-preview-header'>
                        Post Preview:
                    </div>
                    <p id="preview" className="post-area-preview">{content}</p>
                </div>



                <div class="post-modal-bottom">
                    <div class="bottom-left">
                        <div>
                            <input type="radio" id="isResearch" name='isResearch'
                                onClick={(e) => setResearch(!research)} value="research"
                                checked={research === true ? true : false} />
                            <label for="isResearch" className='isResearch-label' >Consider for research</label>
                        </div>
                        <form>
                            <div className="file-input">
                                <input id="file" type="file" accept="application/pdf" onChange={(e) => updateResearchPaper(e)} />
                                <label htmlFor="file">Upload file</label>
                            </div>
                        </form>
                    </div>
                    {/*<DragAndDrop setImages={setImages} images={images} setImageLoading={setImageLoading} />*/}
                    <div class="bottom-right">
                        <div className="post-char-count">
                            <span className={(content.length > 2000 || (content.length === 0)) ? "char-over" : "char-under"}>{content.length} /2000</span>
                        </div>
                    </div>
                </div>
                <button className='submit-post' type="submit" >Create Post</button>
            </form>
        </div>
    )
}

export default CreatePostForm
