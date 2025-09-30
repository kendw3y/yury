import { Layout } from "@/components/Layout";
import { AdminUser } from "@/modules/admin/pages/AdminUser";
import { RenderStep, SuccessfulAnimate } from "@/modules/shopping/components";
import { AutenticacionMayor } from "@/pages/AutenticacionMayor";
import { Landing } from "@/modules/shopping/pages/Landing";
import { Navigate, type RouteObject } from "react-router-dom";
import ProductsPage from "@/modules/shopping/pages/ProductsPage";
import FavoritesPage from "@/modules/shopping/pages/FavoritesPage";
import AdminProductsPage from "@/modules/admin/pages/AdminProds";
import { GestionEncargos } from "@/modules/admin/pages/GestionEncargos";
import { AdminLayout } from "@/modules/admin/components/AdminLayout";
import ProductCustomizer from "@/components/ProductCustomizer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "shoppingcar",
        element: <RenderStep />,
      },
      {
        path: "personalizar",
        element: <ProductCustomizer />,
      },
      {
        path: "favorite",
        element: <FavoritesPage />,
      },

      {
        path: "*",
        element: <Navigate to={"/"} replace />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "usuarios",
        element: <AdminUser />,
      },
      {
        path: "productos",
        element: <AdminProductsPage />,
      },
      {
        path: "encargos",
        element: <GestionEncargos />,
      },
      {
        path: "*",
        element: <Navigate to={"/admin/encargos"} replace />,
      },
    ],
  },
  {
    path: "successful",
    element: <SuccessfulAnimate />,
  },
  {
    path: "admin/login",
    element: <AutenticacionMayor />,
  },
  {
    path: "/login",
    element: <AutenticacionMayor />,
  },
];
