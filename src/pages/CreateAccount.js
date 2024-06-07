import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Logo from "../components/Logo";
import { userActions } from "../store/user-slice";
import { Navigate } from "react-router-dom";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const isDark = useSelector((s) => s.user.isDark);
  const isLogin = useSelector((s) => s.user.isLogin);

  const sleep = (timeout) =>
    new Promise((resolve) => setTimeout(() => resolve(), timeout));

  async function onSubmit(data) {
    await sleep(1000);
    dispatch(userActions.createAccountLogin(data));
  }

  const validPass = (value) => {
    if (!value) return "Fill the field";

    if (value.length < 4) return "This password is short";
    else if (value.length >= 12) return "This password is too long";
  };

  const validConfirmPass = (value, pass) => {
    if (!value) return "Fill the field";

    if (value !== pass) return "This is not the same";
  };

  return isLogin ? (
    <Navigate to="/" replace />
  ) : (
    <div className={isDark ? "dark" : ""}>
      <div className="sm:p-10 p-5 h-screen flex flex-col items-center gap-10 dark:text-slate-300 dark:bg-slate-950">
        <div className="text-start px-1 max-w-128 w-full">
          <Logo classes="self-center size-14 mx-auto my-5" />
          <h2 className="text-3xl font-bold mb-2">Create account</h2>
          <p className="text-slate-400 dark:text-slate-300">
            Sunt exercitation consequat sunt proident labore ipsum commodo et
            Lorem.
          </p>
        </div>
        <div className="max-w-128 w-full">
          <Form onSubmit={onSubmit}>
            {({ handleSubmit, values, submitting }) => (
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <div className="flex">
                  <Input name="firstname" title="First Name" />
                  <Input name="lastname" title="Last Name" />
                </div>
                <Input
                  name="email"
                  title="Email"
                  type="email"
                  placeholder="example@gmail.com"
                />
                <Input
                  name="password"
                  title="Password"
                  type="password"
                  valid={validPass}
                />
                <Input
                  name="confirmPassword"
                  title="Confirm Password"
                  type="password"
                  subscription={{ value: true, values: true }}
                  valid={(value) => validConfirmPass(value, values.password)}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 py-2 w-32 px-2 box-content self-center bg-sky-400 text-slate-100 hover:bg-sky-500 disabled:bg-sky-600 duration-200 rounded-md"
                >
                  {submitting ? "Creating..." : "Create account"}
                </button>
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
