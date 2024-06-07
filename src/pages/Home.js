import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../store/fetchData";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const postsIds = useSelector((s) => s.posts.postsIds);
  const isLoading = useSelector((s) => s.posts.isLoading);
  const err = useSelector((s) => s.posts.err);

  if (!postsIds.length) {
    dispatch(fetchData("users"));
    dispatch(fetchData("posts"));
    dispatch(fetchData("comments"));
  }

  return (
    <div>
      <title>Home</title>
      <PageTitle title="Home" />
      <div>
        {isLoading && <Loading />}

        {err && (
          <span className="flex flex-col gap-3 items-center text-red-300 mt-10">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="animate-bounce text-3xl"
            />
            <h2 className="text-lg">{String(err)}</h2>
          </span>
        )}

        {postsIds.length
          ? postsIds.map((p) => <Post key={p} postId={p} />)
          : ""}
      </div>
    </div>
  );
}
