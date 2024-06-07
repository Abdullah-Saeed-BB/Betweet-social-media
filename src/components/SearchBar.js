import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getFilteredPosts = (query, posts) => {
  query = query.toLowerCase();

  if (!query) {
    return posts
      .slice(0, 5)
      .map((p) => ({ id: p.id, body: { text: p.title, pos: "title" } }));
  }

  return posts
    .map((p) => {
      if (p.title.includes(query)) {
        return { id: p.id, body: { text: p.title, pos: "title" } };
      } else if (p.body.includes(query)) {
        let index = p.body.indexOf(query);
        let text = "";
        if (index - 20 < 0) {
          text = p.body.slice(0);
        } else {
          text = "..." + p.body.slice(index - 20);
        }
        return {
          id: p.id,
          body: {
            text: text,
            pos: "body",
          },
        };
      }
      return null;
    })
    .filter((p) => p)
    .slice(0, 5);
};

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const posts = useSelector((s) => s.posts.posts);

  const filterdPosts = useMemo(
    () => getFilteredPosts(query, posts),
    [query, posts]
  );

  return (
    <form>
      <input
        type="text"
        className="w-full py-2 peer px-5 rounded-full outline outline-1 outline-slate-400 dark:outline-slate-700 bg-slate-100 dark:bg-slate-900 focus:outline-2"
        onChange={(e) => setQuery(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute bottom-3 right-4 text-xl"
      />
      <ul className="peer-focus:visible active:visible invisible flex flex-col absolute top-11 z-50 w-full bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden">
        {filterdPosts.map((p) => (
          <Link
            to={"/post/" + p.id}
            key={p.id}
            className="p-5 flex items-center h-10 w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-800"
          >
            <span
              className={
                "line-clamp-1" +
                (p.body.pos === "title" ? " font-bold" : " font-light")
              }
            >
              {p.body.text}
            </span>
          </Link>
        ))}
      </ul>
    </form>
  );
}
