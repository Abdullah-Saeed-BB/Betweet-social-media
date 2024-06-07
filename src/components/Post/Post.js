import { useSelector } from "react-redux";
import PostUser from "./PostUser";
import PostData from "./PostData";

export default function Post({ postId }) {
  const postData = useSelector((s) =>
    s.posts.posts.find((p) => p.id === postId)
  );

  return (
    <div className="bg-slate-300 dark:bg-slate-800 sm:p-6 p-4 rounded-xl sm:mb-10 mb-8 min-w-full">
      <div>
        <PostUser userId={postData.userId} postDatetime={postData.datetime} />
      </div>

      <div className="mt-4">
        <div>
          <h3 className="font-bold mb-2">{postData.title}</h3>
          <p className="text-slate-700 dark:text-slate-300">{postData.body}</p>
        </div>
        <div className="mt-4 ">
          <PostData
            postId={postData.id}
            postLikes={postData.likes}
            commentMuch={postData.comments ? postData.comments.length : 0}
          />
        </div>
      </div>
    </div>
  );
}
