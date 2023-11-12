import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_user } from "../store/session";
import { getUserImage, uploadImage, deleteImage, editImage } from "../store/profilepic";

const  ProfileCardEdit=()=> {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, editFirstName] = useState(sessionUser.firstname);
  const [lastName, editLastName] = useState(sessionUser.lastname);
  const [bio, setBio] = useState(sessionUser.bio);
  const [profilePic, setProfilePic] = useState(sessionUser.profile_image);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const newProfilePic = async (e) => {
    e.preventDefault();
    setErrors([])
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    setImageLoading(true);

    const res = await fetch(`/api/users/${sessionUser.id}/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);

      document.getElementById('uploadProfPic').value = ""

      await dispatch(uploadImage(data.image));
    } else if (!res.ok) {
      setImageLoading(false);
      const data = await res.json();
      setErrors([data.errors]);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };


  //   const handleCancel = () => {
  //     setEditContent(false);
  //     setCurrentGender(sessionUser.gender);
  //   };

  //   const handleEdit = () => {
  //     setEditContent(true);
  //   };

  const editUser = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(update_user(
      sessionUser.id, 
      sessionUser.firstname,
      sessionUser.lastname,
      sessionUser.bio,
      sessionUser.profile_image))
      .then((res) => {
        // setEditContent(false);
      })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          editFirstName(sessionUser.firstname);
          editLastName(sessionUser.lastname);
          setBio(sessionUser.bio);
          setProfilePic(sessionUser.profile_image);
          setErrors(data.errors);
          // setEditContent(false);
        }
    }
  ) 
}




    return (
      <>
        <form onSubmit={editUser}>
          <textarea
            className="edit-firstname"
            onChange={(e) => {
              editFirstName(e.target.value);
            }}
            value={firstName}
          >
            {firstName}
          </textarea>

          <textarea
            className="edit-lastname"
            onChange={(e) => {
              editLastName(e.target.value);
            }}
            value={lastName}
          >
            {lastName}
          </textarea>

          <textarea
            className="edit-profile-bio"
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
          >
            {bio}
          </textarea>

          <form className="upload-pic-form" onSubmit={newProfilePic}>
            <div className="upload-container">
              <label className="upload-text">
                Add new Profile Image:
              </label>
              <input
                id="uploadProfPic"
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={updateImage}

              ></input>
              <button id="upload-button" type="submit">
                <i class="fas fa-file-upload"></i>
              </button>
            </div>
            {imageLoading && (
              <div className="uploading-image-text">
                Uploading Image...
              </div>
            )}
          </form>
          <button type="submit" >Edit</button>
        </form>
      </>
    );
  }

export default ProfileCardEdit
