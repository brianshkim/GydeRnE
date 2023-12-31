import { useEffect, useState } from 'react'
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



    const onSubmit = async (e) => {

        e.preventDefault()
        await dispatch(create_education(undergrad, masters, postdoc))

    }

    const handleFormChange = (i, e, school) => {


        if (school === "undergrad") {
            let data = [...undergrad]
            data[i][e.target.name] = e.target.value
            setUndergrad(data)
        }

        if (school === "masters") {
            let data = [...masters]
            data[i][e.target.name] = e.target.value
            setUndergrad(data)
        }

        if (school === "postdoc") {
            let data = [...postdoc]
            data[i][e.target.name] = e.target.value
            setUndergrad(data)

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
                    <h3>Undergraduate</h3>
                    {undergrad.map((undergrad, index) => {
                        return (
                            <div key={`u${index}`}>
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
                    <h3>Masters</h3>
                    {masters.map((input, index) => {
                        return (
                            <div key={`m${index}`}>
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
                <h3>Postdoctoral</h3>
                <form>
                    {postdoc.map((input, index) => {
                        return (
                            <div key={`p${index}`}>
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
            <button onClick={onSubmit}>Submit</button>
        </div>
    )

}

export default Education
