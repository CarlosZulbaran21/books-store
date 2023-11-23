import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Component from "./Component";
import Book from "./Book";

let router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <Component />;
    },
  },
  {
    path: "/book/:id",
    Component() {
      return <Book />;
    },
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>loading...</p>} />;
}

export default App;
