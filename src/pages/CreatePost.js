import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../store/posts-slice";

export default function CreatePost({ setCreatePostPopup }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((s) => s.user.user.id);

  const validate = (value, len) => {
    if (!value) return "Fill the field";
    else if (value.length >= len)
      return "Would you like to try shortening your response";

    return undefined;
  };

  function handlePost(data) {
    dispatch(postsActions.addPost([data, currentUserId]));
    setCreatePostPopup(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-600 dark:text-slate-300 bg-opacity-60 overflow-y-auto h-full w-full sm:px-32 px-6">
      <div className="relative z-50 bg-slate-300 dark:bg-slate-800 top-60 rounded-md p-6">
        <h2 className="text-slate-800 z-50 dark:text-slate-200 mb-3">
          Creaet new post
        </h2>
        <hr className="border-slate-400 dark:border-slate-500 mb-5" />
        <div>
          <Form onSubmit={handlePost}>
            {({ handleSubmit }) => (
              <form className="flex flex-col text-base" onSubmit={handleSubmit}>
                <Field
                  component="input"
                  type="text"
                  name="title"
                  validate={(value) => validate(value, 50)}
                >
                  {({ input, meta }) => (
                    <>
                      <label>Post title</label>
                      <input
                        {...input}
                        className={
                          "py-1 px-2 mt-2 mb-1 duration-200 bg-slate-400 text-slate-600 dark:text-slate-600 dark:bg-slate-300 rounded-xl outline-none focus:bg-slate-500 focus:text-slate-100 dark:focus:bg-slate-200 dark:focus:text-slate-700 " +
                          (meta.error && meta.touched
                            ? "outline outline-red-500"
                            : "")
                        }
                      />
                      <div className="flex justify-between mt-0 font-normal mb-4">
                        <span
                          className={
                            meta.error && meta.touched ? "text-red-500" : ""
                          }
                        >
                          {input.value.length}/50
                        </span>
                        {meta.touched && (
                          <span className="text-red-500">{meta.error}</span>
                        )}{" "}
                      </div>
                    </>
                  )}
                </Field>
                <Field
                  component="textarea"
                  name="body"
                  validate={(value) => validate(value, 200)}
                >
                  {({ input, meta }) => (
                    <>
                      <label>Body</label>
                      {/* <pre>
                        {JSON.stringify(
                          { input: input, meta: meta },
                          undefined,
                          2
                        )}
                      </pre> */}
                      <textarea
                        {...input}
                        className={
                          "py-1 px-2 mt-2 mb-1 duration-200 bg-slate-400 text-slate-600 dark:text-slate-600 dark:bg-slate-300 rounded-xl outline-none focus:bg-slate-500 focus:text-slate-100 dark:focus:bg-slate-200 dark:focus:text-slate-700 " +
                          (meta.error && meta.touched
                            ? "outline outline-red-500"
                            : "")
                        }
                      />
                      <div className="flex justify-between mt-0 font-normal mb-4">
                        <span
                          className={
                            meta.error && meta.touched ? "text-red-500" : ""
                          }
                        >
                          {input.value.length}/200
                        </span>
                        {meta.touched && (
                          <span className="text-red-500">{meta.error}</span>
                        )}{" "}
                      </div>
                    </>
                  )}
                </Field>

                <div className="*:duration-200 *:py-2 *:px-4 space-x-3 text-slate-200">
                  <button
                    className=" bg-sky-500 hover:bg-sky-600 rounded-lg"
                    type="submit"
                  >
                    Post
                  </button>
                  <button
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-400"
                    onClick={() => setCreatePostPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
