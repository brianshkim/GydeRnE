import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfilePageCard from "./ProfilePageCard";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  
  return (
    <>
    <ProfilePageCard></ProfilePageCard>
    {/* <sessionUser.name/> */}
    </>
  );
};

export default Profile;
