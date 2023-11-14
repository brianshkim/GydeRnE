import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get_single_course } from '../../store/courses'

const Course = () => {
    let course = useSelector(state => state.courses)
    let coursemenu = { 1: "Class Notes", 2: "Assignments", 3: "Grades", 4: "Announcements", 5: "Syllabus" }

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_single_course(3))
    }, [dispatch])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [dispatch])

    return (
        <div>
        <div className="course-left-container">
            <div className="course-left">
            <div>{course?.title}</div>
            <div>{course?.content}</div>
            <div>{course?.subject}</div>
            </div>
            <div>
                <ul>
                    <li>Classnotes</li>
                    <li>Assignments</li>
                    <li>Grades</li>
                    <li>Announcements</li>
                    <li>Syllabus</li>
                </ul>
            </div>
        </div>

        <div>

        </div>
        </div>
    )
}

export default Course
