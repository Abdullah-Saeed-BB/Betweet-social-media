import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleHalfStroke,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ProfileLogo from "../components/ProfileLogo";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

export default function Header() {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef();

  const userId = useSelector((s) => s.user.user.id);
  const user = useSelector((s) => s.users.users.find((u) => u.id === userId));

  useEffect(() => {
    if (user) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) setShowDropdown(false);
      };

      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  });

  if (!user)
    return <div className="h-20 bg-slate-400  dark:bg-slate-800"></div>;

  function logout() {
    dispatch(userActions.setLogout());
  }

  return (
    <div className="bg-slate-300 dark:bg-slate-800">
      <div className="flex flex-row-reverse sm:gap-5 gap-3 sm:px-8 px-4 h-20 items-center  max-w-7xl mx-auto">
        <div className="relative flex" ref={menuRef}>
          <button
            className="group *:duration-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <ProfileLogo userId={userId} />
          </button>

          <div
            className={
              "absolute z-50 py-7 px-5 w-max flex flex-col items-center right-0 bg-slate-200 dark:bg-slate-500 rounded-b-xl rounded-tl-xl duration-200 " +
              (showDropdown
                ? "opacity-100 top-14"
                : "opacity-0 top-10 invisible")
            }
          >
            <div className="text-center">
              <h2 className="font-bold text-xl text-slate-800 dark:text-slate-200">
                {user.name}
              </h2>
              <p className="text-sm">{user.email}</p>
            </div>
            <hr className="my-2 w-32 border-slate-400" />
            <Link
              to={"profile/" + userId}
              onClick={() => setShowDropdown(false)}
              className="py-2 px-2 w-24 box-border  flex items-center justify-between rounded-lg space-x-4 hover:font-bold dark:hover:text-slate-100"
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" />
              <span>Profile</span>
            </Link>

            <button
              onClick={logout}
              className="py-2 px-2 w-24 box-border flex items-center justify-between rounded-lg space-x-4 hover:font-bold dark:hover:text-slate-100"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-lg"
              />
              <span>Logout</span>
            </button>

            <button
              className="mt-3 dark:hover:text-slate-100 sm:hidden block"
              onClick={() => dispatch(userActions.toggleDark())}
            >
              <FontAwesomeIcon className="text-xl" icon={faCircleHalfStroke} />
            </button>
          </div>
        </div>
        <div className="sm:flex hidden">
          <button className="text-3xl flex items-start">
            <FontAwesomeIcon
              onClick={() => dispatch(userActions.toggleDark())}
              icon={faCircleHalfStroke}
            />
          </button>
        </div>
        <div className="grow relative">
          <SearchBar />
        </div>
        <div>
          <Link to="/">
            <Logo classes="size-12 box-content" />
          </Link>
        </div>
      </div>
    </div>
  );
}
