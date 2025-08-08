import { Layout } from "@/components/Layout";
import { AdminUser } from "@/modules/admin/pages/AdminUser";
import { RenderStep } from "@/modules/shopping/components";
import { AutenticacionMayor } from "@/pages/AutenticacionMayor";
import { Navigate, type RouteObject } from "react-router-dom";


export const routes : RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: 'gestion_user', element: <AdminUser/>
      },
      {
        path: 'shoppingcar', element: <RenderStep/>
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace/>
      }
      
    ],
  },
  {
    path: '/login',
    element: <AutenticacionMayor/>
  }
]