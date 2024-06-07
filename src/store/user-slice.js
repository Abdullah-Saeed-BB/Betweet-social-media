import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: 1,
      following: [],
    },
    isLogin: true,
    isDark: true,
  },
  reducers: {
    addLike(state, action) {
      state.likes.push(action.payload);
    },
    removeLike(state, action) {
      state.likes.filter((p) => p.id !== action.payload);
    },
    setLogin(state, action) {
      state.isLogin = true;
      const user = { ...action.payload["0"], following: [] };
      state.user = user;
      if (action.payload.rememberMe) {
        localStorage.setItem("login", JSON.stringify(user));
      } else {
        sessionStorage.setItem("login", JSON.stringify(user));
      }
    },
    setLogout(state) {
      state.isLogin = false;
      localStorage.removeItem("login");
      sessionStorage.removeItem("login");
    },
    createAccountLogin(state) {
      state.isLogin = true;

      sessionStorage.setItem("login", JSON.stringify(state.user));
    },
    addFollow(state, action) {
      if (state.user.following.indexOf(action.payload) !== -1) {
        state.user.following = state.user.following.filter(
          (u) => u !== action.payload
        );
      } else {
        state.user.following.push(action.payload);
      }
    },
    toggleDark(state) {
      state.isDark = !state.isDark;
    },
    checkLogin(state) {
      if (localStorage.getItem("login")) {
        const login = localStorage.getItem("login");
        state.user = JSON.parse(login);
        state.isLogin = true;
      } else if (sessionStorage.getItem("login")) {
        const login = sessionStorage.getItem("login");
        state.user = JSON.parse(login);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
