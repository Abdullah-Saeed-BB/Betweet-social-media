import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../store/fetchData";
import Loading from "../components/Loading";
import ProfileLogo from "../components/ProfileLogo";
import FollowSuggestion from "../components/FollowSuggestion";
import datetimeToAgo from "../datetimeToAgo";

export default function Notifications() {
  const dispatch = useDispatch();
  const following = useSelector((s) => s.user.user.following);
  const posts = useSelector((s) => s.posts.posts);

  if (!posts.length) {
    dispatch(fetchData("users"));
    dispatch(fetchData("posts"));
    dispatch(fetchData("comments"));

    return <Loading />;
  }

  const postsOfFollowing = posts.filter(
    (p) => following.indexOf(p.userId) !== -1
  );

  return (
    <div>
      <PageTitle title="Notifications" />
      <div>
        {following.length ? (
          <ul>
            {postsOfFollowing.map((p) => (
              <li
                key={p.id}
                className="bg-slate-300 dark:bg-slate-800 p-4 mb-4 flex gap-3 rounded-xl"
              >
                <div>
                  <Link to={"/profile/" + p.userId}>
                    <ProfileLogo userId={p.userId} />
                  </Link>
                </div>
                <div className="grow">
                  <Link
                    to={"/post/" + p.id}
                    className="text-slate-500 dark:text-slate-400 text-sm"
                  >
                    Uploaded new post
                  </Link>
                  <h3 className="line-clamp-1">{p.title}</h3>
                </div>
                <div className="text-end">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    {datetimeToAgo(p.datetime)}
                  </span>
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
