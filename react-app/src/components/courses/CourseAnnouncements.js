import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import { get_single_course } from '../../store/courses'

const CourseAnnouncements = () => {
    let course = useSelector(state => state.courses)
    let announcements = course.announcements
    let [newAnnouncement, setNewAnnouncement] ={
        title: "",
        content:"",

    }

    let history=useHistory()
    let dispatch = useDispatch()

    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [course])


    return (
        <div className="course-announcement-container">
            <ul className="course-announcement-box">
            {announcements.map((announcement, index)=>(
                <li key={`a${index}`} className="course-announcement-single" >
                    <div>{announcement.title}</div>
                    <div>{announcement.content}</div>

                </li>

            ))



            }
            </ul>

            <button>Create</button>

        </div>
    )
}

export default CourseAnnouncements
