import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get_course } from '../../store/courses'

const Course = () => {
    let course = useSelector(state => state.course)
    let coursemenu = {1:"", 2:"", 3:"",4:""}

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
            <div>
                <div>Comments</div>
                {post?.comments?.map(comment =>
                <div>
                    <div>{comment.content}</div>
                    <button onClick={e=>deleteComment(e,comment.id)}>Delete</button>
                    <CommentCreate originalpost={post.id} postid={comment.id}/>
                    <div>{comment.comments.length>0 ? nestedComments(comment.comments): null}</div>


                </div>
                )}</div>

            <div>

                <CommentCreate originalpost={post.id} postid={post.id}/>
            </div>
        </div>
    )
}

export default Course
