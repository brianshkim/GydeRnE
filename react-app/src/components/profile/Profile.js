import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import ProfilePageCard from "./ProfilePageCard";
import { load_user } from "../../store/user";
import ProfilePosts from "./ProfilePageContent";
import { get_user_posts } from "../../store/posts";
import ProfileNav from './ProfileNav'

const Profile = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { userId } = useParams()



  if (!sessionUser) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div className='profile-page-wrapper'>
        <div className="profile-page-left">
          <ProfilePageCard />
          <ProfileNav />

        </div>
        <div className="profile-page-right">
          <ProfilePosts />
        </div>
      </div>


    </>
  );
};

export default Profile;
