import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import CreateAccount from "./pages/CreateAccount";
import NotFoundPage from "./pages/NotFoundPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "post/:id",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "create_account",
    element: <CreateAccount />,
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
