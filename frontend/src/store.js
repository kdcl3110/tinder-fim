import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import movieReducer from "./slices/movie";
import configReducer from "./slices/config";
import messageReducer from "./slices/message";
const reducer = {
  auth: authReducer,
  movie: movieReducer,
  config: configReducer,
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
