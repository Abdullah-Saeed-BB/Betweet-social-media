import { postsActions } from "./posts-slice";
import { usersActions } from "./users-slice";

export default function fetchData(endpoint) {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/" + endpoint
      );

      const data = await res.json();

      return data;
    };
    try {
      const fetchData = await fetchHandler();
      if (!fetchData.length)
        throw new Error("Failed to load resourse. Try later");
      switch (endpoint) {
        case "users": {
          dispatch(usersActions.setData(fetchData));
          break;
        }
        case "posts": {
          dispatch(postsActions.setData(fetchData));
          break;
        }
        case "comments": {
          dispatch(postsActions.setCommentsData(fetchData));
          break;
        }
        default: {
          throw new Error("There is no", endpoint, "endpoint");
        }
      }
    } catch (err) {
      switch (endpoint) {
        case "users": {
          dispatch(usersActions.setError(err));
          break;
        }
        case "posts": {
          dispatch(postsActions.setError(err));
          break;
        }
        case "comments": {
          dispatch(postsActions.setError(err));
          break;
        }
        default: {
          throw new Error("There is no", endpoint, "endpoint");
        }
      }
    }
  };
}
