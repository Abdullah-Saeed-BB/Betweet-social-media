import { Link, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((s) => s.user.isLogin);
  const [showPassowrd, setShowPassowrd] = useState(false);
  const isDark = useSelector((s) => s.user.isDark);

  useEffect(() => {
    dispatch(userActions.checkLogin());
    if (isLogin) navigate("/");
  }, [isLogin, dispatch, navigate]);

  const required = (value) => (value ? undefined : "Fill the field");

  async function onSubmit(data) {
    if (data.password === "1234") {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users?email=" + data.email
      );
      const userData = await res.json();

      if (userData.length) dispatch(userActions.setLogin({ ...userData }));
    }

    return { [FORM_ERROR]: "The email or password incorrect" };
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="h-screen flex flex-col justify-center items-center dark:bg-slate-950">
        <Logo classes="size-20 mb-10" />
        <div className="max-w-96 w-full rounded-2xl dark:text-slate-300  p-7">
          <Form
            onSubmit={onSubmit}
            subscription={{
              submitting: true,
              submitError: true,
            }}
          >
            {({ handleSubmit, submitting, submitError }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
              >
                <Field
                  component="input"
                  type="text"
                  name="email"
                  validate={required}
                  subscription={{
                    value: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <label>Email</label>
                      <input
                        {...input}
                        placeholder="example@mail.com"
                        className={
                          ((meta.error && meta.touched) || submitError
                            ? "outline-red-500"
                            : "outline-slate-200") +
                          " duration-200 rounded-lg w-full bg-slate-300 text-slate-500 placeholder:text-slate-700 dark:bg-slate-200 dark:text-slate-600 py-1 px-3 mb-4 mt-1 outline outline-2 focus:rounded-xl focus:bg-slate-400 focus:text-slate-100 dark:focus:bg-slate-100 dark:focus:text-slate-800"
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className="absolute right-2 bottom-5 w-max text-red-500">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
                <Field
                  component="input"
                  type={showPassowrd ? "text" : "password"}
                  name="password"
                  validate={required}
                  subscription={{
                    value: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <label>Password</label>
                      <input
                        {...input}
                        className={
                          ((meta.error && meta.touched) || submitError
                            ? "outline-red-500"
                            : "outline-slate-200") +
                          " duration-200 rounded-lg w-full bg-slate-300 text-slate-500 placeholder:text-slate-700 dark:bg-slate-200 dark:text-slate-600 py-1 px-3 mb-4 mt-1 outline outline-2 focus:rounded-xl focus:bg-slate-400 focus:text-slate-100 dark:focus:bg-slate-100 dark:focus:text-slate-800"
                        }
                      />

                      {meta.error && meta.touched && (
                        <span className="absolute right-2 top-8 w-max text-red-500">
                          {meta.error}
                        </span>
                      )}
                      <div className="absolute right-2 top-8">
                        <input
                          id="showPassword"
                          type="checkbox"
                          onClick={() => setShowPassowrd(!showPassowrd)}
                          className="hidden"
                        />
                        <label
                          htmlFor="showPassword"
                          className="text-slate-800"
                        >
                          <FontAwesomeIcon
                            icon={showPassowrd ? faEye : faEyeSlash}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </Field>

                <span className="text-red-500 inline-block h-8 w-full text-center">
                  {submitError}
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-sky-500 hover:bg-sky-400 disabled:bg-sky-700  py-2 mt-2 w-full self-center rounded-lg text-slate-100 duration-200"
                >
                  Submit
                </button>

                <Field
                  name="rememberMe"
                  component="input"
                  type="checkbox"
                  defaultValue={false}
                >
                  {({ input }) => (
                    <div className="mt-3 text-center">
                      <input
                        id="rememberMe"
                        className="accent-sky-400 mr-2"
                        {...input}
                      />
                      <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                  )}
                </Field>
              </form>
            )}
          </Form>
          <p className="text-center mt-5">
            No account?{" "}
            <Link
              to="/create_account"
              className="text-sky-500 dark:text-sky-300 underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <div className="mt-7 mx-4 text-center space-y-3 text-slate-500 dark:text-slate-400">
          <p>
            The email is <span className="italic">Sincere@april.biz</span> and
            the password is <span className="italic">1234</span>
          </p>
          <p className="text-sm">
            You could use any email you find of the users and log in with their
            data
          </p>
        </div>
      </div>
    </div>
  );
}
