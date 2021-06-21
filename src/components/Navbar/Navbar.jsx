import s from "./Navbar.module.css"
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/news" activeClassName={s.activeLink}>News</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/music" activeClassName={s.activeLink}>Music</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink exact to="/users" activeClassName={s.activeLink}>Find users</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
