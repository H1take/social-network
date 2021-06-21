import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  required,
  MaxLengthCreator,
  minLength3,
} from "../../../utils/validators/validators";
import { Textarea } from "../../Common/FormsControls/FormsControls";

const maxLength300 = MaxLengthCreator(300);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.post}>
        <Field
          name={"newPost"}
          placeholder={"your news..."}
          component={Textarea}
          validate={[required, maxLength300]}
        />
      </div>
      <div className={s.but}>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm({
  form: "AddNewPostForm",
})(AddNewPostForm);

const MyPosts = React.memo((props) => {

  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ));

  let AddNewPost = (values) => {
    props.addPost(values.newPost);
  };

  return (
    <div>
      <div className={s.title}>
        <h3>My posts</h3>
      </div>
      <AddNewPostReduxForm onSubmit={AddNewPost} />
      <div>New post</div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;

// class MyPosts extends React.PureComponent {

//   render() {

//     const maxLength300 = MaxLengthCreator(300);

//     const AddNewPostForm = (props) => {
//       return (
//         <form onSubmit={props.handleSubmit}>
//           <div className={s.post}>
//             <Field
//               name={"newPost"}
//               placeholder={"your news..."}
//               component={Textarea}
//               validate={[required, maxLength300]}
//             />
//           </div>
//           <div className={s.but}>
//             <button>
//               <span>Send</span>
//             </button>
//           </div>
//         </form>
//       );
//     };

//     const AddNewPostReduxForm = reduxForm({
//       form: "AddNewPostForm",
//     })(AddNewPostForm);

//       let postsElements = this.props.posts.map((p) => (
//         <Post message={p.message} likesCount={p.likesCount} key={p.id} />))

//       let AddNewPost = (values) => {
//         this.props.addPost(values.newPost);
//       };

//       return (
//         <div>
//           <div className={s.title}>
//             <h3>My posts</h3>
//           </div>
//           <AddNewPostReduxForm onSubmit={AddNewPost} />
//           <div>New post</div>
//           <div className={s.posts}>{postsElements}</div>
//         </div>
//       );
//     };
//   }
