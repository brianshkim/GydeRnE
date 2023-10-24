import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import "./SignupModal.css";
import SignUpForm from './SignUpForm';

function SignupFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        id='signupbtn'>
        Sign Up
      </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <SignUpForm />
            </Modal>
          )}
    </>
  );
}

export default SignupFormModal;