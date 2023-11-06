import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_education, update_education } from '../store/education'
import { get_accomplishments } from '../store/accomplishments'

const Accomplishments = () => {
    const dispatch = useDispatch()
    const accomplishments = useSelector(state => state.accomplishments)
    const user = useSelector(state => state.session.user)
    const [degreeUndergrad, setDegreeUndergrad] = useState('')
    const [universityUndergrad, setUniversityUndergrad] = useState('')
    const [undergradStartYear, setUndergradStartYear] = useState(0)
    const [undergradEndYear, setUndergradEndYear] = useState(0)


    useEffect(() => {
        dispatch(get_education(user.id))


    }, [dispatch, user])

    const onSubmit = async (e) => {
        console.log(degree_undergrad, doctoralAdvisor)
        e.preventDefault()
        await dispatch(update_education(education.id, degree_undergrad, [], [], [], [], doctoralAdvisor))

    }

    const handleClick = (e, data) => {

        if (data === "degreeundergrad") {

            setDegree_undergrad([...degree_undergrad, {
                "university": universityUndergrad,
                "degree": degreeUndergrad,
                "Years": `${undergradStartYear}-${undergradEndYear}`,
            }])
            console.log(degree_undergrad)
        }

        if (data === "degreeuniversityundergrad") {
            setDegree_masters([...degree_undergrad, degreeUndergrad])

        }
        if (data === "degreeuniversityundergrad") {
            setDegree_masters([...degree_undergrad, degreeUndergrad])

        }
        if (data === "degreeuniversityundergrad") {
            setDegree_masters([...degree_undergrad, degreeUndergrad])

        }
        if (data === "degreeuniversityundergrad") {
            setDegree_masters([...degree_undergrad, degreeUndergrad])

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
                    <button onClick={(e) => handleClick(e, "degreeundergrad")}>Create</button>
                </div>
                <label>doctoralAdvisor</label>
                <input type="text"
                    onChange={((e) => setDoctoralAdvisor(e.target.value))} />
                <input type="text"
                    onChange={((e) => setDegreeUndergrad(e.target.value))}
                    value={degreeUndergrad} />
                <button onClick={(e) => handleClick(e, "")}>Create</button>
                <label>Undergraduate University</label>
                <input type="text"
                    onChange={((e) => setUniversityUndergrad(e.target.value))} />
                <button onClick={(e) => handleClick(e, "")}>Create</button>
                <label>doctoralAdvisor</label>
                <input type="text"
                    onChange={((e) => setDoctoralAdvisor(e.target.value))} />
                <input type="text"
                    onChange={((e) => setDegreeUndergrad(e.target.value))}
                    value={degreeUndergrad} />
                <button onClick={(e) => handleClick(e, "")}>Create</button>
                <label>Undergraduate University</label>
                <input type="text"
                    onChange={((e) => setUniversityUndergrad(e.target.value))} />
                <button onClick={(e) => handleClick(e, "")}>Create</button>
                <label>doctoralAdvisor</label>
                <input type="text"
                    onChange={((e) => setDoctoralAdvisor(e.target.value))} />
                <button type="submit">Submit</button>
            </form>
        </div>





    )
}

export default Accomplishments
