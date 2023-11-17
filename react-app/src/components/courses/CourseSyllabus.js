import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from 'react-quill'
import { useParams, useHistory } from 'react-router-dom'
import CourseSyllabusEditor from "./CourseSyllabusEditor";
import './syllabus.css'
import parse from 'html-react-parser'


const CourseSyllabus = () => {
    let syllabuses = useSelector(state => state.courses.syllabus)
    let user = useSelector(state=>state.session.user)
    const [newSyllabus, setNewSyllabus] = useState(false)
    let { postid } = useParams()
    let history = useHistory
    let dispatch = useDispatch()
    let syllabus = syllabuses.sort((a, b) => b.id - a.id)[0]

    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [syllabuses])


    return (
        <div className="syllabus-container">
            {!newSyllabus && <button onClick={()=>setNewSyllabus(!newSyllabus)}>Create New Syllabus</button>}
            {newSyllabus && <CourseSyllabusEditor setNewSyllabus={setNewSyllabus}/>}
            {!newSyllabus &&
                <div>
                    {parse(syllabus.content)}
                </div>

            }



        </div>
    )
}

export default CourseSyllabus
