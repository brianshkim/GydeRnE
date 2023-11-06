import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_education, update_education, create_education } from '../store/education'

const Education = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const education = useSelector(state => state.education)
    const [undergrad, setUndergrad] = useState([
        {
            degree: "",
            university: "",
            startYear: "",
            endYear: ""

        }
    ])
    const [masters, setMasters] = useState([
        {
            degree: "",
            university: "",
            startYear: "",
            endYear: ""

        }
    ])
    const [postdoc, setPostdoc] = useState([
        {
            degree: "",
            university: "",
            startYear: "",
            endYear: "",
            subject: "",
            thesis: "",
            date: "",
            doctoralAdvistor: "",

        }
    ])


    useEffect(() => {
        dispatch(get_education(user.id))


    }, [dispatch, user])

    const onSubmit = async (e) => {

        e.preventDefault()
        await dispatch(create_education(undergrad, masters, postdoc))

    }

    const handleFormChange = (i, e, school) => {


        if(school==="undergrad"){

        let data = [...undergrad]
        console.log(data[i])
        data[i][e.target.name] = e.target.value
        setUndergrad(data)
        console.log(undergrad)
        }

    }

    const addFields = (e, school) => {
        if (school === "undergrad") {
            let newfield = { degree: '', university: '', startYear: '', endYear: '' }
            setUndergrad([...undergrad, newfield])
        }
        if (school === "masters") {
            let newfield = { degree: '', university: '', startYear: '', endYear: '' }
            setMasters([...masters, newfield])
        }
        if (school === "postdoc") {
            let newfield = { degree: '', university: '', startYear: '', endYear: '', subject: '', thesis: '', date: '', doctoralAdvisor: '' }
            setPostdoc([...postdoc, newfield])
        }

    }

    return (
        <div>
            <div>
                <form>
                    {undergrad.map((undergrad, index) => {
                        return (
                            <div key={"u" - index}>
                                <input
                                    name="degree"
                                    placeholder="Degree"
                                    value={undergrad.degree}
                                    onChange={(e) => handleFormChange(index, e, "undergrad")}
                                />
                                <input
                                    name="university"
                                    placeholder="University"
                                    value={undergrad.university}
                                    onChange={(e) => handleFormChange(index, e, "undergrad")}

                                />
                                <input
                                    name="startYear"
                                    placeholder="Start Year"
                                    value={undergrad.startYear}
                                    onChange={(e) => handleFormChange(index, e, "undergrad")}
                                />
                                <input
                                    name="endYear"
                                    placeholder="End Year"
                                    value={undergrad.endYear}
                                    onChange={(e) => handleFormChange(index, e, "undergrad")}
                                />
                            </div>

                        )
                    })}

                </form>
                <button onClick={e => addFields(e, "undergrad")}>Add more</button>
            </div>
            <div>
                <form>
                    {masters.map((input, index) => {
                        return (
                            <div key={"u" - index}>
                                <input
                                    name="degree"
                                    placeholder="Degree"
                                    value={input.degree}
                                    onChange={(e) => handleFormChange(index, e, "masters")}
                                />
                                <input
                                    name="university"
                                    placeholder="university"
                                    value={input.university}
                                    onChange={(e) => handleFormChange(index, e, "masters")}

                                />
                                <input
                                    name="startYear"
                                    placeholder="Start Year"
                                    value={input.startYear}
                                    onChange={(e) => handleFormChange(index, e, "masters")}
                                />
                                <input
                                    name="endYear"
                                    placeholder="End Year"
                                    value={input.endYear}
                                    onChange={(e) => handleFormChange(index, e, "masters")}
                                />
                            </div>

                        )
                    })}

                </form>
                <button onClick={e => addFields(e, "masters")}>Add more</button>
            </div>
            <div>
                <form>
                    {postdoc.map((input, index) => {
                        return (
                            <div key={"u" - index}>
                                <input
                                    name="degree"
                                    placeholder="Degree"
                                    value={input.degree}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="university"
                                    placeholder="University"
                                    value={input.university}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}

                                />
                                <input
                                    name="startYear"
                                    placeholder="Start Year"
                                    value={input.startYear}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="endYear"
                                    placeholder="End Year"
                                    value={input.endYear}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="subject"
                                    placeholder="subject"
                                    value={input.subject}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="thesis"
                                    placeholder="thesis"
                                    value={input.thesis}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="date"
                                    placeholder="date"
                                    value={input.date}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                                <input
                                    name="postdoctoralAdvisor"
                                    placeholder="postdoctoralAdvisor"
                                    value={input.postdoctoralAdvisor}
                                    onChange={(e) => handleFormChange(index, e, "postdoc")}
                                />
                            </div>

                        )
                    })}

                </form>
                <button onClick={e => addFields(e, "postdoc")}>Add more</button>
            </div>
        </div>
    )

    //const handleClick = (e, data) => {
    //
    //    if (data === "undergrad") {
    //
    //        setDegree_undergrad([...degree_undergrad, {
    //            "university": universityUndergrad,
    //            "degree": degreeUndergrad,
    //            "years": `${undergradStartYear}-${undergradEndYear}`,
    //        }])
    //        console.log(degree_undergrad)
    //    }
    //
    //    if (data === "masters") {
    //        setDegree_masters([...degree_masters, {
    //            "university": universityMasters,
    //            "degree": degreeMasters,
    //            "years": `${mastersStartYear}-${mastersEndYear}`,
    //        }])
    //
    //    }
    //    if (data === "postdoc") {
    //        setDegree_postdoc([...degree_undergrad, {
    //            "university": universityPostdoc,
    //            "degree": degreePostdoc,
    //            "years": `${postdocStartYear}-${postdocEndYear}`,
    //            "subject": subject,
    //            "thesis": thesis,
    //            "doctoral_advisor": doctoralAdvisor,
    //            "date": date
    //
    //        }])
    //
    //    }
    //
    //
    //
    //}

    //
    //    return (
    //        <div>
    //            Create Education
    //            <form onSubmit={onSubmit}>
    //                <div>
    //                    <label>Undergraduate Degree</label>
    //
    //                    <input type="text"
    //                        onChange={((e) => setDegreeUndergrad(e.target.value))}
    //                        value={degreeUndergrad} />
    //
    //                    <label>Undergraduate University</label>
    //                    <input type="text"
    //                        onChange={((e) => setUniversityUndergrad(e.target.value))} />
    //
    //                    <label>Start Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setUndergradStartYear(e.target.value))} />
    //                    <label>End Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setUndergradEndYear(e.target.value))} />
    //                    <button onClick={(e) => handleClick(e, "undergrad")}>Create</button>
    //                </div>
    //                <div>
    //                    <label>Graduate Degree</label>
    //
    //                    <input type="text"
    //                        onChange={((e) => setDegreeMasters(e.target.value))}
    //                        value={degreeMasters} />
    //
    //                    <label>Graduate University</label>
    //                    <input type="text"
    //                        onChange={((e) => setUniversityMasters(e.target.value))} />
    //
    //                    <label>Start Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setMastersStartYear(e.target.value))} />
    //                    <label>End Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setMastersEndYear(e.target.value))} />
    //                    <button onClick={(e) => handleClick(e, "masters")}>Create</button>
    //                </div>
    //                <div>
    //                    <label>Postdoctoral Degree</label>
    //
    //                    <input type="text"
    //                        onChange={((e) => setDegreePostdoc(e.target.value))}
    //                        value={degreeUndergrad} />
    //
    //                    <label>Postdoctoral University</label>
    //                    <input type="text"
    //                        onChange={((e) => setUniversityPostdoc(e.target.value))} />
    //
    //                    <label>Start Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setPostdocStartYear(e.target.value))} />
    //                    <label>End Year</label>
    //                    <input type="text"
    //                        onChange={((e) => setPostdocEndYear(e.target.value))} />
    //                    <input type="text"
    //                        onChange={((e) => setDoctoralAdvisor(e.target.value))} />
    //                    <input type="text"
    //                        onChange={((e) => setSubject(e.target.value))} />
    //                    <input type="text"
    //                        onChange={((e) => setThesis(e.target.value))} />
    //                    <input type="date"
    //                        onChange={((e) => setDate(e.target.value))} />
    //                    <button onClick={(e) => handleClick(e, "postdoc")}>Create</button>
    //                </div>
    //
    //                <button type="submit">Submit</button>
    //            </form>
    //        </div>
    //
    //
    //
    //
    //
    //    )
}

export default Education
