import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { usersActions } from "../store/users-slice";

export default function FollowBtn({
  userId,
  classes = "py-1 px-4 text-lg font-bold",
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.user.user);

  function following(userId) {
    dispatch(userActions.addFollow(userId));
    dispatch(
      usersActions.addFollower({ userId: userId, newFollower: currentUser.id })
    );
  }

  return (
    <button
      className={
        classes +
        " duration-200 " +
        (currentUser.following.indexOf(userId) !== -1
          ? "italic text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-500"
          : "text-slate-700 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-300")
      }
      onClick={() => following(userId)}
    >
      {currentUser.following.indexOf(userId) !== -1 ? "Followed" : "+ Follow"}
    </button>
  );
}
