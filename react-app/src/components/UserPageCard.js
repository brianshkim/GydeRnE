import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getUserImage } from "../store/profilepic";
import usertempimage from "../components/images/usertempimage.jpg"
import { Modal } from "./context/Modal";
import "./Profile.css";

function UserPageCard() {
    // const userImage = useSelector((state) => state.profileImages);
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const history = useHistory()
    const profilePicture = useSelector((state) => state.session.user?.profile_image);
    const [loaded, setLoaded] = useState(false);

  return (
    <>
    <div className="profile-card-wrapper">

      <div className="frame">
        <ProfileEditButton />
          <div className="fullname">{sessionUser?.firstname} {sessionUser?.lastname}</div>
          <div className="role-title">
            {sessionUser?.role_title ? 'Professor' : 'Student'} at {sessionUser?.school_name}</div>
          <div className="username">@{sessionUser?.username}</div>

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
            Bio: {sessionUser?.bio}
        </p>
      </div>
    </div>

    </>
  );
}
export default UserPageCard;
