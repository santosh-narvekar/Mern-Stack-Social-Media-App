import { configureStore } from "@reduxjs/toolkit";
import usersFeature from "./features/userFeatures";
import postFeatures from "./features/postFeatures";

export const store = configureStore({
  reducer:{
    loggedIn:usersFeature,
    post:postFeatures
  },
  middleware:getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
