import './CreatePostModal.css';
import React, { useState } from 'react'
import { Modal } from '../context/Modal.js';
import CreatePostForm from './CreatePostForm.js';

const CreatePostButton = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}
            className = 'nav-create-post-button'>
            + Create Post
            </button>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePostForm />
                </Modal>
                )}
        </>
    )
}

export default CreatePostButton