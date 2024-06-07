import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts-slice";
import usersSlice from "./users-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
