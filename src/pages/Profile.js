import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fetchData from "../store/fetchData";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faPhone,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import FollowBtn from "../components/FollowBtn";
import PostData from "../components/Post/PostData";
import { useState } from "react";
import ProfileLogo from "../components/ProfileLogo";
import datetimeToAgo from "../datetimeToAgo";
import NotFound from "../components/NotFound";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showAllPosts, setShowAllPosts] = useState(false);
  const currentUser = useSelector((s) => s.user.user);
  const users = useSelector((s) => s.users.users);
  const posts = useSelector((s) => s.posts.posts);

  if (!users.length) {
    dispatch(fetchData("users"));
    dispatch(fetchData("posts"));
    dispatch(fetchData("comments"));
    return <Loading />;
  }
  const userData = users.find((u) => u.id === +id);
  if (!userData) return <NotFound />;

  const userPosts = posts.filter((p) => p.userId === +id);

  const { address, company } = userData;

  return (
    <div className="sm:m-0 mt-2">
      <header className="md:h-80 h-96 bg-slate-300 dark:bg-slate-800 rounded-2xl overflow-hidden">
        <div className="h-2/5">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${userData.img}')` }}
          ></div>
        </div>
        <div className="flex justify-center relative">
          <ProfileLogo
            userId={+id}
            classes="md:size-28 size-24 self-center absolute top--10 box-content"
          />
        </div>
        <div className="mt-14 md:px-8 px-4 gap-4 flex md:flex-row flex-col md:items-stretch items-center md:text-start text-center md:justify-between ">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {userData.name}
            </h1>
            <h3 className="text-lg text-slate-700 dark:text-slate-300">
              @{userData.username}
            </h3>
            <h5 className="text-base text-slate-500 dark:text-slate-400">
              {address.suite} - {address.street} - {address.city}
            </h5>
          </div>
          <div className="flex md:flex-col flex-row md:items-end items-center gap-3">
            <a
              className="text-sky-500 dark:text-sky-300 border-2 border-sky-500 dark:border-sky-300 rounded-3xl px-3 py-2 font-bold hover:text-sky-50 hover:border-sky-600 hover:bg-sky-600 dark:hover:text-sky-200 dark:hover:border-sky-200 dark:hover:bg-slate-700 duration-200"
              target="_blank"
              href={`http://${userData.website}`}
              rel="noreferrer"
            >
              Visit webiste <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>

            {currentUser.id !== +id && <FollowBtn userId={+id} />}
          </div>
        </div>
      </header>

      <section className="h-fit bg-slate-300 dark:bg-slate-800 rounded-2xl sm:mt-10 mt-4 ms:p-7 p-4">
        <h2 className="text-2xl font-bold mb-2">Contact info</h2>
        <hr className="border-slate-400 dark:border-slate-600 mb-3" />
        <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 sm:justify-between items-center">
          <div className="flex items-center sm:justify-normal justify-between w-4/5 sm:w-fit gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-4xl" />
            <div>
              <p className="font-bold sm:block hidden">Phone</p>
              <p>{userData.phone}</p>
            </div>
          </div>

          <div className="flex items-center sm:justify-normal justify-between w-4/5 sm:w-fit gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl" />
            <div>
              <p className="font-bold sm:block hidden">Email</p>
              <p>{userData.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-fit bg-slate-300 dark:bg-slate-800 rounded-2xl sm:mt-10 mt-4 ms:p-7 p-4">
        <h2 className="text-2xl font-bold mb-2">Work place</h2>
        <hr className="border-slate-400 dark:border-slate-600 mb-3" />
        <div className="flex justify-between ">
          <div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faBuilding} className="text-4xl" />
              <div>
                <p className="font-bold sm:block hidden">Company</p>
                <p>{company.name}</p>
              </div>
            </div>
          </div>
          <div className="text-end">
            <p>{company.catchPhrase}</p>
            <p>{company.bs}</p>
          </div>
        </div>
      </section>

      <section className="h-fit bg-slate-300 dark:bg-slate-800 rounded-2xl sm:mt-10 mt-4 ms:p-7 p-4">
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        <hr className="border-slate-400 dark:border-slate-600 mb-3" />
        <div className="flex flex-col space-y-8">
          <ul className="space-y-8">
            {userPosts.slice(0, showAllPosts ? -1 : 1).map((p) => (
              <li
                key={p.id}
                className="bg-slate-200 dark:bg-slate-700 sm:px-5 sm:py-4 px-3 pt-2 pb-3 rounded-lg min-w-full space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-end">
                      {datetimeToAgo(p.datetime)}
                    </p>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{p.body}</p>
                </div>
                <div>
                  <PostData
                    postId={p.id}
                    postLikes={p.likes}
                    commentMuch={p.comments ? p.comments.length : 0}
                  />
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllPosts(!showAllPosts)}
            className="px-4 py-2 rounded-lg self-center duration-200 text-sky-500 dark:text-sky-400 border-2 dark:border border-sky-500 dark:border-sky-400 hover:text-sky-600 hover:border-sky-600 dark:hover:text-sky-500 dark:hover:border-sky-500"
          >
            {showAllPosts ? "Hide the posts" : "Show all posts"}
          </button>
        </div>
      </section>

      <section className="h-fit bg-slate-300 dark:bg-slate-800 rounded-2xl sm:mt-10 mt-4 mb-8 sm:mb-0 overflow-hidden">
        <div className="p-7 pb-0">
          <h2 className="text-2xl font-bold mb-2">Location</h2>
          <hr className="border-slate-400 dark:border-slate-600 mb-4" />
        </div>

        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1191.950056730541!2d103.80835549999998!3d1.3272340000000107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da10a78da41edb%3A0xf28c71e3c13327c7!2s35-2%20Watten%20Terrace%2C%20Singapore!5e1!3m2!1sen!2ssa!4v1716847272167!5m2!1sen!2ssa"
          className="w-full h-64"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
