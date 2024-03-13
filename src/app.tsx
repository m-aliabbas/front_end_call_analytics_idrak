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
import Pannel from "./pages/LoginScreen/Pannel";


function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<boolean>(false); // Default to false

  useEffect(() => {
    // Check for session value
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setUser(isLoggedIn);
console.log( "hello",localStorage.getItem('isLoggedIn'),isLoggedIn)
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
            <ProtectedRoute user={user}>
              <ClientsPanel />
            </ProtectedRoute>
          ),
        },
        {
          path: "/setting",
          element: (
            <ProtectedRoute user={user}>
              <Pannel/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/loganalytics",
          element: (
            <ProtectedRoute user={user}>
              <CampaignsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/campaigns/create",
          element: (
            <ProtectedRoute user={user}>
              <CreateCampaign />
            </ProtectedRoute>
          ),
        },
        {
          path: "/callanalytics",
          element: (
            <ProtectedRoute user={user}>
              <ManagePublishers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dispana",
          element: (
            <ProtectedRoute user={user}>
              <ClientsPanel />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dispana/:links/*",
          element: (
            <ProtectedRoute user={user}>
              <DispAna/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/add/:id",
          element: (
            <ProtectedRoute user={user}>
              <AddPublisher />
            </ProtectedRoute>
          ),
        },
        {
          path: "/publishers-group",
          element: (
            <ProtectedRoute user={user}>
              <PublishersGroup />
            </ProtectedRoute>
          ),
        },
        {
          path: "/fulltranscript",
          element: (
            <ProtectedRoute user={user}>
              <FullTranscript/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/splittedtranscript",
          element: (
            <ProtectedRoute user={user}>
              <SplittedTranscript/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-targets",
          element: (
            <ProtectedRoute user={user}>
              <ManageTargets />
            </ProtectedRoute>
          ),
        },
        {
          path: "/buyer-groups",
          element: (
            <ProtectedRoute user={user}>
              <BuyerGroups />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-targets/add",
          element: (
            <ProtectedRoute user={user}>
              <AddTargetsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-buyers",
          element: (
            <ProtectedRoute user={user}>
              <ManageBuyers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-buyers/add",
          element: (
            <ProtectedRoute user={user}>
              <CreateBuyer />
            </ProtectedRoute>
          ),
        },
        {
          path: "/logstats",
          element: (
            <ProtectedRoute user={user}>
              <ManageNumbers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-dnc",
          element: (
            <ProtectedRoute user={user}>
              <ManageDNC />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile-settings",
          element: (
            <ProtectedRoute user={user}>
              <ProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-users",
          element: (
            <ProtectedRoute user={user}>
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
      <RouterProvider router={router}>
      
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;