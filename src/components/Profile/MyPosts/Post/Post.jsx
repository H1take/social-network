import s from "./Post.module.css"


const Post = (props) => {
  return (
        <div className={s.item}>
        <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg"/>
          {props.message}
          <div>
          <span>like</span>{props.likesCount}
          </div>
        </div>
  );
};

export default Post;
