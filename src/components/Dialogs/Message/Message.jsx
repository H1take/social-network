import s from "./../Dialogs.module.css"
import React from "react"

// компонента которая отрисовывает сообщения с определенными пользователями 

const Message = (props) => {

    // let newMessageElement = React.createRef()

    // let addMessage = () => {
    //     let text = newMessageElement.current.value;
    //     alert (text)
    // }

    return (
        <div className={s.dialog}>
            <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg"/>
            {props.message}
        </div>
    );
}

export default Message;