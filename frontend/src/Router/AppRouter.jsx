import Authlayout from "../layout/Authlayout";
import PublicRoute from "../components/PublicRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <Authlayout />,
        },
      ],
    },
    {
        path:"/home" ,
        element:<ProtectedRoute/>,
        children:[
            {
                path:"" ,
                element:<HomeLayout />
            }
        ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

