import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/session';
import { get_education, create_education } from '../store/education';
const Test = () => {
  const user = useSelector(state=> state.session.user)
  const [degreeUndergrad, setDegreeUndergrad] = useState('')
  const [universityUndergrad, setUniversityUndergrad] = useState('')
  const [doctoralAdvisor, setDoctoralAdvisor] = useState('')
  const [degree_undergrad, setDegree_undergrad] = useState([])
  const [university_undergrad, setUniversity_undergrad] = useState([])



  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_education(user.id))


  }, [dispatch, user.id]);

  const add = (e) => {
    setDegree_undergrad([...degree_undergrad, degreeUndergrad])
    console.log(degree_undergrad)
    e.preventDefault()
    e.stopPropagation()

  }

  const add2 = (e) => {
    setUniversity_undergrad([...university_undergrad, universityUndergrad])
    console.log(university_undergrad)
    e.preventDefault()
    e.stopPropagation()


  }

  const onSubmit = async (e) => {
    console.log(degree_undergrad, university_undergrad, doctoralAdvisor)
    e.preventDefault()
    let response = await dispatch(create_education(degree_undergrad, university_undergrad, [], [], [], [], doctoralAdvisor))

  }




  return (
    <div>
      Create Education
      <form onSubmit={onSubmit}>
      <label>Undergraduate Degree</label>
      <input type="text"
        onChange={((e) => setDegreeUndergrad(e.target.value))} />
      <button onClick={add}>Create</button>
      <label>Undergraduate University</label>
      <input type="text"
        onChange={((e) => setUniversityUndergrad(e.target.value))} />
      <button onClick={add2}>Create</button>
      <label>doctoralAdvisor</label>
      <input type="text"
        onChange={((e) => setDoctoralAdvisor(e.target.value))} />
      <button type = "submit">Submit</button>

      </form>





    </div>

  );
};

export default Test;
