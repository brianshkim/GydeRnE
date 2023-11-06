import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_education, update_education, create_education } from '../store/education'

const Education = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const education = useSelector(state => state.education)
    const [degreeUndergrad, setDegreeUndergrad] = useState('')
    const [universityUndergrad, setUniversityUndergrad] = useState('')
    const [undergradStartYear, setUndergradStartYear] = useState(0)
    const [undergradEndYear, setUndergradEndYear] = useState(0)
    const [degreeMasters, setDegreeMasters] = useState('')
    const [universityMasters, setUniversityMasters] = useState('')
    const [mastersStartYear, setMastersStartYear] = useState(0)
    const [mastersEndYear, setMastersEndYear] = useState(0)
    const [degreePostdoc, setDegreePostdoc] = useState('')
    const [universityPostdoc, setUniversityPostdoc] = useState('')
    const [postdocStartYear, setPostdocStartYear] = useState(0)
    const [postdocEndYear, setPostdocEndYear] = useState(0)
    const [subject, setSubject] = useState(education?.subject || "")
    const [date, setDate] = useState(education?.date || "")
    const [thesis, setThesis] = useState(education?.thesis || "")
    const [doctoralAdvisor, setDoctoralAdvisor] = useState([])
    const [degree_undergrad, setDegree_undergrad] = useState([])
    const [degree_masters, setDegree_masters] = useState([])
    const [degree_postdoc, setDegree_postdoc] = useState([])
    const undergradCount = 1
    const mastersCount = 1
    const postDocCount = 1

    useEffect(() => {
        dispatch(get_education(user.id))


    }, [dispatch, user])

    const onSubmit = async (e) => {
        console.log(degree_undergrad, doctoralAdvisor)
        e.preventDefault()
        await dispatch(create_education(degree_undergrad, degree_masters, degree_postdoc))

    }

    const handleClick = (e, data) => {

        if (data === "undergrad") {

            setDegree_undergrad([...degree_undergrad, {
                "university": universityUndergrad,
                "degree": degreeUndergrad,
                "years": `${undergradStartYear}-${undergradEndYear}`,
            }])
            console.log(degree_undergrad)
        }

        if (data === "masters") {
            setDegree_masters([...degree_masters, {
                "university": universityMasters,
                "degree": degreeMasters,
                "years": `${mastersStartYear}-${mastersEndYear}`,
            }])

        }
        if (data === "postdoc") {
            setDegree_postdoc([...degree_undergrad, {
                "university": universityPostdoc,
                "degree": degreePostdoc,
                "years": `${postdocStartYear}-${postdocEndYear}`,
                "subject": subject,
                "thesis": thesis,
                "doctoral_advisor": doctoralAdvisor,
                "date": date

            }])

        }



    }


    return (
        <div>
            Create Education
            <form onSubmit={onSubmit}>
                <div>
                    <label>Undergraduate Degree</label>

                    <input type="text"
                        onChange={((e) => setDegreeUndergrad(e.target.value))}
                        value={degreeUndergrad} />

                    <label>Undergraduate University</label>
                    <input type="text"
                        onChange={((e) => setUniversityUndergrad(e.target.value))} />

                    <label>Start Year</label>
                    <input type="text"
                        onChange={((e) => setUndergradStartYear(e.target.value))} />
                    <label>End Year</label>
                    <input type="text"
                        onChange={((e) => setUndergradEndYear(e.target.value))} />
                    <button onClick={(e) => handleClick(e, "undergrad")}>Create</button>
                </div>
                <div>
                    <label>Graduate Degree</label>

                    <input type="text"
                        onChange={((e) => setDegreeMasters(e.target.value))}
                        value={degreeMasters} />

                    <label>Graduate University</label>
                    <input type="text"
                        onChange={((e) => setUniversityMasters(e.target.value))} />

                    <label>Start Year</label>
                    <input type="text"
                        onChange={((e) => setMastersStartYear(e.target.value))} />
                    <label>End Year</label>
                    <input type="text"
                        onChange={((e) => setMastersEndYear(e.target.value))} />
                    <button onClick={(e) => handleClick(e, "masters")}>Create</button>
                </div>
                <div>
                    <label>Postdoctoral Degree</label>

                    <input type="text"
                        onChange={((e) => setDegreePostdoc(e.target.value))}
                        value={degreeUndergrad} />

                    <label>Postdoctoral University</label>
                    <input type="text"
                        onChange={((e) => setUniversityPostdoc(e.target.value))} />

                    <label>Start Year</label>
                    <input type="text"
                        onChange={((e) => setPostdocStartYear(e.target.value))} />
                    <label>End Year</label>
                    <input type="text"
                        onChange={((e) => setPostdocEndYear(e.target.value))} />
                    <input type="text"
                        onChange={((e) => setDoctoralAdvisor(e.target.value))} />
                    <input type="text"
                        onChange={((e) => setSubject(e.target.value))} />
                    <input type="text"
                        onChange={((e) => setThesis(e.target.value))} />
                    <input type="date"
                        onChange={((e) => setDate(e.target.value))} />
                    <button onClick={(e) => handleClick(e, "postdoc")}>Create</button>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>





    )
}

export default Education
