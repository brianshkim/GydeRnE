import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_education } from '../store/education'
import { get_accomplishments } from '../store/accomplishments'

const CV = () => {
    const dispatch = useDispatch()
    const accomplishments = useSelector(state => state.accomplishments)
    const education = useSelector(state => state.education)
    const user = useSelector(state => state.session.id)

    useEffect(() => {
        dispatch(get_education(user.id))
        dispatch(get_accomplishments(user.id))

    })

    const onSubmit = async (e) => {
        console.log(degree_undergrad, university_undergrad, doctoralAdvisor)
        e.preventDefault()
        await dispatch(update_education(education.id, degree_undergrad, university_undergrad, [], [], [], [], doctoralAdvisor))

    }


    return (
        <div>
            Create Education
            <form onSubmit={onSubmit}>
                <label>Undergraduate Degree</label>
                {education.degree_undergrad?.map(degree =>
                    <input type="text"
                        onChange={((e) => setDegreeUndergrad(e.target.value))}
                        placeholder={degree}
                        value={degreeUndergrad}
                    />

                )}
                <input type="text"
                    onChange={((e) => setDegreeUndergrad(e.target.value))}
                    value={degreeUndergrad} />
                <button onClick={add}>Create</button>
                <label>Undergraduate University</label>
                <input type="text"
                    onChange={((e) => setUniversityUndergrad(e.target.value))} />
                <button onClick={add2}>Create</button>
                <label>doctoralAdvisor</label>
                <input type="text"
                    onChange={((e) => setDoctoralAdvisor(e.target.value))} />
                <button type="submit">Submit</button>
            </form>
        </div>





    )

    export default CV
