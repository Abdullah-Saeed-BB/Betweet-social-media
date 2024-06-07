import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center h-44 mt-20 relative">
      <span className="font-bold text-[9rem] text-slate-200 dark:text-slate-800 absolute z-0 left-0 right-0 -top-20">
        404
      </span>
      <div className="space-y-3 w-full *:z-50 absolute z-10">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          We didn't find what you looking for
        </h1>
        <p className="text-slate-800 dark:text-slate-300">
          Back to{" "}
          <Link to="/" className="underline" replace>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
