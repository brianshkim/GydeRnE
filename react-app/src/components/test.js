 import React, { useState, useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import {MathComponent} from 'mathjax-react'
 import { Redirect } from 'react-router-dom';
 import { login } from '../store/session';
 import { get_education, create_education, update_education } from '../store/education';
 const Test = () => {
   const user = useSelector(state => state.session.user)
   const education = useSelector(state => state.education)
   const [degreeUndergrad, setDegreeUndergrad] = useState('')
   const [universityUndergrad, setUniversityUndergrad] = useState('')
   const [degreeMasters, setDegreeMasters] = useState('')
   const [universityMasters, setUniversityMasters] = useState('')
   const [degreePostdoc, setDegreePostdoc] = useState('')
   const [universityPostdoc, setUniversityPostdoc] = useState('')
   const [subject, setsubject] = useState(education?.subject)
   const [date, setdate] = useState(education?.date)
   const [thesis, setthesis] = useState(education?.thesis)
   const [doctoralAdvisor, setDoctoralAdvisor] = useState([])
   const [degree_undergrad, setDegree_undergrad] = useState([])
   const [university_undergrad, setUniversity_undergrad] = useState([])
   const [degree_masters, setDegree_masters] = useState([])
   const [university_masters, setUniversity_masters] = useState([])
   const [degree_postdoc, setDegree_postdoc] = useState([])
   const [university_postdoc, setUniversity_postdoc] = useState([])
   const [image, setImage] = useState(null);
   const [imageLoading, setImageLoading] = useState(false)
   const [tex, setTex] = useState('f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi')
   //const [avatarurl, setavatarurl] = useState(user.profileImage)

   let dispatch = useDispatch()
   useEffect(() => {
     dispatch(get_education(user.id))
   }, [dispatch, user.id])
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
     await dispatch(update_education(education.id, degree_undergrad, university_undergrad, [], [], [], [], doctoralAdvisor))
   }
   const handleSubmit = async (e, imageset) => {
     e.preventDefault()
     e.stopPropagation()
     console.log(image)
     const formData = new FormData();
     formData.append("image", image);
     console.log(image)
     setImageLoading(true)
     const res = await fetch(`/api/users/${user.id}/upload`, {
         method: "POST",
         body: formData,
     });
     if (res.ok) {
         let data = await res.json();
         console.log(data)
         setImageLoading(false)
     }
     else {
         setImageLoading(false);
         // a real app would probably use more advanced
         // error handling
         let data = await res.json()
         console.log(data.errors)
     }
    }

   const updateImage = (e) => {
     const file = e.target.files[0]
     setImage(file);
     console.log(image)
     }

   return (
     <div>
       Create Education
       <form onSubmit={onSubmit}>
         <label>Undergraduate Degree</label>
         {education.degree_undergrad?.map(degree => (

           <input type="text"
             onChange={((e) => setDegreeUndergrad(e.target.value))}
             placeholder={degree}
             value={degreeUndergrad}
           />

         ))}
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

       <MathComponent tex={tex} />


        <textarea value={tex} onChange={(e)=>setTex(e.target.value)}/>
     </div>
   );
 }

 export default Test
