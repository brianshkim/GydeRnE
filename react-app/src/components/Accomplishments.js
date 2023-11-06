import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {create_accomplishment } from '../store/accomplishments'

const Accomplishments = () => {
    const dispatch = useDispatch()
    const accomplishments = useSelector(state => state.accomplishments)
    const user = useSelector(state => state.session.user)
    const [bio, setBio] = useState('')
    const [author, setAuthor] = useState('')
    const [publications, setPublications] = useState('')
    const [awards, setAwards] = useState("")


    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(create_accomplishment(bio, publications, awards))

    }

    const handleClick = (e) => {


    }


    return (
        <div>
            Create Education
            <form onSubmit={onSubmit}>
                <div>
                    <div>
                    <label>Bio</label>

                    <input type="textarea"
                        onChange={((e) => bio(e.target.value))}
                        value={bio} />
                    </div>
                    <div>

                    <label>Publications</label>
                    <input type="text"
                        onChange={((e) => setAuthor(e.target.value))} />


                    </div>

                    <label>Awards</label>
                    <input type="text"
                        onChange={((e) => setUndergradStartYear(e.target.value))} />
                    <label>End Year</label>
                    <input type="text"
                        onChange={((e) => setUndergradEndYear(e.target.value))} />
                    <button onClick={(e) => handleClick(e)}>Create</button>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>





    )
}

export default Accomplishments
