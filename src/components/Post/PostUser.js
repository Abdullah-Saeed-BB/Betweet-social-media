import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn";
import ProfileLogo from "../ProfileLogo";
import datetimeToAgo from "../../datetimeToAgo";

export default function PostUser({ userId, postDatetime }) {
  const { isLoading, users, err } = useSelector((s) => s.users);
  const userData = users.find((u) => u.id === userId);
  const currentUser = useSelector((s) => s.user.user);

  return (
    <div className="flex flex-row justify-between w-full">
      {isLoading && <span>Loading</span>}
      {err && (
        <span className="flex items-center gap-3">
          <div
            alt="Profile logo"
            className="size-12 bg-contain rounded-full border-4 border-slate-800 outline outline-1 outline-slate-500"
          />
          <p>Can't load this user</p>
        </span>
      )}
      {userData && (
        <Link
          to={`/profile/${userId}`}
          className="group *:duration-200 flex items-center gap-4"
        >
          <ProfileLogo userId={userId} />
          <div>
            <h2>
              <span className="sm:text-xl text-lg line-clamp-1 text-slate-800 dark:text-slate-200 font-bold group-hover:text-slate-950 dark:group-hover:text-slate-50 mr-3">
                {userData.name}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                @{userData.username}
              </span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {datetimeToAgo(postDatetime)}
            </p>
          </div>
        </Link>
      )}
      <div>
        {currentUser.id !== userId && (
          <FollowBtn userId={userId} classes="text-xl font-bold pt-5" />
        )}
      </div>
    </div>
  );
}
