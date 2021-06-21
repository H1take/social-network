import React from "react";
import {Field, reduxForm} from "redux-form";
import {required, MaxLengthCreator, minLength3} from "../../utils/validators/validators";
import { createField, Input } from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import { login, getCaptchaUrl } from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../Common/FormsControls/FormsControls.module.css";
import s from "./Login.module.css";

const maxLength30 = MaxLengthCreator(30)
const maxLength20 = MaxLengthCreator(20)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
          <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required, maxLength30], Input)}
            {createField("Password", "password", [required, maxLength20], Input, {type: "password"})}
            {createField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember me")}
            <div className={s.captcha}>
            {captchaUrl && <img src={captchaUrl}/>}
            </div>
            <div className={s.captcha}>
            {captchaUrl && createField("Symbols from image", "captcha", [], Input)}
            </div>
              {error && <div className={style.formSummaryError}>
                  {error}
              </div>}
              <div>
                <button>Sign Up</button>
              </div>
          </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

  if (props.isAuth) {
    return <Redirect to={"/profile"} />
  }

    return (
        <div>
          <h1>Login</h1>
          <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    captchaUrl : state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
  }
}



export default connect(mapStateToProps, {login, getCaptchaUrl})(Login);