import React from "react";
import s from "./ProfileInfo.module.css";
import { Field, reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../Common/FormsControls/FormsControls";
import {required, MaxLengthCreator, minLength3} from "../../../utils/validators/validators";

const maxLength300 = MaxLengthCreator(300)
const maxLength40 = MaxLengthCreator(40)


const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
          <div><button>Save change</button></div>
          {error && <div className={s.formSummaryError}>
                  {error}
          </div>}
          <div>
            <b>Full name :</b> {createField("Full name", "fullName", [required, maxLength40], Input)}
          </div>
          <div>
            <b>About me :</b> {createField("Write about yourself", "aboutMe", [required, maxLength300], Input)}
          </div>
          <div>
            <b>Looking for a job :</b> {createField(null, "lookingForAJob", null, Input, {type: "checkbox"})}
          </div> 
            <div>
              <b>My professional skills :</b> {createField("Write about your professional skills", "lookingForAJobDescription", [required, maxLength300], Textarea)}
            </div>
          <div>
            <b>Contacts :</b> {Object.keys(profile.contacts).map(key => {
              return (
              <div key={key} className={s.contact}>
                <b>{key} :</b> {createField(key, "contacts." + key, [], Input)}
              </div>)
            })}
          </div>
        </form>)
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;