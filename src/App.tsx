import "./App.css";
import Layout from "./components/layouts/layout";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./app/sign-up/sign-up";
import { ThemeProvider } from "./provider/themeProvider";
import Signin from "./app/sign-in/sign-in";
import { Toaster } from "./components/ui/toaster/toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProdectedRoute from "./hooks/use-protect-route";
import { Dashboard } from "./app/dashboard/dashboard";

function AppRooter() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-theme">
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

const rootRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<AppRooter />}>
      <Route element={<ProdectedRoute allowedRole={["admin"]} />}>
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Route>

      <Route path="/sign-up" element={<Signup />} />
      <Route path="/" element={<Signin />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={rootRouter} />
      <Toaster position="bottom-right" duration={2} theme="system" />
    </>
  );
}

export default App;
