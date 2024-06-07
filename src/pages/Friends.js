import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import fetchData from "../store/fetchData";
import Loading from "../components/Loading";
import ProfileLogo from "../components/ProfileLogo";
import FollowBtn from "../components/FollowBtn";
import FollowSuggestion from "../components/FollowSuggestion";

export default function Friends() {
  const dispatch = useDispatch();
  const following = useSelector((s) => s.user.user.following);
  const users = useSelector((s) => s.users.users);

  if (!users.length) {
    dispatch(fetchData("users"));
    dispatch(fetchData("posts"));
    dispatch(fetchData("comments"));

    return <Loading />;
  }

  const usersOfFollowing = users.filter((u) => following.indexOf(u.id) !== -1);

  return (
    <div>
      <PageTitle title="Friends" />
      <div>
        {usersOfFollowing.length ? (
          <ul>
            {usersOfFollowing.map((u) => (
              <li
                key={u.id}
                className="bg-slate-300 dark:bg-slate-800 p-5 mb-10 flex gap-4 items-center rounded-xl"
              >
                <Link to={"/profile/" + u.id}>
                  <ProfileLogo userId={u.id} classes="size-16" />
                </Link>
                <div className="space-y-1 grow">
                  <h1 className="text-lg">{u.name}</h1>
                  <h2 className="text-slate-600 dark:text-slate-400">
                    @{u.username}
                  </h2>
                  <h4 className="text-sm text-slate-600 dark:text-slate-400">
                    {u.email}
                  </h4>
                </div>
                <div>
                  <FollowBtn userId={u.id} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <FollowSuggestion />
        )}
      </div>
    </div>
  );
}
