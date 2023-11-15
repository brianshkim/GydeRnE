import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import Assignment from "./Assignment";
import { get_single_course } from '../../store/courses'

const CourseAssignments = () => {
    let course = useSelector(state => state.courses)
    let {postid} = useParams()
    let history=useHistory
    let dispatch = useDispatch()

    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [course])


    return (
        <div className="assignments-container">
            <ul className="assignments-box">
            {course?.assignments.map(assignment=>(
                <li key={assignment.id} className="assignments-single" onClick={()=>history.push(`/assignments/${1}`)} >
                    <div>{assignment.title}</div>
                    <div>{assignment.content}</div>
                    <div>{assignment.total_score}</div>
                </li>

            ))



            }
            </ul>

        </div>
    )
}

export default CourseAssignments
