import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function PageLink({ to, icon, pageName }) {
  return (
    <div className="sm:rounded-xl size-16 sm:size-full items-center justify-center flex sm:block rounded-full hover:text-slate-800 hover:bg-slate-400 dark:hover:text-slate-400 dark:hover:bg-slate-800 duration-200 has-[.active]:hover:bg-slate-500 has-[.active]:bg-slate-500 has-[.active]:text-slate-200 dark:has-[.active]:hover:bg-slate-400 dark:has-[.active]:bg-slate-400 dark:has-[.active]:text-slate-700">
      <NavLink
        className="flex flex-col lg:flex-row py-2 px-1 lg:p-3 gap-2 lg:gap-3  items-center "
        to={to}
      >
        <FontAwesomeIcon
          icon={icon}
          className="lg:size-7 sm:size-8 size-9 sm:p-0 p-2"
        />
        <span className="text-sm lg:text-xl hidden sm:block">{pageName}</span>
      </NavLink>
    </div>
  );
}
