import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_accomplishments } from '../store/accomplishments'
import { get_education } from '../store/education'
import Accomplishments from './Accomplishments'
import Education from './Education'

const CV = () =>{
    const user = useSelector(state=>state.session.user)
    const dispatch  = useDispatch()
    useEffect(()=>{
        dispatch(get_accomplishments())
        dispatch(get_education())

    }, [dispatch, user])

    return (
        <div>

           <div><Education /></div>
           <div> <Accomplishments /></div>

        </div>
    )

}

export default CV
