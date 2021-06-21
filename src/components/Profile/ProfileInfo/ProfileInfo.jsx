import React, {useState, useEffect} from "react";
import s from "./ProfileInfo.module.css";
import "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user-image.png";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import { checkPropTypes } from "prop-types";

const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contact}><b>{contactTitle} :</b>{contactValue}</div>
}

const ProfileData = ({profile, updateStatus, status, isOwner, goToEditMode}) => {
    return (
      <div>
        { isOwner && 
          <div className={s.but}>
            <button onClick={goToEditMode}>Change profile</button>
          </div>
        }
        <div>
          <b>Full name :</b> {profile.fullName}
        </div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        <div>
          <b>About me :</b> {profile.aboutMe}
        </div>
        <div>
          <b>Looking for a job :</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob && 
          <div>
            <b>My professional skills :</b> {profile.lookingForAJobDescription}
          </div>
          }
        <div>
          <b>Contacts :</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
          })}
        </div>
      </div>)
}

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  const onMainPhotoSelected = (e) => {
    debugger;
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.mainPhoto}>
          <img src={profile.photos.large || userPhoto} />
        </div>
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
          { editMode 
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
          : <ProfileData updateStatus={updateStatus} 
                         status={status} 
                         profile={profile}
                         isOwner={isOwner}
                         goToEditMode={() => {setEditMode(true)}} />}
      </div>
    </div>
  );
};

export default ProfileInfo;
