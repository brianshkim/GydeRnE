import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { create_chapters } from '../../store/courses';

const CourseNotes = () => {
    const chapters = useSelector((state) => state.courses.chapters)
    const dispatch = useDispatch()
    const [button, setButton] = useState(true)
    const [title, setTitle] = useState("")
    const {courseId} =useParams()


    const onSubmit = async(e) =>{
        console.log(courseId)
        dispatch(create_chapters(Number(courseId),title ))
        setButton(false)

    }


    return (

        <div>


            <ul>

                {chapters?.map(chapter => (
                    <div>
                        {chapter.title}
                        <ul>
                        {chapter.posts.map(post=>(
                            <div>


                            </div>
                            ))}
                            </ul>
                    </div>
                ))}
            </ul>


            <div>

                <br>
                </br>
                {button &&
                <button onClick={()=>setButton(false)}>Create Chapter</button>

                }
                {!button &&
                <>

                <input
                placeholder="Title"
                value={title}
                onChange={((e)=>setTitle(e.target.value))}
                ></input>
                <button onClick={onSubmit}>Create</button>
                </>

                }
            </div>
        </div>


    )

}

export default CourseNotes
