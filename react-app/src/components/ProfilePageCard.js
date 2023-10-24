import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   uploadImage,
//   deleteImage,
// } from "../store/profileImages";
import usertempimage from "../components/images/usertempimage.jpg"
import "./Profile.css";

function ProfilePageCard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const userProfile = useSelector((state) => state.profileImages);
  // const userImagesArr = Object.values(userImages);


  return (
    <>
    <div className="profile-head-default">
      <div className="frame">
        <div className="div">
          <div className="text-wrapper">Taaral Contractor</div>
          <div className="text-wrapper-2">Professor at Stanford University</div>
          <div className="text-wrapper-2">@taaralcontractor</div>
        </div>
      </div>
            {/* {userImagesArr[0] && (
              <img
                alt="profile"
                className="profile-picture"
                src={userImagesArr[0].imgUrl}
              ></img>

              )}
              {userImagesArr.length === 0 && (
              <img
                alt="unknown"
                className="profile-picture"
                src={usertempimage}
              ></img>
              )} */}

      <div className="user-info">
        <p className="lorem-ipsum-dolor">
          <span className="span">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien metus, ultrices at nulla quis, porta
            dapibus arcu. Aenean feugiat tincidunt nulla consectetur pretium. Nam suscipit, libero nec porttitor
            volutpat{" "}
          </span>
          <span className="text-wrapper-3">Read more</span>
        </p>
      </div>
    </div>


    <div className="profile-card">
      <div className="profile-card-top">
        Testing
      </div>
    </div>
    </>
  );
}
export default ProfilePageCard;
