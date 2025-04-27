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
import { AuthProvider } from "./provider/authProvider";
import PageNotFount from "./app/not-fount-page/page-not-fount";
import AnalyticsReports from "./app/analytics-&-reports/analytics-reports";
import Packages from "./app/packages/packages";
import { BookingProvider } from "./provider/bookingProvider";
import { PackageProvider } from "./provider/packageProvider";

function AppRooter() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
        <BookingProvider>
          <PackageProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-theme">
              <Layout>
                <Outlet />
              </Layout>
            </ThemeProvider>
          </PackageProvider>
        </BookingProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

const rootRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<AppRooter />}>
      <Route element={<ProdectedRoute allowedRole={["admin"]} />}>
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/analytics-reports/:id" element={<AnalyticsReports />} />
        <Route path="/packages/:id" element={<Packages />} />
      </Route>

      <Route path="/sign-up" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="*" element={<PageNotFount />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={rootRouter} />
      <Toaster position="bottom-right" theme="system" />
    </>
  );
}

export default App;
