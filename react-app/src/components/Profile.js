import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfilePageCard from "./ProfilePageCard";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  return (
    <>
    <ProfilePageCard></ProfilePageCard>
    </>
  );
};

export default Profile;
