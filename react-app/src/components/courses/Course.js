import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get_course } from '../../store/courses'

const Course = () => {
    let course = useSelector(state => state.course)
    let coursemenu = {1:"Class Notes", 2:"Assignments", 3:"Grades",4:"Announcements", 5:"Syllabus"}

    let dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_course(courseid))
    }, [dispatch])

    useEffect(() => {

        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [dispatch])

    return (
        <div>
            <div>{course?.title}</div>
            <div>{course?.content}</div>
            <div>{course?.subject}</div>

        </div>
    )
}

export default Course
