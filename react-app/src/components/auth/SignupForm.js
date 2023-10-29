import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../context/AuthModals.css';

const SignupForm = () => {

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [professor, setProfessor] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateProfessor = (e) => {
    setProfessor(e.target.value);
  };

  const updateSchoolName = (e) => {
    setSchoolName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='form-container' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <h3 className='authmodal-header'>
        Sign Up with Gyde
      </h3>

      <div className='form-item'>
        <i class="favicon fa-solid fa-user-pen"></i>
        <input
          className='form-item-input'
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        />
      </div>

      <div className='form-item'>
        <i class="favicon fa-solid fa-user"></i>
        <input
          className='form-item-input'
          type='text'
          name='firstname'
          placeholder='First Name'
          onChange={updateFirstName}
          value={firstname}
        ></input>
      </div>

      <div className='form-item'>
        <i class="favicon fa-solid fa-user"></i>
        <input
          className='form-item-input'
          type='text'
          name='lastname'
          placeholder='Last Name'
          onChange={updateLastName}
          value={lastname}
        ></input>
      </div>

      <div className='form-item-bool'>
        <i className="isProfLabel">I am a:</i>

        <div className="isprof-selection">
          <div>
            <input type="radio" id="isStudent" name='isStudent'
              onClick={updateProfessor} value={professor}
              checked={setProfessor=== true? false : false} />
            <label for="isStudent">Student</label>

          </div>
          <div>
            <input type="radio" id="isProfessor" name='isProfessor'
              onClick={updateProfessor} value={professor} 
              checked={setProfessor=== false? true : true} />
            <label for="isProfessor">Professor</label>
          </div>
        </div>
      </div>


      <div className='form-item'>
        <i class="favicon fa-solid fa-graduation-cap"></i>
        <input
          className='form-item-input'
          type='text'
          name='schoolname'
          placeholder='School Name'
          onChange={updateSchoolName}
          value={schoolName}
        />
      </div>

      <div className='form-item'>
        <i className="favicon fa-regular fa-envelope"></i>
        <input
          className='form-item-input'
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>

      <div className='form-item'>
        <i class="favicon fa-solid fa-lock"></i>
        <input
          className='form-item-input'
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>

      <div className='form-item'>
        <i class="favicon fa-solid fa-lock"></i>
        <input
          className='form-item-input'
          type='password'
          name='repeat_password'
          placeholder='Repeat Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>

      </div>
      <button className='modal-submit' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignupForm;
