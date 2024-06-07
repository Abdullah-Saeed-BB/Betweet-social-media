export default function Comment({ commentData }) {
  return (
    <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md space-y-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-slate-800 dark:text-slate-200">
          {commentData.name.split(" ").slice(0, 2).join(" ")}
        </h2>
        <h2 className="text-slate-600 dark:text-slate-400">
          {commentData.email}
        </h2>
      </div>
      <hr className="border-slate-300 dark:border-slate-500"></hr>
      <div>
        <p>{commentData.body}</p>
      </div>
    </div>
  );
}
