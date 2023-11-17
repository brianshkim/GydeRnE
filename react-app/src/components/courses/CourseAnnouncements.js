import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import { get_single_course } from '../../store/courses'
import { create_announcement } from "../../store/courses";

const CourseAnnouncements = () => {
    const course = useSelector(state => state.courses)
    const user = useSelector(state=>state.session.user)

    const [button, setButton] = useState(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { courseId } = useParams()
    const d = new Date()
    const months = {0:"Jan", 1:"Feb", 2:"Mar", 3:"Apr", 4:"May", 5:"Jun", 6:"Jul", 7:"Aug", 8:"Sep", 9:"Oct", 10:"Nov", 11:"Dec"}

    const getDate = (date)=>{
        let d = new Date(date)
        let thisYear = new Date().getFullYear()
        let timeOfDay = d.getHours() >= 12 ? "pm":"am"
        let hours = d.getHours() === 0 || d.getHours()===12 ? 12 : d.getHours()%12
        let minutes =  d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes()
        if(d.getFullYear()===thisYear){
            return `${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes} ${timeOfDay}`
        }
    }

    let announcements = course.announcements
    announcements?.sort((a, b) => b.id - a.id)


    const onSubmit = async (e) => {
        console.log(courseId)
        dispatch(create_announcement(Number(courseId), title, content, d.getTime()))
        setButton(false)
        setTitle("")
        setContent("")

    }


    let history = useHistory()
    let dispatch = useDispatch()

    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [course])


    return (
        <div className="course-announcement-container">
            <div>Announcements</div>
            <ul className="course-announcement-box">

                {course.professor.id === user.id && button &&
                    <button onClick={() => setButton(false)}>Create Announcements</button>

                }
                {!button &&
                    <>

                        <input
                            placeholder="Title"
                            value={title}
                            onChange={((e) => setTitle(e.target.value))}
                        ></input>
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={((e) => setContent(e.target.value))}
                        />
                        <button onClick={onSubmit}>Create</button>
                    </>

                }
                {announcements?.map((announcement, index) => (
                    <li key={`a${index}`} className="course-announcement-single" >
                        <div>
                            <span>
                                {`${course.professor.firstname} ${course.professor.lastname}`}
                            </span>
                            <span>
                                <img src={course.professor.profile_image ? course.professor.profile_image : '/' } alt=" "/>

                            </span>
                        </div>
                        <div>
                            <span>{announcement.title}</span>
                            <span>{getDate(announcement.created_at)}</span>
                            {announcement.modified_at ? <span>{getDate(announcement.modified_at)}</span> : null}
                        </div>
                        <div>{announcement.content}</div>

                    </li>

                ))

                }
            </ul>

        </div>
    )
}

export default CourseAnnouncements
