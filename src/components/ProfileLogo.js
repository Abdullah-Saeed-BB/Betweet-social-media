import { useSelector } from "react-redux";

export default function ProfileLogo({ userId, classes = "size-12" }) {
  const userImg = useSelector(
    (s) => s.users.users.find((u) => u.id === userId).img
  );

  return (
    <div
      alt="Profile logo"
      className={`bg-contain bg-center rounded-full border-4 border-slate-300 dark:border-slate-800 outline outline-1 outline-slate-500 group-hover:outline-slate-800 dark:group-hover:outline-slate-300 ${classes}`}
      style={{
        backgroundImage: `url('${userImg}')`,
      }}
    />
  );
}
