import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import movieReducer from "./slices/movie";
import messageReducer from "./slices/message";
const reducer = {
  auth: authReducer,
  movie: movieReducer,
  message: messageReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
