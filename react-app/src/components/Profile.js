import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import ProfilePageCard from "./ProfilePageCard";
import { load_user } from "../store/user";
import ProfilePosts from "./ProfilePageContent";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);



  if (!sessionUser) {
    return <Redirect to='/login' />
  }

  return (
    <>
    <div className='profile-page-wrapper'>
<div className="profile-page-left">
      <ProfilePageCard/>
    </div>
    <div className="profile-page-right">
      <ProfilePosts/>
    </div>
    </div>


    </>
  );
};

export default Profile;
