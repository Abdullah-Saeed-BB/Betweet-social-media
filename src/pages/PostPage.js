import { Link, useParams } from "react-router-dom";
import PostUser from "../components/Post/PostUser";
import PostData from "../components/Post/PostData";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../store/fetchData";
import Loading from "../components/Loading";
import Comment from "../components/Post/Comment";
import { useRef, useState } from "react";
import { postsActions } from "../store/posts-slice";
import NotFound from "../components/NotFound";

export default function PostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const textAreaRef = useRef();
  const [comment, setComment] = useState("");

  const posts = useSelector((s) => s.posts.posts);

  const { name, email } = useSelector((s) => s.user.user);

  if (!posts.length) {
    dispatch(fetchData("users"));
    dispatch(fetchData("posts"));
    dispatch(fetchData("comments"));

    return <Loading />;
  }

  const postData = posts.find((p) => p.id === +id);

  if (!postData) {
    return <NotFound />;
  }

  function addComment(e) {
    e.preventDefault();

    dispatch(
      postsActions.addComment({
        postId: +id,
        id: new Date().getTime(),
        name: name,
        email: email,
        body: comment,
      })
    );

    setComment("");
  }

  return (
    <div className="bg-slate-300 mt-2 dark:bg-slate-800 ms:p-6 p-4 rounded-xl mb-10 min-w-full space-y-6">
      <div>
        <PostUser userId={postData.userId} postDatetime={postData.datetime} />
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <h2 className="font-bold text-xl mb-2">{postData.title}</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            {postData.body}
          </p>
        </div>
        <div>
          <PostData
            postId={postData.id}
            postLikes={postData.likes}
            commentMuch={postData.comments ? postData.comments.length : 0}
          />
        </div>
      </div>
      <hr className="border-slate-500" />
      <div>
        <form
          onClick={() => textAreaRef.current.focus()}
          onSubmit={addComment}
          className="mb-6 cursor-text border bg-slate-100 border-slate-400 dark:bg-slate-900 dark:border-slate-600 box-border rounded-xl outline-none overflow-hidden has-[:focus]:border-slate-500 dark:has-[:focus]:border-slate-500 has-[:focus]:text-slate-950 dark:has-[:focus]:text-slate-50"
        >
          <div className="relative z-10">
            <textarea
              className="px-3 py-2 mb-14 bg-inherit outline-none w-full resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={textAreaRef}
              required
            ></textarea>
            <div className="absolute z-10 bottom-3 right-3">
              <button
                className="z-0 bg-slate-400 dark:bg-slate-500 hover:bg-sky-500 dark:hover:bg-sky-600 text-slate-50 rounded-lg duration-200 p-2"
                type="submit"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
        <ul className="space-y-4">
          {postData.comments &&
            postData.comments.map((c) => (
              <Comment key={c.id} commentData={c} />
            ))}
        </ul>
      </div>
    </div>
  );
}
