import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import { Textarea } from "../Common/FormsControls/FormsControls";
import {required, MaxLengthCreator, minLength3} from "../../utils/validators/validators";

const maxLength300 = MaxLengthCreator(300)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name={"newMessageBody"} 
                        placeholder={"Enter your message"} 
                        component={Textarea}
                        validate={[required, maxLength300]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map ((d) => <DialogItem name={d.name} key={d.id} id={d.id} /> ) // создает массив с диалогами и их id
    let messagesElements = state.messages.map ((m) => <Message message={m.message} key={m.id} /> ) // создает массив сообщений для дальнейшей их отрисовки 
    let newMessageBody = state.newMessageBody;

    let AddNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to={"/login"} />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <AddMessageFormRedux onSubmit={AddNewMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dialogs;