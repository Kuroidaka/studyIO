import { Navigate } from "react-router"
import { lazy } from 'react';

import DefaultLayout from "../layout/index.jsx"

const ChatPage = lazy(() => import("../page/chat/chat.jsx"));
const CamChat = lazy(() => import("../page/camChat/CamChat.jsx"));

// import ChatPage from "../page/chat/chat.jsx"
// import CamChat from "../page/camChat/index.jsx"
import paths from "./path"

export const routes = [
    {
        name: "default",
        page:  <Navigate to={paths.chat} />,
        path: "*",
        exact: true,
    },
    {
        name: "chat",
        page: <DefaultLayout><ChatPage /></DefaultLayout>,
        path: paths.chat, 
        exact: true,
    },
    {
        name: "cam-chat",
        page: <DefaultLayout sidebar={false}><CamChat /></DefaultLayout>,
        path: paths.camChat, 
        exact: true,
    }

    // {
    //     name: "noPage",
    //     page: <NoPage />,
    //     path: paths.noPage,
    //     exact: true,
    // }
]