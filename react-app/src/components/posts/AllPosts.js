import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create_post } from '../../store/posts'
const PostCreate = ({ resp_id }) => {
    let user = useSelector(state => state.session.user)
    let dispatch = useDispatch()
    let [title, setTitle] = useState('')
    let [content, setContent] = useState('')
    let [abstract, setAbstract] = useState('')
    let [research, setResearch] = useState('')
    let [researchPaper, setResearchPaper] = useState(null);
    let [fileLoading, setFileLoading] = useState(false)


    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [title, content])



    const handleSubmit = async (e) => {

        e.stopPropagation()
        e.preventDefault()
        const formData = new FormData();
        formData.append("pdf", researchPaper);
        setFileLoading(true)
        const res = await fetch(`/api/posts/upload`, {
            method: "POST",
            body: formData,
        });
        if (res.ok && fileLoading) {
            let data = await res.json();
            console.log(data)

            setFileLoading(false);
            dispatch(create_post(title, abstract, content, research, data.url))


        }
        else {
            setFileLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }



    }


    const updateResearchPaper = (e) => {
        const file = e.target.files[0]
        setResearchPaper(file);

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
                        onChange={(e) => setAbstract(e.target.value)}
                        value={abstract} />
                    <p>{abstract}</p>
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
                <form><div className="file-input"><input id="file" type="file" accept="application/pdf" onChange={(e) => updateResearchPaper(e)} /> <label htmlFor="file">
                    Edit User Avatar
                </label></div>
                </form>
                <button type="submit" >Create Post</button>
            </form>





        </div>


    )
}

export default PostCreate
