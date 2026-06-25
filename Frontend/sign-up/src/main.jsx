import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "./redux/store";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);