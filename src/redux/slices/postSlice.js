import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    // {
    //   id: null,
    //   title: null,
    //   content: null,
    //   views: 0,
    //   createdOn: Date.now(),
    //   createdBy: null,
    // },
  ],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    increaseView: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload);
      if (index !== -1) {
        state.posts[index].views += 1;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    // editpost : i am not making this method cause i will render posts from backend not from here
  },
});
export const { addPost, increaseView, deletePost } = postSlice.actions;

export default postSlice.reducer;
