import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { isLoading: true, posts: [], postsIds: [], err: null },
  reducers: {
    setData(state, action) {
      state.isLoading = false;

      if (!state.posts.length) {
        const startDate = new Date(2020, 0, 1);

        state.posts = action.payload.map((p) => ({
          ...p,
          likes: [],
          datetime:
            startDate.getTime() +
            Math.random() * (new Date().getTime() - startDate.getTime()),
        }));

        state.posts = state.posts.sort((a, b) => b.datetime - a.datetime);

        state.postsIds = state.posts.map((p) => p.id);
      }
    },
    setError(state, action) {
      state.isLoading = false;
      state.err = action.payload;
    },

    setCommentsData(state, action) {
      state.posts = state.posts.map((p) => ({
        ...p,
        comments: action.payload.filter((c) => c.postId === p.id),
      }));
    },

    addComment(state, action) {
      const { postId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);

      post.comments.unshift(action.payload);
    },

    addLike(state, action) {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post.likes.indexOf(action.payload.currentUser) !== -1) {
        post.likes = post.likes.filter((u) => u !== action.payload.currentUser);
      } else {
        post.likes.push(action.payload.currentUser);
      }
    },

    addPost(state, action) {
      const [data, userId] = action.payload;

      const newPost = {
        userId: userId,
        id: new Date().getTime(),
        title: data.title,
        body: data.body,
        likes: [],
        comments: [],
        datetime: new Date().getTime(),
      };

      state.posts.unshift(newPost);

      state.postsIds.unshift(newPost.id);
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
