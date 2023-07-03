import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import { configureStore } from "@reduxjs/toolkit";
import AppRoutes from "./AppRoutes";
import { Auth0Provider } from "@auth0/auth0-react";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-eej6xar51rq4qegl.us.auth0.com"}
      clientId={"DctARCL2zuNhX8kgMvcgMIB9DF5qAeaS"}
      authorizationParams={{
        redirect_uri: "http://localhost:3000/authorize",
        responseType: "token id_token",
        scope: "openid profile email",
      }}
      useRefreshTokens={true}
    >
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
