import React, { useState, useEffect } from "react";
import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeScreen from "./pages/Home/Home";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnAuthenticatedRoot from "./components/root/UnauthenticatedRoot";
import AuthenticatedRoot from "./components/root/AuthenticatedRoot";
// Chat Styles
// import './styles/chat.scss'
// Globals Styles
import "./styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import SignupScreen from "./pages/SignupScreen/SignupScreen";
import CommandCentre from "./pages/CommandCentre/CommandCentre";
import CampaignsPage from "./pages/CampaignsPage/CampaignsPage";
import CreateCampaign from "./pages/CampaignsPage/Create/CreateCampaign";
import ManagePublishers from "./pages/Publishers/ManagePublishers/ManagePublishers";
import AddPublisher from "./pages/Publishers/ManagePublishers/AddPublisher/AddPublisher";
import ManageTargets from "./pages/Targets/ManageTargets/ManageTargets";
import PublishersGroup from "./pages/Publishers/PublishersGroup/PublishersGroup";
import AddTargetsPage from "./pages/Targets/ManageTargets/AddTargets/AddTargets";
import BuyerGroups from "./pages/Targets/BuyerGroups/BuyerGroups";
import ProfileSettings from "./pages/Settings/Profile/Profile";
import ManageUsers from "./pages/Settings/ManageUsers/ManageUsers";
import ManageBuyers from "./pages/Buyers/Manage/ManageBuyers";
import CreateBuyer from "./pages/Buyers/Create/CreateBuyer";
import ManageNumbers from "./pages/Numbers/ManageNumbers";
import ManageDNC from "./pages/Numbers/DNC/ManageDNC";
import FullTranscript from "./pages/Publishers/PublishersGroup/FullTranscript";
import SplittedTranscript from "./pages/Publishers/PublishersGroup/SplittedTranscript";
import DispAna from "./components/basicTable/DispAna";
import ClientsPanel from "./components/basicTable/ClientsPanel";
// // Rtl Styles
// import './styles/rtl.scss'
// // Dark Mode Styles
// import './styles/dark.scss'
// // Left Sidebar Dark Mode Styles
// import './styles/leftSidebarDark.scss'

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoot />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute user={true}>
            <ManageNumbers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/loganalytics",
          element: (
            <ProtectedRoute user={true}>
              <CampaignsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/campaigns/create",
          element: (
            <ProtectedRoute user={true}>
              <CreateCampaign />
            </ProtectedRoute>
          ),
        },
        {
          path: "/callanalytics",
          element: (
            <ProtectedRoute user={true}>
              <ManagePublishers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dispana",
          element: (
            <ProtectedRoute user={true}>
              <ClientsPanel />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dispana/:links/*",
          element: (
            <ProtectedRoute user={true}>
              <DispAna/>
            </ProtectedRoute>
          ),
        },{
          path: "/add/:id",
          element: (
            <ProtectedRoute user={true}>
              <AddPublisher />
            </ProtectedRoute>
          ),
        },
        {
          path: "/publishers-group",
          element: (
            <ProtectedRoute user={true}>
              <PublishersGroup />
            </ProtectedRoute>
          ),
        },
        {
          path: "/fulltranscript",
          element: (
            <ProtectedRoute user={true}>
              <FullTranscript/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/splittedtranscript",
          element: (
            <ProtectedRoute user={true}>
              <SplittedTranscript/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-targets",
          element: (
            <ProtectedRoute user={true}>
              <ManageTargets />
            </ProtectedRoute>
          ),
        },
        {
          path: "/buyer-groups",
          element: (
            <ProtectedRoute user={true}>
              <BuyerGroups />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-targets/add",
          element: (
            <ProtectedRoute user={true}>
              <AddTargetsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-buyers",
          element: (
            <ProtectedRoute user={true}>
              <ManageBuyers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-buyers/add",
          element: (
            <ProtectedRoute user={true}>
              <CreateBuyer />
            </ProtectedRoute>
          ),
        },
        {
          path: "/logstats",
          element: (
            <ProtectedRoute user={true}>
              <ManageNumbers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-dnc",
          element: (
            <ProtectedRoute user={true}>
              <ManageDNC />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile-settings",
          element: (
            <ProtectedRoute user={true}>
              <ProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-users",
          element: (
            <ProtectedRoute user={true}>
              <ManageUsers />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <UnAuthenticatedRoot />,
      children: [
        {
          path: "login",
          element: <LoginScreen />,
        },
        {
          path: "signup",
          element: <SignupScreen />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;