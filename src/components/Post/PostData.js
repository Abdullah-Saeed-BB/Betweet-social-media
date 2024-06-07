import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../../store/posts-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PostData({ postId, postLikes, commentMuch }) {
  const currentUser = useSelector((s) => s.user.user.id);
  const dispatch = useDispatch();

  const addLike = (postId) => {
    dispatch(
      postsActions.addLike({
        currentUser: currentUser,
        postId: postId,
      })
    );
  };

  return (
    <div className="flex gap-8">
      <button
        onClick={() => addLike(postId)}
        className={`${
          postLikes.indexOf(currentUser) !== -1
            ? "text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            : "text-red-400 hover:text-red-500 darktext-red-200 dark:hover:text-red-300"
        } duration-300`}
      >
        <FontAwesomeIcon icon={faHeart} />
        <span className="ml-2">{postLikes.length}</span>
      </button>
      <Link
        to={"/post/" + postId}
        className="text-slate-500 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-400 duration-200"
      >
        <FontAwesomeIcon icon={faComment} />
        <span className="ml-2">{commentMuch}</span>
      </Link>
    </div>
  );
}
