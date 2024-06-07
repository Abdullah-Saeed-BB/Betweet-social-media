import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileLogo from "./ProfileLogo";
import FollowBtn from "./FollowBtn";

export default function FollowSuggestion() {
  const users = useSelector((s) => s.users.users);
  const userId = useSelector((s) => s.user.user.id);

  if (users.length) {
    const randThreeIndexs = [];

    for (let i = 0; i < 3; i++) {
      let rand = Math.floor(Math.random() * users.length);

      while (
        randThreeIndexs.indexOf(rand) !== -1 ||
        users[rand].id === userId
      ) {
        rand = Math.floor(Math.random() * users.length);
      }

      randThreeIndexs.push(rand);
    }

    const randThreeUsers = randThreeIndexs.map((i) => users[i]);

    return (
      <div className="text-center sm:py-10 px-4 space-y-10">
        <div className="text-3xl font-bold">
          <h1>You have to make follows, at least one.</h1>
          <Link to="/">
            <FontAwesomeIcon
              className="text-5xl mt-12 z-0 hover:scale-105 duration-200"
              icon={faUserPlus}
            />
          </Link>
        </div>
        <div>
          <ul className="flex flex-wrap gap-6 sm:px-4 justify-center items-center">
            {randThreeUsers.map((u) => (
              <li
                key={u.id}
                className="bg-slate-300 dark:bg-slate-800 rounded-xl flex gap-3 sm:grow-0 grow items-center p-4 w-64"
              >
                <div>
                  <Link to={"/profile/" + u.id}>
                    <ProfileLogo userId={u.id} classes="size-20" />
                  </Link>
                </div>
                <div className="text-start">
                  <h2 className="text-lg font-bold line-clamp-1">{u.name}</h2>
                  <h4 className="text-base text-slate-600 dark:text-slate-400 line-clamp-1">
                    @{u.username}
                  </h4>
                  <FollowBtn userId={u.id} classes="pt-2 text-lg font-bold" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
