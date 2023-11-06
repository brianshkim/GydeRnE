import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_accomplishments } from '../store/accomplishments'
import { get_education } from '../store/education'
import Accomplishments from './Accomplishments'
import Education from './Education'

const CV = () =>{
    const user = useSelector(state=>state.session.user)
    const dispatch  = useDispatch
    useEffect(()=>{
        dispatch(get_accomplishments(user.id))
        dispatch(get_education(user.id))

    })

    return (
        <div>
            <Accomplishments />
            <Education />

        </div>
    )

}

export default CV
