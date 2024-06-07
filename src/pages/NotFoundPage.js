import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

export default function NotFoundPage() {
  const isDark = useSelector((s) => s.user.isDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="dark:bg-slate-950 h-screen w-screen *:m-0 p-20">
        <NotFound />
      </div>
    </div>
  );
}
