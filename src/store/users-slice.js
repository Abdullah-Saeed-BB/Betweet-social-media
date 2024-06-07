import { createSlice } from "@reduxjs/toolkit";

const images = [
  "https://via.placeholder.com/600/92c952",
  "https://via.placeholder.com/600/771796",
  "https://via.placeholder.com/600/24f355",
  "https://via.placeholder.com/600/d32776",
  "https://via.placeholder.com/600/f66b97",
  "https://via.placeholder.com/600/56a8c2",
  "https://via.placeholder.com/600/b0f7cc",
  "https://via.placeholder.com/600/810b14",
  "https://via.placeholder.com/600/51aa97",
  "https://via.placeholder.com/600/54176f",
];

const usersSlice = createSlice({
  name: "users",
  initialState: { isLoading: true, users: [], err: null },
  reducers: {
    setData(state, action) {
      state.isLoading = false;

      state.users = action.payload.map((u) => ({
        ...u,
        followers: [],
        img: images[u.id - 1],
      }));
    },
    setError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },
    addFollower(state, action) {
      const { userId, newFollower } = action.payload;

      const user = state.users.find((u) => u.id === +userId);

      if (user.followers.indexOf(newFollower) !== -1) {
        user.followers.filter((u) => u !== newFollower);
      } else user.followers.push(newFollower);
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
