import s from "./../Dialogs.module.css"
import { NavLink } from 'react-router-dom';

// компонента которая отрисовывает диалоги 

const DialogItem = (props) => {
    return (
    <div className={`${s.dialog} ${s.active}`}>
        <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg"/>
        <NavLink to={`/dialogs/${props.id}`} activeClassName={s.activeDialog}>{props.name}</NavLink> 
    </div>
    );
}

export default DialogItem;