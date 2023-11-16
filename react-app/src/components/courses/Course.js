import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseAssignments from './CourseAssignments'
import CourseNotes from './CourseNotes'
import CourseAnnouncements from "./CourseAnnouncements";
import { get_single_course } from '../../store/courses'
import './course.css'

const Course = () => {
    let course = useSelector(state => state.courses)
    let courseMenu = { 1: "Class Notes", 2: "Assignments", 3: "Grades", 4: "Announcements", 5: "Syllabus" }
    let [menuItem, setMenuItem] = useState(0)

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_single_course(1))
    }, [dispatch])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [dispatch])

    return (
        <div className="course-container">
            <div className="course-left-container">
                <div className="course-left">
                    <div>{course?.title}</div>
                    <div>{course?.content}</div>
                    <div>{course?.subject}</div>
                    <div>{`${course?.professor?.firstname} ${course?.professor?.lastname}`}</div>
                </div>
                <div>
                    <ul>
                        <li onClick={()=>setMenuItem(1)}>Class Notes</li>
                        <li onClick={() => setMenuItem(2)}>Assignments</li>
                        <li >Grades</li>
                        <li onClick={() => setMenuItem(4)}>Announcements</li>
                        <li>Syllabus</li>
                    </ul>
                </div>
            </div>

            <div className="course-right-container">
                {menuItem === 1 && <CourseNotes />}
                {menuItem === 2 && <CourseAssignments />}
                {menuItem === 4 && <CourseAnnouncements/> }

            </div>
        </div>
    )
}

export default Course
