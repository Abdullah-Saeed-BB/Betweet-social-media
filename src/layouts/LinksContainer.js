import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faUserGroup,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import PageLink from "../components/PageLink";
import { useState } from "react";
import CreatePost from "../pages/CreatePost";

export default function PagesContainer() {
  const [createPostPopup, setCreatePostPopup] = useState(false);

  return (
    <div className="sm:px-4 sm:py-6 text-xl p-2 sm:border-none border-t-2 border-slate-50 dark:border-slate-950 sm:sticky fixed w-full sm:top-8 bottom-0 font-bold sm:rounded-2xl bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <nav className="w-full">
        <div className="w-full justify-between h-full">
          <ul className="sm:space-y-6 flex flex-row justify-around items-center sm:block">
            <li>
              <PageLink to="/" icon={faHouse} pageName="Home" />
            </li>
            <li>
              <PageLink
                to="/notifications"
                icon={faBell}
                pageName="Notifications"
              />
            </li>
            <li>
              <PageLink to="friends" icon={faUserGroup} pageName="Friends" />
            </li>
            <li className="flex justify-center sm:p-0 px-2">
              <button onClick={() => setCreatePostPopup(true)}>
                <FontAwesomeIcon
                  icon={faAdd}
                  className="size-5 p-5 text-slate-100 rounded-full duration-200 sm:bg-blue-400 bg-slate-500 active:bg-slate-400 dark:active:bg-slate-600 sm:hover:bg-blue-500"
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {createPostPopup && (
        <CreatePost setCreatePostPopup={setCreatePostPopup} />
      )}
    </div>
  );
}
