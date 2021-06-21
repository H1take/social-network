import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../assets/images/logo.png";

const Header = (props) => {
    return (
    <div className={s.header}>
    <img src = {logo}/>
    <div className={s.nameProject}>
        REACT
    </div>
        <div className={s.loginBlock}>
            {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Logout</button> </div>:<NavLink to={"/login"}>Login</NavLink>}
        </div>
    </div>
    );
}

export default Header;




