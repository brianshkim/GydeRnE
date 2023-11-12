import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { getUserImage } from "../store/profilepic";
import usertempimage from "../components/images/usertempimage.jpg"
import { Modal } from "./context/Modal";
import ProfileCardEdit from "./ProfileCardEdit";
import "./Profile.css";

const ProfilePageCard = () => {

  const users = useSelector(state => state.users);
  const usersArray = (Object.values(users))[0].users;
  const { userId } = useParams();
  const user = usersArray[userId];

  const dispatch = useDispatch(); //for dispatching friend requests later
  const sessionUser = useSelector((state) => state.session.user);
  const profilePicture = user?.profile_image;
  const [showModal, setShowModal] = useState(false);
  
  //const [loaded, setLoaded] = useState(false);

  const ProfileEditButton = () => {
    return (
        <>
        <button onClick={() => setShowModal(true)}
          className = 'profile-edit-button'>
          <i class="fa-solid fa-pen"></i>
        </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <ProfileCardEdit />
              </Modal>
            )}
      </>
    );
  };

  return (
    <>
    <div className="profile-card-wrapper">

      <div className="frame">
        {sessionUser.id === Number(userId) && <ProfileEditButton />}
          <div className="fullname">{user?.firstname} {user?.lastname}</div>
          <div className="role-title">
            {user?.role_title ? 'Professor' : 'Student'} at {user?.school_name}</div>
          <div className="username">@{user?.username}</div>
          <div className='profile-picture'>
            {profilePicture && (
              <img
                alt="profile"
                className="profile-picture"
                src={profilePicture.imgUrl}
              ></img>

              )}
              {!profilePicture && (
              <img
                alt="unknown"
                className="profile-picture"
                src={usertempimage}
              ></img>

              )}
            </div>
      </div>
      <div className="profile-bio-wrapper">
        <p className="bio-text">
            Bio: {user?.bio}
        </p>
      </div>
    </div>

    </>
  );
}
export default ProfilePageCard;
