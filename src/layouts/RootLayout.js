import { useDispatch, useSelector } from "react-redux";
import LinksContainer from "./LinksContainer";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { userActions } from "../store/user-slice";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((s) => s.user.isLogin);
  const isDark = useSelector((s) => s.user.isDark);

  useEffect(() => {
    dispatch(userActions.checkLogin());
    if (!isLogin) navigate("/login");
  }, [isLogin, dispatch, navigate]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="font-nunito text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <header>
          <Header />
        </header>
        <div className="flex sm:flex-row sm:p-8 max-w-7xl mx-auto">
          <section>
            <LinksContainer />
          </section>
          <main className="w-screen box-border sm:pr-10 sm:pb-0 pb-16">
            <div className="sm:mx-8 sm:p-0 px-2 w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
